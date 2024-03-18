/**
 * React.js Core.
 */
import { useEffect, useState } from "react"
/**
 * Hooks.
 */
import useIntersectionObserver from "@/src/hooks/useIntersectionObserver"
/**
 * When an element is in the viewport, load the image.
 *
 * @param wrapperDivRef - HTML element reference.
 * @param imageUrl - Image URL.
 *
 * @returns isImageLoaded - Is the image loaded?
 */
export function useImageLoader(
  wrapperDivRef: React.RefObject<HTMLDivElement>,
  imageUrl: string
) {
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false)
  const { isIntersecting } = useIntersectionObserver(wrapperDivRef)

  useEffect(() => {
    if (imageUrl && !isImageLoaded && isIntersecting) {
      const image = new Image()

      image.src = imageUrl

      image.onload = () => {
        setIsImageLoaded(true)
      }

      image.onerror = () => {
        setIsImageLoaded(true)
      }
    }
  }, [isImageLoaded, isIntersecting, imageUrl])

  return { isImageLoaded }
}
