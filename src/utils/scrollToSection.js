export function scrollToSection(id, reducedMotion = false) {
  const element = document.getElementById(id)
  if (!element) return

  element.scrollIntoView({
    behavior: reducedMotion ? 'auto' : 'smooth',
    block: 'start',
  })
}