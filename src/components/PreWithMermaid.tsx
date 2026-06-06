'use client'

import type { ReactElement, ReactNode } from 'react'
import Pre from 'pliny/ui/Pre'
import Mermaid from './Mermaid'

type ElementWithProps = ReactElement<{ className?: string; children?: ReactNode }>

function getTextContent(node: ReactNode): string {
  if (typeof node === 'string') return node
  if (typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(getTextContent).join('')
  if (node && typeof node === 'object' && 'props' in node) {
    return getTextContent((node as ElementWithProps).props.children)
  }
  return ''
}

function isMermaidBlock(children: ReactNode): boolean {
  const child = (Array.isArray(children) ? children[0] : children) as ElementWithProps | undefined
  if (!child?.props) return false
  const className = child.props.className || ''
  return className.includes('language-mermaid')
}

type PreWithMermaidProps = React.ComponentProps<'pre'>

export default function PreWithMermaid({ children, ...props }: PreWithMermaidProps) {
  if (isMermaidBlock(children)) {
    const child = (Array.isArray(children) ? children[0] : children) as ElementWithProps
    const chart = getTextContent(child.props.children)
    return <Mermaid chart={chart} />
  }

  return <Pre {...props}>{children}</Pre>
}
