import { useMemo, useState } from 'react'
import clsx from 'clsx'
import { ImageOff } from 'lucide-react'
import { fallbackLabels, getImageWithFallback } from '../../utils/getImageWithFallback'

function FallbackPlaceholder({ fallbackType, className }) {
  return (
    <div
      className={clsx(
        'relative flex h-full min-h-28 w-full items-center justify-center overflow-hidden rounded-xl border border-border bg-gradient-to-br from-[#171922] to-[#0f1016]',
        className,
      )}
      role="img"
      aria-label={fallbackLabels[fallbackType] ?? fallbackLabels.generic}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(230,80,27,0.25),transparent_45%)]" />
      <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(rgba(255,255,255,0.3)_0.6px,transparent_0.6px)] [background-size:4px_4px]" />
      <div className="relative flex items-center gap-2 text-muted">
        <ImageOff size={18} />
        <span className="text-xs uppercase tracking-[0.2em]">Image Placeholder</span>
      </div>
    </div>
  )
}

function SafeImage({
  src,
  alt,
  className,
  imageClassName,
  fallbackType = 'generic',
  style,
  imageStyle,
}) {
  const { candidates } = useMemo(() => getImageWithFallback(src, fallbackType), [src, fallbackType])
  const [index, setIndex] = useState(0)
  const activeSrc = candidates[index]

  if (!activeSrc) {
    return <FallbackPlaceholder fallbackType={fallbackType} className={className} />
  }

  return (
    <div className={className} style={style}>
      <img
        src={activeSrc}
        alt={alt}
        className={imageClassName}
        style={imageStyle}
        onError={() => {
          if (index < candidates.length - 1) {
            setIndex((previous) => previous + 1)
          } else {
            setIndex(candidates.length)
          }
        }}
      />

      {index >= candidates.length && <FallbackPlaceholder fallbackType={fallbackType} className="h-full w-full" />}
    </div>
  )
}

export default SafeImage
