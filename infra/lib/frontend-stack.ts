import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import * as ecs from 'aws-cdk-lib/aws-ecs'
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2'
import * as patterns from 'aws-cdk-lib/aws-ecs-patterns'
import * as ssm from 'aws-cdk-lib/aws-ssm'
import { DockerImageAsset } from 'aws-cdk-lib/aws-ecr-assets'
import * as iam from 'aws-cdk-lib/aws-iam'

export interface FrontendStackProps extends cdk.StackProps {
  appName: string
  environment: string
}

export class FrontendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: FrontendStackProps) {
    super(scope, id, props)

    const { appName, environment } = props

    /* ────────────────────────────────────────────────
       1. Look up shared values we wrote in AuthStack
       ──────────────────────────────────────────────── */
    /* 1. replace valueForStringParameter → valueFromLookup for build-time vars */
    const clientId = ssm.StringParameter.valueFromLookup(
      this,
      `/${appName}/${environment}/user-service/appClientId`
    )
    const userPoolId = ssm.StringParameter.valueFromLookup(
      this,
      `/${appName}/${environment}/user-service/userPoolId`
    )
    const uploadApi = ssm.StringParameter.valueFromLookup(
      this,
      `/${appName}/${environment}/upload-service/api-endpoint`
    )
    const collectionApi = ssm.StringParameter.valueFromLookup(
      this,
      `/${appName}/${environment}/collection-service/api-endpoint`
    )
    const dictionaryApiKey =
      ssm.StringParameter.fromSecureStringParameterAttributes(
        this,
        'DictionaryApiKeyParam',
        {
          parameterName: `/${appName}/${environment}/frontend/dictionary-api-key`,
          version: 1 // <- bump when you rotate
        }
      )
    const thesaurusApiKey =
      ssm.StringParameter.fromSecureStringParameterAttributes(
        this,
        'ThesaurusApiKeyParam',
        {
          parameterName: `/${appName}/${environment}/frontend/thesaurus-api-key`,
          version: 1 // <- bump when you rotate
        }
      )
    const authSecret = ssm.StringParameter.fromSecureStringParameterAttributes(
      this,
      'AuthSecretParam',
      {
        parameterName: `/${appName}/${environment}/auth/secret`,
        version: 1 // <- bump when you rotate
      }
    )

    /* Hosted-UI domain follows the pattern we used in AuthStack */
    const cognitoDomain = `${appName}-${environment}-auth.auth.us-east-1.amazoncognito.com`

    // Import shared infrastructure resources
    const vpc = ec2.Vpc.fromLookup(this, 'SharedVpc', {
      vpcName: `${appName}-${environment}-vpc`
    })

    const cluster = new ecs.Cluster(this, 'FrontendCluster', { vpc })

    const loadBalancer = elbv2.ApplicationLoadBalancer.fromLookup(
      this,
      'LoadBalancer',
      {
        loadBalancerTags: {
          Name: `${appName}-${environment}-alb`
        }
      }
    )

    // task role with SSM read
    const taskRole = new iam.Role(this, 'FrontendTaskRole', {
      assumedBy: new iam.ServicePrincipal('ecs-tasks.amazonaws.com')
    })
    taskRole.addToPolicy(
      new iam.PolicyStatement({
        actions: ['ssm:GetParameter', 'ssm:GetParameters'],
        resources: [
          `arn:aws:ssm:${this.region}:${this.account}:parameter/${appName}/${environment}/notification-service/*`
        ]
      })
    )
    taskRole.addToPolicy(
      new iam.PolicyStatement({
        actions: ['ssm:GetParameter', 'ssm:GetParameters'],
        resources: [
          `arn:aws:ssm:${this.region}:${this.account}:parameter/${appName}/${environment}/collection-service/*`
        ]
      })
    )

    const imageAsset = new DockerImageAsset(this, 'FrontendImage', {
      directory: '..', // repo root where Dockerfile lives
      file: 'Dockerfile',
      buildArgs: {
        NEXT_PUBLIC_COGNITO_CLIENT_ID: clientId,
        NEXT_PUBLIC_COGNITO_USER_POOL_ID: userPoolId,
        NEXT_PUBLIC_AWS_REGION: this.region,
        NEXT_PUBLIC_COGNITO_DOMAIN: cognitoDomain,
        NEXT_PUBLIC_COLLECTION_SERVICE_URL: collectionApi,
        NEXTAUTH_URL: 'https://wordcollect.haydenturek.com' // needed at build and runtime
      }
    })

    const service = new patterns.ApplicationLoadBalancedFargateService(
      this,
      'FrontendService',
      {
        cluster,
        loadBalancer,
        listenerPort: 8080,
        cpu: 512,
        memoryLimitMiB: 1024,
        desiredCount: 2,
        circuitBreaker: {
          rollback: true
        },
        healthCheckGracePeriod: cdk.Duration.seconds(60),
        taskImageOptions: {
          taskRole,
          image: ecs.ContainerImage.fromDockerImageAsset(imageAsset),
          containerPort: 3000,
          enableLogging: true,
          environment: {
            UPLOAD_SERVICE_URL: uploadApi,
            NEXTAUTH_URL: `https://wordcollect.haydenturek.com`,
            AUTH_TRUST_HOST: 'true'
          },
          secrets: {
            /* pulled from SSM SecureString → injected as env at runtime */
            AUTH_SECRET: ecs.Secret.fromSsmParameter(authSecret),
            DICTIONARY_API_KEY: ecs.Secret.fromSsmParameter(dictionaryApiKey),
            THESAURUS_API_KEY: ecs.Secret.fromSsmParameter(thesaurusApiKey)
          }
        }
      }
    )

    const httpsListener =
      elbv2.ApplicationListener.fromApplicationListenerAttributes(
        this,
        'HTTPSListener',
        {
          listenerArn: cdk.Fn.importValue(
            `${appName}-${environment}-alb-https-listener-arn`
          ),
          securityGroup: ec2.SecurityGroup.fromLookupByName(
            this,
            'SecurityGroup',
            `${appName}-${environment}-alb-sg`,
            vpc
          )
        }
      )

    const listenerRule = new elbv2.ApplicationListenerRule(
      this,
      'ListenerRule',
      {
        listener: httpsListener,
        priority: 1,
        action: elbv2.ListenerAction.forward([service.targetGroup]),
        conditions: [elbv2.ListenerCondition.pathPatterns(['/*'])]
      }
    )
  }
}
