import { useEffect } from 'react'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import { X } from 'lucide-react'
import './Modal.css'

function Modal({ isOpen, onClose, title, children, reducedMotion = false }) {
  useEffect(() => {
    if (!isOpen) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <Motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 p-4"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <Motion.div
            className="relative w-full max-w-3xl rounded-2xl border border-border bg-panel p-6 shadow-panel"
            onClick={(event) => event.stopPropagation()}
            initial={reducedMotion ? false : { opacity: 0, y: 14, scale: 0.98 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: reducedMotion ? 0 : 0.25, ease: 'easeOut' }}
          >
            <button
              type="button"
              onClick={onClose}
              className="modal-close-button absolute right-4 top-4 rounded-lg p-2 transition-colors"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {title && <h3 className="mb-4 pr-10 text-xl font-semibold text-text">{title}</h3>}
            {children}
          </Motion.div>
        </Motion.div>
      )}
    </AnimatePresence>
  )
}

export default Modal
