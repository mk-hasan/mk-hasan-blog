'use client'

import { Comments as CommentsComponent } from 'pliny/comments'
import { useState } from 'react'
import siteMetadata from '@/data/siteMetadata'

export default function Comments({ slug }: { slug: string }) {
  const [loadComments, setLoadComments] = useState(false)

  if (!siteMetadata.comments?.provider) {
    return null
  }

  // Check if Giscus is properly configured
  const isGiscusConfigured = siteMetadata.comments.provider === 'giscus' && 
    siteMetadata.comments.giscusConfig?.repo && 
    siteMetadata.comments.giscusConfig?.repositoryId

  if (!isGiscusConfigured) {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center dark:border-gray-700 dark:bg-gray-800">
        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Comments Setup Required
        </h3>
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          To enable comments, please configure Giscus in your environment variables.
        </p>
        <div className="text-left text-sm text-gray-500 dark:text-gray-400">
          <p className="mb-2">Add these to your <code className="rounded bg-gray-200 px-1 py-0.5 dark:bg-gray-700">.env.local</code>:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><code>NEXT_PUBLIC_GISCUS_REPO=your-username/your-repo</code></li>
            <li><code>NEXT_PUBLIC_GISCUS_REPOSITORY_ID=your-repo-id</code></li>
            <li><code>NEXT_PUBLIC_GISCUS_CATEGORY=General</code></li>
            <li><code>NEXT_PUBLIC_GISCUS_CATEGORY_ID=your-category-id</code></li>
          </ul>
          <p className="mt-2">
            Get these values from <a href="https://giscus.app/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 dark:text-primary-400">giscus.app</a>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-8">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Comments
        </h3>
      </div>
      {loadComments ? (
        <CommentsComponent commentsConfig={siteMetadata.comments} slug={slug} />
      ) : (
        <div className="rounded-lg border border-gray-200 bg-white p-6 text-center dark:border-gray-700 dark:bg-gray-900">
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Join the discussion and share your thoughts!
          </p>
          <button 
            onClick={() => setLoadComments(true)}
            className="inline-flex items-center rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-primary-700 focus:outline-hidden transition-colors"
          >
            Load Comments
          </button>
        </div>
      )}
    </div>
  )
}
