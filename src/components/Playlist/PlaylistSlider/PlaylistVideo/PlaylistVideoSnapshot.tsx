/**
 * React.js Core.
 */
import { useRef } from "react"
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
interface PlaylistVideoSnapshotProps {
  video: ServicesVideoType | null
}
/**
 * Video snapshot, for each video in the Playlist Slider.
 */
export default function PlaylistVideoSnapshot({
  video
}: PlaylistVideoSnapshotProps) {
  const snapshotRefImageWrapperRef = useRef<HTMLDivElement>(null)

  const snapshotUrl = video ? getSnapshotUrl(video, "sd").url : ""

  const { isImageLoaded } = useImageLoader(
    snapshotRefImageWrapperRef,
    snapshotUrl
  )

  return (
    <div ref={snapshotRefImageWrapperRef}>
      {isImageLoaded && (
        <img
          src={snapshotUrl}
          alt={video ? video.title : "Playlist video placeholder" + " snapshot"}
          className="w-full aspect-video rounded-md"
        />
      )}

      {!isImageLoaded && (
        <div className="animate-pulse rounded-md aspect-video w-full bg-blue-900"></div>
      )}
    </div>
  )
}
