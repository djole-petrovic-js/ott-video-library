/**
 * React.js Core.
 */
import { useRef } from "react"
import { useNavigate } from "react-router-dom"
/**
 * Hooks.
 */
import { useImageLoader } from "@/src/hooks/useImageLoader"
/**
 * Utilities.
 */
import getSnapshotUrl from "@/src/utilities/videos/getSnapshotUrl"
/**
 * Types.
 */
import type { ServicesVideoType } from "@/src/types/servicesVideoType"
/**
 * Props.
 */
type PlaylistCarouselVideoProps = {
  playerId: number
  video: ServicesVideoType | null
}
/**
 * Single video in a carousel.
 */
export default function PlaylistCarouselVideo({
  playerId,
  video
}: PlaylistCarouselVideoProps) {
  const navigate = useNavigate()

  const snapshotRefImageWrapperRef = useRef<HTMLDivElement>(null)

  const snapshotUrl = video ? getSnapshotUrl(video, "sd").url : ""

  const { isImageLoaded } = useImageLoader(
    snapshotRefImageWrapperRef,
    snapshotUrl
  )
  /**
   * Navigate to the single video page.
   */
  function handleVideoWrapperClick() {
    if (video) {
      navigate(`/video/${playerId}/${video.id}`)
    }
  }

  return (
    <div
      className="playlist-carousel-video-wrapper cursor-pointer"
      onClick={handleVideoWrapperClick}
    >
      <div ref={snapshotRefImageWrapperRef} className="relative aspect-video">
        {isImageLoaded && (
          <div className={`rounded-md aspect-video w-[98%]`}>
            <img
              src={snapshotUrl}
              alt={video?.title + " snapshot"}
              className="rounded-md w-[98%]"
            />
          </div>
        )}

        {!isImageLoaded && (
          <div className="rounded-md w-[98%] bg-blue-900 aspect-video"></div>
        )}
      </div>
    </div>
  )
}
