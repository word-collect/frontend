import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import * as ecs from 'aws-cdk-lib/aws-ecs'
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2'
import * as patterns from 'aws-cdk-lib/aws-ecs-patterns'
import * as acm from 'aws-cdk-lib/aws-certificatemanager'
import * as r53 from 'aws-cdk-lib/aws-route53'
import { DockerImageAsset } from 'aws-cdk-lib/aws-ecr-assets'
// import * as sqs from 'aws-cdk-lib/aws-sqs';

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

    const hostedZone = r53.HostedZone.fromHostedZoneId(
      this,
      'HostedZone',
      cdk.Fn.importValue(`${appName}-${environment}-hosted-zone-id`)
    )

    const service = new patterns.ApplicationLoadBalancedFargateService(
      this,
      'FrontendService',
      {
        cluster,
        cpu: 512,
        memoryLimitMiB: 1024,
        desiredCount: 2,
        taskImageOptions: {
          image: ecs.ContainerImage.fromDockerImageAsset(imageAsset),
          containerPort: 3000,
          enableLogging: true
        },
        // domainName: 'wordcollect.haydenturek.com',
        domainZone: hostedZone,
        certificate: acm.Certificate.fromCertificateArn(
          this,
          'Certificate',
          cdk.Fn.importValue(`${appName}-${environment}-certificate-arn`)
        ),
        listenerPort: 443, // ALB now listens on 443
        redirectHTTP: true, // 80 → 443 (optional)
        protocol: elbv2.ApplicationProtocol.HTTPS
      }
    )

    const aRecord = new r53.ARecord(this, 'ARecord', {
      zone: hostedZone,
      target: r53.RecordTarget.fromIpAddresses(
        service.loadBalancer.loadBalancerDnsName
      )
    })
  }
}
