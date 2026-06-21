import { motion } from 'framer-motion'
import clsx from 'clsx'

function Button({ variant = 'primary', className, children, as: Component = 'button', ...props }) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80 focus-visible:ring-offset-2 focus-visible:ring-offset-bg'

  const variants = {
    primary: 'border-accent bg-accent text-white hover:bg-[#f05a25] shadow-glow',
    secondary: 'border-border bg-transparent text-text hover:border-accent hover:text-accent',
  }

  return (
    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="inline-flex">
      <Component className={clsx(base, variants[variant], className)} {...props}>
        {children}
      </Component>
    </motion.div>
  )
}

export default Button