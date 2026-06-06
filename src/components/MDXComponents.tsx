import TOCInline from 'pliny/ui/TOCInline'
import PreWithMermaid from './PreWithMermaid'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import type { MDXComponents } from 'mdx/types'
import Image from './Image'
import CustomLink from './Link'
import TableWrapper from './TableWrapper'
import Callout from './Callout'
import CodeBlock from './CodeBlock'

export const components: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: PreWithMermaid,
  table: TableWrapper,
  BlogNewsletterForm,
  Callout,     // ✅ added
  CodeBlock,   // ✅ added
}
