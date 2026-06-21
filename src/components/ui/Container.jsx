import clsx from 'clsx'
import './Container.css'

function Container({ className, children }) {
  return (
    <div className={clsx('site-container mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </div>
  )
}

export default Container
