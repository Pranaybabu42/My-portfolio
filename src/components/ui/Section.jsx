import clsx from 'clsx'
import Container from './Container'

function Section({ id, title, subtitle, className, children, contained = true }) {
  const content = (
    <>
      {(title || subtitle) && (
        <header className="mb-10 max-w-3xl">
          {title && <h2 className="text-2xl font-semibold tracking-tight text-text sm:text-3xl">{title}</h2>}
          {subtitle && <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{subtitle}</p>}
        </header>
      )}
      {children}
    </>
  )

  return (
    <section id={id} className={clsx('relative py-14 sm:py-24', className)}>
      {contained ? <Container>{content}</Container> : content}
    </section>
  )
}

export default Section
