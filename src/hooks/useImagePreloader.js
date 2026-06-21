import { useEffect, useMemo, useState } from 'react'

const localAssetModules = import.meta.glob('../../assets/**/*.{avif,gif,jpeg,jpg,png,svg,webp}', {
  eager: true,
  import: 'default',
  query: '?url',
})

const publicImageUrls = [
  '/textures/earth/earth-clouds.png',
  '/textures/earth/earth-day.jpg',
  '/textures/earth/earth-normal.jpg',
  '/textures/earth/earth-specular.jpg',
]

const localAssetUrls = Object.values(localAssetModules).filter(Boolean)
const emptyImageUrls = []

function loadImage(src) {
  return new Promise((resolve) => {
    const image = new Image()

    image.onload = async () => {
      try {
        if (image.decode) {
          await image.decode()
        }
      } catch {
        // Decoding can reject for already-loaded images in some browsers.
      }

      resolve({ src, ok: true })
    }

    image.onerror = () => resolve({ src, ok: false })
    image.src = src
  })
}

function getUniqueImageUrls(extraUrls) {
  return Array.from(new Set([...localAssetUrls, ...publicImageUrls, ...extraUrls].filter(Boolean)))
}

export function useImagePreloader(extraUrls = emptyImageUrls) {
  const imageUrls = useMemo(() => getUniqueImageUrls(extraUrls), [extraUrls])
  const [status, setStatus] = useState({
    failedCount: 0,
    isComplete: imageUrls.length === 0,
    loadedCount: 0,
  })

  useEffect(() => {
    let isCancelled = false

    if (imageUrls.length === 0) {
      Promise.resolve().then(() => {
        if (!isCancelled) {
          setStatus({
            failedCount: 0,
            isComplete: true,
            loadedCount: 0,
          })
        }
      })

      return undefined
    }

    Promise.resolve().then(() => {
      if (!isCancelled) {
        setStatus({
          failedCount: 0,
          isComplete: false,
          loadedCount: 0,
        })
      }
    })

    Promise.all(
      imageUrls.map((src) =>
        loadImage(src).then((result) => {
          if (isCancelled) return result

          setStatus((current) => ({
            ...current,
            failedCount: result.ok ? current.failedCount : current.failedCount + 1,
            loadedCount: current.loadedCount + 1,
          }))

          return result
        }),
      ),
    ).then(() => {
      if (!isCancelled) {
        setStatus((current) => ({
          ...current,
          isComplete: true,
        }))
      }
    })

    return () => {
      isCancelled = true
    }
  }, [imageUrls])

  return {
    failedCount: status.failedCount,
    isComplete: status.isComplete,
    loadedCount: status.loadedCount,
    progress: imageUrls.length > 0 ? Math.round((status.loadedCount / imageUrls.length) * 100) : 100,
    totalCount: imageUrls.length,
  }
}
