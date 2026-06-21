import clsx from 'clsx'

function Badge({ children, active = false, className }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors',
        active ? 'border-accent/70 bg-accent/20 text-accent' : 'border-border bg-white/[0.03] text-muted',
        className,
      )}
    >
      {children}
    </span>
  )
}

export default Badge