export function calculateReadingTime(text: string): number {
  // Average reading speed: 200 words per minute
  const wordsPerMinute = 200
  const words = text.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return minutes
}

export function formatReadingTime(minutes: number): string {
  if (minutes === 1) {
    return '1 min read'
  }
  return `${minutes} min read`
}

type ReadingTimeSource = {
  readingTime?: { text?: string } | null
  summary?: string | null
}

/** CoreContent posts omit body; prefer contentlayer's readingTime, fall back to summary. */
export function getReadingTimeLabel(post: ReadingTimeSource): string {
  if (post.readingTime?.text) {
    return post.readingTime.text
  }
  return formatReadingTime(calculateReadingTime(post.summary || ''))
}
