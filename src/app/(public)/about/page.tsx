export default function Example() {
  return (
    <div className="py-24 sm:py-32 grow flex justify-center">
      <div className="max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">
            About
          </h2>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
            There are a lot of vocabulary apps out there, and they all stink.
          </p>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
            This is the typical pattern: you decide you want to improve your
            vocabulary for one reason or another. Maybe it's so that you can
            strengthen your communication skills in order to appear more
            intelligent in coversations. Or maybe you fancy yourself a writer,
            and you want to inspire readers with your hard-hitting and
            emotionally-charged prose.
          </p>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
            So you download an app, thinking it's going to turn you into the
            next Cormac McCarthy, but what happens? What do these apps
            invariably do?
          </p>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
            They serve you up a bunch of ten-dollar words that nobody knows!
          </p>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
            Vocabulary apps are all built around this same, flawed premise, but
            to be honest it's really not their fault. When you download one of
            these apps, you're basically telling the developers that you want to
            expand your lexicon, so they help you do this by trying to teach you
            new words you aren't likely to have known already.
          </p>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
            So the problem really isn't with the app. No my friend—the problem
            is with you.
          </p>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
            Take a step back for a moment. What is a strong vocabulary? What is
            it about certain writers, certain speakers, certain people that
            imbues their language with magic and potency?
          </p>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
            Is it because the words they choose to use are long and complicated,
            and hardly understood by the average person? I promise you that it's
            not. I promise you that if you take every word you learn from a
            vocabulary app and try to shoehorn it into a piece of prose, what
            you will have written will be pure, unmitigated drivel. Try to use
            those terms in a conversation? People are gonna look at you like you
            have six heads.
          </p>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
            So what then? What is it that makes a person eloquent, if not
            syllable count or character length?
          </p>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
            It all comes down to one simple thing: <strong>clarity</strong>.
          </p>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
            When you're reading a book by one of the greats and you get smacked
            across the face with the most beautiful, evocative and compelling
            word you've ever seen, you don't think, 'wow, that's a long word'.
            You think, 'wow, that's a powerful word'. And you think that because
            whatever abstract thing the author was trying to convey, they
            conveyed it perfectly.
          </p>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
            Part of that power comes from the fact that they used the word in a
            way you yourself would have never thought to use it, in a place
            where you yourself would have never expected it to be used. But you
            knew the word! You probably knew it since the first grade; you just
            wouldn't have reached for it to describe the thing the author was
            talking about.
          </p>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
            A vocabulary app can't teach you words like that. It can't help you
            remember words like that. There's only one way to learn common words
            that pack a punch: you gotta read!
          </p>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
            Ok, so you read, and when you come across a word or phrase that
            moves you, you highlight it. But now you have a new problem: your
            collection of words is spread across a fleet of different source
            texts. You're not going to get better at using those words—at
            reaching for those words when the situation demands it—unless you
            have a centralized repository of them.
          </p>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
            That's where WordCollect comes in. At its core, it's a basic app
            that does a basic thing: it lets you store your favorite words and
            phrases. But it's so much more than that. Let me explain.
          </p>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
            The main pain point that inspired me to build this app was the fact
            that I do all my reading with the Kindle app. I have thousands of
            highlights split across hundreds of different books. Some of these
            highlights are words, but some of them are more like phrases or
            idioms, or words that tend to appear together, and some of them are
            entire passages that for whatever reason I didn't want to forget.
          </p>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
            I always wanted a way to build a reference library of them all, but
            that's actually more difficult of a problem than it seems on the
            surface.
          </p>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
            First, when you export your Kindle annotations from the Kindle app,
            you get a messy HTML file that includes a bunch of markup around
            your highlighted text. While it would be more or less trivial to
            write a computer program to strip that markup away and store just
            the values of your highlights, even if you were to do that, you'd
            have another issue on your hands.
          </p>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
            Remember earlier when I told you that I tend to highlight not just
            words and phrases but also entire passages? Well, when I see an
            author use a word or phrase in a novel way, I want to steal it. I
            want to remember it and find a way to use it in my daily endeavors.
            But I don't want to steal an entire passage from another writer.
            That's plagiarism. And that's why WordCollect uses AI to help you
            extract just the words and phrases from your Kindle annotations,
            even though you could have highlighted anything!
          </p>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
            And that's not all. Thanks to the power of AI, you can upload any
            text document to WordCollect, and WordCollect will pull out words
            and phrases worth learning. Everytime you do, it automatically adds
            them to your collection so you can reference them later.
          </p>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
            But wait; there's more (and this might be the best part). Look, I
            know I made a big deal about how your average vocabulary app leaves
            a lot to be desired, but the truth is that there are thousands of
            useful vocabulary lists hosted on the web. Just paste the URL to any
            vocabulary or idiom list into WordCollect and the AI will
            automatically extract the listed terms and store them in your
            collection.
          </p>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
            And why stop there? What if you really do want to learn some
            ten-dollar words? What if you wanted to take an article or blog post
            and just pull out the words you didn't know? You can do that too! It
            works for any URL or text document, thanks to the classification
            phase.
          </p>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
            WordCollect will classify your URLs or uploads into one of three
            distinct categories: Kindle highlights, vocabulary lists, or general
            prose. If it detects prose, it'll just extract the words and phrases
            you'd be likely to find in a traditional vocabulary app.
          </p>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
            That's it! Of course you can also add words or phrases
            individually—edit them, delete them, even store a note or a pet
            definition so you can tell your future self why you found that word
            so important.
          </p>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
            In the end, WordCollect is a tool to build a better self. You are
            what you think. If you can improve your ability to express abstract
            things, then new plateaus await.
          </p>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
            I built this app for a specific job prospect that requires knowledge
            of serverless microservices and AI integration. I hope you find it
            useful.
          </p>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
            Thanks!
          </p>
        </div>
      </div>
    </div>
  )
}
