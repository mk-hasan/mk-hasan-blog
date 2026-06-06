'use client'

import { useEffect, useId, useRef, useState } from 'react'

type MermaidProps = {
  chart: string
}

export default function Mermaid({ chart }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)
  const reactId = useId().replace(/:/g, '')

  useEffect(() => {
    let cancelled = false

    async function renderChart() {
      try {
        const mermaid = (await import('mermaid')).default
        mermaid.initialize({
          startOnLoad: false,
          theme: 'neutral',
          securityLevel: 'loose',
          fontFamily: 'inherit',
        })

        const { svg } = await mermaid.render(`mermaid-${reactId}`, chart.trim())
        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg
          setError(null)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to render diagram')
        }
      }
    }

    renderChart()

    return () => {
      cancelled = true
    }
  }, [chart, reactId])

  if (error) {
    return (
      <div className="my-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
        <p className="font-medium">Diagram could not be rendered</p>
        <pre className="mt-2 overflow-x-auto whitespace-pre-wrap">{chart}</pre>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="mermaid my-8 flex justify-center overflow-x-auto rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900/50 [&_svg]:max-w-full"
      aria-label="Diagram"
    />
  )
}
