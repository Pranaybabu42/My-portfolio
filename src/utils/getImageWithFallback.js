export function getImageWithFallback(src, fallbackType = 'generic') {
  const candidates = Array.isArray(src) ? src.filter(Boolean) : [src].filter(Boolean)
  return {
    candidates,
    fallbackType,
  }
}

export const fallbackLabels = {
  profile: 'Profile image unavailable',
  project: 'Project image unavailable',
  about: 'About image unavailable',
  generic: 'Image unavailable',
}