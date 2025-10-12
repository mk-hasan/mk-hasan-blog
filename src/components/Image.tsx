import NextImage, { ImageProps } from 'next/image'

const basePath = process.env.BASE_PATH

type BetterImageProps = Omit<ImageProps, 'src'> & { src: string }

const DEFAULT_SIZES = '100vw'

const Image = ({ src, sizes = DEFAULT_SIZES, loading, priority, ...rest }: BetterImageProps) => {
  const resolvedSrc = `${basePath || ''}${src}`
  const isAboveTheFold = priority === true || loading === 'eager'
  return (
    <NextImage
      src={resolvedSrc}
      sizes={sizes}
      loading={isAboveTheFold ? 'eager' : 'lazy'}
      priority={isAboveTheFold}
      placeholder={rest.placeholder}
      {...rest}
    />
  )
}

export default Image
