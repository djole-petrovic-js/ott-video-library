/**
 * React.js Core.
 */
import { useRef } from "react"
/**
 * Hooks.
 */
import { useImageLoader } from "@/src/hooks/useImageLoader"
/**
 * Types.
 */
import type { ServicesVideoType } from "@/src/types/servicesVideoType"
/**
 * Utilities.
 */
import getSnapshotUrl from "@/src/utilities/videos/getSnapshotUrl"
/**
 * Props.
 */
type VideoSnapshotProps = {
  video: ServicesVideoType | null
}
/**
 * Show the video snapshot, inside of the Promo video component.
 */
export default function VideoSnapshot({ video }: VideoSnapshotProps) {
  const snapshotRefImageWrapperRef = useRef<HTMLDivElement>(null)

  const snapshotUrl = video ? getSnapshotUrl(video, "sd").url : ""

  const { isImageLoaded } = useImageLoader(
    snapshotRefImageWrapperRef,
    snapshotUrl
  )

  return (
    <div
      ref={snapshotRefImageWrapperRef}
      className="flex aspect-video md:w-[50%]"
    >
      {isImageLoaded && (
        <img
          className="rounded-md"
          src={snapshotUrl}
          alt={(video ? video.title : "") + " snapshot"}
        />
      )}

      {!isImageLoaded && (
        <div className="w-full">
          <div className="animate-pulse rounded-md bg-blue-900 aspect-video"></div>
        </div>
      )}
    </div>
  )
}
