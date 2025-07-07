import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  Cog6ToothIcon,
  FingerPrintIcon,
  LockClosedIcon,
  ServerIcon
} from '@heroicons/react/20/solid'

const features = [
  {
    name: 'Event-driven.',
    description:
      'Leverages AWS EventBridge to trigger actions based on events and broadcasts updates to the browser.',
    icon: LockClosedIcon
  },
  {
    name: 'Serverless.',
    description:
      'On-demand compute with zero servers to manage +  AWS Step Functions for declarative orchestration.',
    icon: ArrowPathIcon
  },
  {
    name: 'AI-powered.',
    description:
      'AWS Bedrock handles term-extraction from a diverse range of sources with varying levels of structure.',
    icon: FingerPrintIcon
  },
  {
    name: 'Microservice-architecture.',
    description:
      'Seven Github repositories allow for independent development and deployment.',
    icon: Cog6ToothIcon
  },
  {
    name: 'Infrastructure as code.',
    description:
      'Built with AWS CDK, with each repo managing its own stacks and a separate repo for shared resources.',
    icon: ServerIcon
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
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-base/7 font-semibold text-indigo-400">
            Everything you need
          </h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">
            No server? No problem.
          </p>
          <p className="mt-6 text-lg/8 text-gray-300">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores
            impedit perferendis suscipit eaque, iste dolor cupiditate
            blanditiis.
          </p>
        </div>
        <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base/7 text-gray-400 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-16">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-9">
              <dt className="inline font-semibold text-white">
                <feature.icon
                  aria-hidden="true"
                  className="absolute top-1 left-1 size-5 text-indigo-500"
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
