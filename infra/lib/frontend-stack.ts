import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import * as ecs from 'aws-cdk-lib/aws-ecs'
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2'
import * as patterns from 'aws-cdk-lib/aws-ecs-patterns'
import { DockerImageAsset } from 'aws-cdk-lib/aws-ecr-assets'
import { ListenerCondition } from 'aws-cdk-lib/aws-elasticloadbalancingv2'

export interface FrontendStackProps extends cdk.StackProps {
  appName: string
  environment: string
}

export class FrontendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: FrontendStackProps) {
    super(scope, id, props)

    const { appName, environment } = props

    // Import shared infrastructure resources
    const vpc = ec2.Vpc.fromLookup(this, 'SharedVpc', {
      vpcName: `${appName}-${environment}-vpc`
    })

    const imageAsset = new DockerImageAsset(this, 'FrontendImage', {
      directory: '..', // repo root where Dockerfile lives
      file: 'Dockerfile'
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
        taskImageOptions: {
          image: ecs.ContainerImage.fromDockerImageAsset(imageAsset),
          containerPort: 3000,
          enableLogging: true
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
        conditions: [
          elbv2.ListenerCondition.pathPatterns([
            '/', // index page
            '/_next/*', // Next.js internals
            '/static/*', // public/static
            '/favicon.ico',
            '/robots.txt'
          ])
        ]
      }
    )
  }
}
