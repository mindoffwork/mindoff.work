import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'
import type { ComponentPropsWithoutRef } from 'react'

const components: MDXComponents = {
  h1: (props) => (
    <h1
      {...props}
      style={{
        color: 'var(--color-foreground)',
        fontSize: 'var(--font-size-4xl)',
        lineHeight: 'var(--line-height-tight)',
        fontWeight: 'var(--font-weight-bold)',
        marginBlock: 'var(--space-10) var(--space-5)',
      }}
    />
  ),
  h2: (props) => (
    <h2
      {...props}
      style={{
        color: 'var(--color-foreground)',
        fontSize: 'var(--font-size-3xl)',
        lineHeight: 'var(--line-height-tight)',
        fontWeight: 'var(--font-weight-semibold)',
        marginBlock: 'var(--space-8) var(--space-4)',
      }}
    />
  ),
  h3: (props) => (
    <h3
      {...props}
      style={{
        color: 'var(--color-foreground)',
        fontSize: 'var(--font-size-2xl)',
        lineHeight: 'var(--line-height-snug)',
        fontWeight: 'var(--font-weight-semibold)',
        marginBlock: 'var(--space-6) var(--space-3)',
      }}
    />
  ),
  p: (props) => (
    <p
      {...props}
      style={{
        color: 'var(--color-muted-foreground)',
        fontSize: 'var(--font-size-base)',
        lineHeight: 'var(--line-height-relaxed)',
        marginBlock: 'var(--space-4)',
      }}
    />
  ),
  a: (props) => (
    <a
      {...props}
      style={{
        color: 'var(--color-link)',
        textDecoration: 'underline',
        textUnderlineOffset: 'var(--space-1)',
      }}
    />
  ),
  code: (props) => (
    <code
      {...props}
      style={{
        color: 'var(--color-foreground)',
        backgroundColor: 'var(--color-surface-subtle)',
        fontSize: 'var(--font-size-sm)',
        paddingInline: 'var(--space-1)',
        paddingBlock: 'var(--space-0-5)',
        borderRadius: 'var(--radius-sm)',
      }}
    />
  ),
  pre: (props) => (
    <pre
      {...props}
      style={{
        color: 'var(--color-foreground)',
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-4)',
        overflowX: 'auto',
        marginBlock: 'var(--space-6)',
      }}
    />
  ),
  img: ({ alt, src, ...props }) => {
    const imageProps = props as Omit<ComponentPropsWithoutRef<typeof Image>, 'src' | 'alt'>

    return (
      <Image
        src={typeof src === 'string' ? src : ''}
        alt={alt ?? ''}
        unoptimized
        sizes='100vw'
        style={{
          width: '100%',
          height: 'auto',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border)',
          marginBlock: 'var(--space-6)',
        }}
        width={1200}
        height={675}
        {...imageProps}
      />
    )
  },
}

export function useMDXComponents(): MDXComponents {
  return components
}
