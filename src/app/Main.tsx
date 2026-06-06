'use client'

import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import { motion } from 'framer-motion'
import { getReadingTimeLabel } from '../utils/readingTime'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  return (
    <>


    {/* Hero Section */}
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="flex flex-col md:flex-row items-center justify-between mb-12 p-8 rounded-2xl bg-gradient-to-br from-primary-50 via-fuchsia-50 to-rose-50 dark:from-gray-900 dark:via-gray-850 dark:to-gray-800 border border-gray-100/70 dark:border-gray-800/60"
    >
      <div className="flex-1">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
          Kamrul Hasan — Senior Data and AI Consultant
        </h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6 max-w-2xl">
          I build scalable data platforms and ship practical AI systems — from ingestion and MLOps to agentic workflows. Recently moved to a new team; writing here about what I learn along the way.
        </p>

        <div className="flex gap-4">
          <a
            href="/projects"
            className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold shadow hover:bg-primary-700 transition"
          >
            View My Portfolio
          </a>
          <a
            href="/blog"
            className="px-6 py-3 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg font-semibold shadow hover:bg-gray-300 dark:hover:bg-gray-700 transition"
          >
            Read My Blog
          </a>
        </div>
      </div>
      {/* <div className="flex-shrink-0 mt-8 md:mt-0 md:ml-12">
        <img
          src="/static/images/avatar.png"
          alt="Kamrul Hasan"
          className="w-40 h-40 rounded-full border-4 border-primary-500 shadow-lg object-cover"
        />
      </div> */}
    </motion.section>

    {/* About Me & Services Side by Side */}
    <section className="mb-12 flex flex-col md:flex-row gap-8">
      {/* About Me Section */}
      <div className="flex-1 p-8 rounded-xl bg-gray-100 dark:bg-gray-900/60 border border-gray-200/70 dark:border-gray-800/60 flex flex-col items-center md:items-start">
        <img
          src="/static/images/avatar.png"
          alt="Kamrul Hasan"
          className="w-32 h-32 rounded-full mb-6 border-2 border-primary-600 object-cover"
        />
        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
          About Me
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
          Senior Data and AI Consultant with deep experience in data engineering, MLOps, and agentic AI. I build trustworthy data foundations and help teams deliver end-to-end outcomes.
        </p>
        <a
          href="/about"
          className="text-primary-500 hover:underline font-medium"
        >
          Read my full story →
        </a>
      </div>

      {/* Services Section */}
      <div className="flex-1 p-8 rounded-xl bg-white dark:bg-gray-900/60 border border-gray-200/70 dark:border-gray-800/60 shadow-sm flex flex-col">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          What I Do
        </h2>
        <div className="grid grid-cols-1 gap-6 mb-6">
          <div className="flex items-center gap-4">
            <span className="text-3xl">🔧</span>
            <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Data Engineering & Platforms
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-3xl">🤖</span>
            <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Agentic AI, ML & Deep Learning Solutions
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-3xl">📊</span>
            <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Data Governance & Strategy
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-3xl">🧑‍💼</span>
            <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Consulting & Mentorship
            </span>
          </div>
        </div>
        <a
          href="/contact"
          className="self-start px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold shadow hover:bg-primary-700 transition"
        >
          Work With Me
        </a>
      </div>
    </section>

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            Latest
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post
            const readingTime = getReadingTimeLabel(post)
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                        <span className="mx-2">•</span>
                        <span>{readingTime}</span>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl leading-8 font-bold tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base leading-6 font-medium">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read more: "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base leading-6 font-medium">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
      {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
