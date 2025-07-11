import {
  CloudArrowDownIcon,
  AcademicCapIcon,
  BookOpenIcon,
  GlobeAmericasIcon,
  BuildingLibraryIcon,
  ViewColumnsIcon
} from '@heroicons/react/20/solid'

const features = [
  {
    name: 'One collection.',
    description:
      'No more juggling multiple sources. With WordCollect, all your favorite words are stored in one place.',
    icon: BuildingLibraryIcon
  },
  {
    name: 'Phrase support.',
    description:
      'Save phrases, idioms, and other expressions that you want to remember, and see their definitions.',
    icon: ViewColumnsIcon
  },
  {
    name: 'AI-enabled.',
    description:
      'Automatically extract words and phrases from any URL or text document, including PDFs, HTML files, and more.',
    icon: AcademicCapIcon
  },
  {
    name: 'Use anywhere.',
    description:
      'Cloud-based, so you can access your collection from any device with an internet connection.',
    icon: CloudArrowDownIcon
  },
  {
    name: 'Define terms.',
    description:
      'Built-in dictionary lets you look up terms from your collection and save new ones with an easy-to-use interface.',
    icon: BookOpenIcon
  },
  {
    name: 'Discover new words.',
    description:
      'Thesaurus integration with support for synonyms, antonyms, and related words.',
    icon: GlobeAmericasIcon
  }
]

export default function Example() {
  return (
    <div className="py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-base/7 font-semibold text-indigo-400">
            No more ten-dollar words
          </h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">
            A better vocabulary app
          </p>
          <p className="mt-6 text-lg/8 text-gray-300">
            WordCollect doesn't tell you what to learn. It supports your
            learning by giving you a place to store your favorite words and
            phrases, and tools to help you store them.
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
