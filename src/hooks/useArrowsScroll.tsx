/**
 * React.js Core.
 */
import { useCallback, useEffect, useState } from "react"
/**
 * Manage the arrows for any playlists that uses a slider for example.
 *
 * @param htmlElementReference - The reference to the HTML element that will be scrolled.
 *
 * @returns The scrolling state and the functions to handle the arrows.
 */
export default function useArrowsScroll({
  htmlElementReference
}: {
  htmlElementReference: React.RefObject<HTMLDivElement>
}) {
  const [scrollingInProgress, setScrollingInProgress] = useState(false)
  const [showLeftArrow, setShowLeftArrow] = useState(true)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const handleLeftArrowClick = useCallback(() => {
    const container = htmlElementReference.current
    /**
     * 1. Ukombinovati left i right?
     *
     * 2. komentari i to.
     */
    if (container) {
      const left = container.scrollLeft - container.offsetWidth

      container.scroll({ left: left, behavior: "smooth" })
    }
  }, [htmlElementReference])

  const handleRightArrowClick = useCallback(() => {
    const container = htmlElementReference.current

    if (container) {
      const left = container.scrollLeft + container.offsetWidth

      container.scroll({ left: left, behavior: "smooth" })
    }
  }, [htmlElementReference])

  const onScroll = useCallback(() => {
    const container = htmlElementReference.current

    if (container) {
      setScrollingInProgress(true)
    }
  }, [htmlElementReference])

  const onScrollEnd = useCallback(() => {
    const container = htmlElementReference.current

    if (container) {
      setScrollingInProgress(false)
      setShowLeftArrow(!("ontouchstart" in window) && container.scrollLeft > 0)
      setShowRightArrow(
        !("ontouchstart" in window) &&
          container.scrollLeft + container.offsetWidth <
            container.scrollWidth - 1
      )
    }
  }, [htmlElementReference])

  useEffect(() => {
    onScrollEnd()

    const container = htmlElementReference.current

    if (container) {
      container.addEventListener("scroll", onScroll)
      container.addEventListener("scrollend", onScrollEnd)
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", onScroll)
        container.removeEventListener("scrollend", onScrollEnd)
      }
    }
  }, [onScroll, onScrollEnd, htmlElementReference])

  return {
    scrollingInProgress,
    showLeftArrow,
    showRightArrow,
    handleLeftArrowClick,
    handleRightArrowClick
  }
}
