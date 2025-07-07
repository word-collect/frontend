import {
  CloudArrowUpIcon,
  EnvelopeIcon,
  ServerStackIcon,
  BoltIcon,
  CubeTransparentIcon,
  NoSymbolIcon
} from '@heroicons/react/20/solid'
import Diagram from '@/components/diagram'

const features = [
  {
    name: 'Event-driven.',
    description:
      'Leverages AWS EventBridge to trigger actions based on events and broadcasts updates to the browser.',
    icon: EnvelopeIcon
  },
  {
    name: 'Serverless.',
    description:
      'On-demand compute with zero servers to manage +  AWS Step Functions for declarative orchestration.',
    icon: NoSymbolIcon
  },
  {
    name: 'AI-powered.',
    description:
      'AWS Bedrock handles term-extraction from a diverse range of sources with varying levels of structure.',
    icon: BoltIcon
  },
  {
    name: 'Microservice-architecture.',
    description:
      'Seven Github repositories allow for independent development and deployment.',
    icon: CubeTransparentIcon
  },
  {
    name: 'Infrastructure as code.',
    description:
      'Built with AWS CDK, with each repo managing its own stacks and a separate repo for shared resources.',
    icon: ServerStackIcon
  },
  {
    name: 'Continuous deployment.',
    description:
      'Uses GitHub Actions to automatically deploy new versions of the app on pushes to main.',
    icon: CloudArrowUpIcon
  }
]

export default function Example() {
  return (
    <div className="py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-base/7 font-semibold text-indigo-400">
            Ready to grow
          </h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl sm:text-balance">
            Event-driven. Severless.
          </p>
          <p className="mt-6 text-lg/8 text-gray-300">
            Developed with modern architecural practices and tools to deliver a
            minimal yet robust solution that is primed for maintenance and
            expansion.
          </p>
        </div>
      </div>
      <div className="relative overflow-hidden pt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Diagram src="/architecture.svg" />
        </div>
      </div>
      <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
        <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base/7 text-gray-400 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-9">
              <dt className="inline font-semibold text-white">
                <feature.icon
                  aria-hidden="true"
                  className="absolute top-1 left-1 size-5 text-indigo-400"
                />
                {feature.name}
              </dt>{' '}
              <dd className="inline">{feature.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
