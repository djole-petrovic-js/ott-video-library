/**
 * React.js Core.
 */
import { useEffect, useState } from "react"
/**
 * For a given HTML element reference, figure out when the HTML element is in the viewport.
 */
export default function useIntersectionObserver(
  htmlElementReference: React.RefObject<HTMLDivElement> | null
) {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false)

  useEffect(() => {
    let observer: IntersectionObserver | null = null

    if (
      htmlElementReference &&
      htmlElementReference.current &&
      !isIntersecting
    ) {
      const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0
      }

      const observerCallback: IntersectionObserverCallback = function (
        imageObserverEntry: IntersectionObserverEntry[]
      ) {
        if (
          htmlElementReference.current &&
          imageObserverEntry[0].isIntersecting
        ) {
          observer?.disconnect()

          setIsIntersecting(true)
        }
      }

      observer = new IntersectionObserver(observerCallback, observerOptions)

      observer.observe(htmlElementReference.current)
    }

    return () => {
      if (observer) {
        observer.disconnect()
      }
    }
  }, [isIntersecting, htmlElementReference])

  return { isIntersecting }
}
