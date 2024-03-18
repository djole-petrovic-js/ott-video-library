/**
 * React.js Core.
 */
import { useCallback, useEffect, useState } from "react"
/**
 * Utilities.
 */
import formatVideoDuration from "@/src/utilities/videos/formatVideoDuration"
/**
 * Props.
 */
type TimeProgressProps = {
  videoReference: React.MutableRefObject<HTMLVideoElement | null>
}
/**
 * Manage the current video time / video duration of the mini video player curent video.
 */
export default function TimeProgress({ videoReference }: TimeProgressProps) {
  const [videocurrentTime, setVideoCurrentTime] = useState<number>(0)
  /**
   * Update the current time of the video.
   */
  const onTimeUpdate = useCallback(() => {
    if (videoReference.current) {
      setVideoCurrentTime(videoReference.current.currentTime)
    }
  }, [videoReference])
  /**
   * Attach the on time update listener, and update the current time.
   */
  useEffect(() => {
    const videoElement = videoReference.current

    if (videoElement) {
      videoElement.addEventListener("timeupdate", onTimeUpdate)
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("timeupdate", onTimeUpdate)
      }
    }
  }, [videoReference, onTimeUpdate])

  return (
    <div className="absolute bottom-2 text-xs ml-1">
      {videoReference.current && videoReference.current.duration > 0 && (
        <p>
          {formatVideoDuration(parseInt(String(videocurrentTime)))} /{" "}
          {formatVideoDuration(
            parseInt(String(videoReference.current.duration))
          )}
        </p>
      )}
    </div>
  )
}
