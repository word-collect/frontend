import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  Cog6ToothIcon,
  FingerPrintIcon,
  LockClosedIcon,
  ServerIcon
} from '@heroicons/react/20/solid'
// import SvgPanZoom from '@/components/svg-pan-zoom'
import Diagram from '@/components/diagram'

const features = [
  {
    name: 'Push to deploy.',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit aute id magna.',
    icon: CloudArrowUpIcon
  },
  {
    name: 'SSL certificates.',
    description:
      'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
    icon: LockClosedIcon
  },
  {
    name: 'Simple queues.',
    description:
      'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus.',
    icon: ArrowPathIcon
  },
  {
    name: 'Advanced security.',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit aute id magna.',
    icon: FingerPrintIcon
  },
  {
    name: 'Powerful API.',
    description:
      'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
    icon: Cog6ToothIcon
  },
  {
    name: 'Database backups.',
    description:
      'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. ',
    icon: ServerIcon
  }
]

export default function Example() {
  return (
    <div className="py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-base/7 font-semibold text-indigo-400">
            Ready to scale
          </h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl sm:text-balance">
            Event-driven. Split-repo.
          </p>
          <p className="mt-6 text-lg/8 text-gray-300">
            Developed with modern architecural practices and tools to deliver a
            minimal yet robust and cost-efficient solution that is easy to
            maintain and expand.
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
