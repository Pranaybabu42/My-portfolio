import clsx from 'clsx'

function Card({ className, children, as: Component = 'article' }) {
  return (
    <Component
      className={clsx(
        'relative overflow-hidden rounded-2xl border border-border/80 bg-panel/70 p-5 shadow-panel transition-all duration-300',
        className,
      )}
    >
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent" />
      {children}
    </Component>
  )
}

export default Card