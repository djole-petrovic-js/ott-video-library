/**
 * React.js Core.
 */
import { useNavigate } from "react-router-dom"
import { useRef, useState } from "react"
/**
 * Components.
 */
import MiniVideoPlayer from "@/src/components/Playlist/PlaylistSlider/PlaylistVideo/MiniVideoPlayer/MiniVideoPlayer"
import PlaylistVideoSnapshot from "@/src/components/Playlist/PlaylistSlider/PlaylistVideo/PlaylistVideoSnapshot"
import PlaylistVideoTitle from "@/src/components/Playlist/PlaylistSlider/PlaylistVideo/PlaylistVideoTitle"
/**
 * Types.
 */
import type { ServicesVideoType } from "@/src/types/servicesVideoType"
/**
 * Utilities.
 */
import formatVideoDuration from "@/src/utilities/videos/formatVideoDuration"
import isTouchDevice from "@/src/utilities/html/isTouchDevice"
/**
 * Props.
 */
type PlaylistVideoProps = {
  playerId: string | number
  videoJson: ServicesVideoType | null
  numberOfThumbsToShow: number
  marginToUse: number
}
/**
 * Show a single video in a playlist slider.
 */
export default function PlaylistVideo({
  playerId,
  videoJson,
  numberOfThumbsToShow,
  marginToUse
}: PlaylistVideoProps) {
  const timeoutRef = useRef<number | null>(null)

  const navigate = useNavigate()
  const [showMiniPlayer, setShowMiniPlayer] = useState<boolean>(false)
  /**
   * Show the mini player on mouse enter.
   */
  function onMouseEnter() {
    timeoutRef.current = window.setTimeout(() => {
      setShowMiniPlayer(true)
    }, 500)
  }
  /**
   * Hide the mini player on mouse leave.
   */
  function onMouseLeave() {
    setShowMiniPlayer(false)

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }
  /**
   * Navigate to the video page on video click.
   */
  function handleOnVideoClick() {
    if (isTouchDevice() && videoJson) {
      navigate(`/video/${playerId}/${videoJson.id}`)
    }
  }

  return (
    <div
      className="aspect-video cursor-pointer relative"
      style={{
        flex: `0 0 calc(${100 / numberOfThumbsToShow}% - ${marginToUse}px)`,
        marginRight: `${marginToUse}px`
      }}
    >
      <div
        className="relative aspect-video"
        onClick={handleOnVideoClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <PlaylistVideoSnapshot video={videoJson} />

        <p
          className="
            transition-opacity duration-[1500ms]
            absolute bottom-1 right-1
            bg-black text-white text-sm
            py-1 px-2 rounded-md opacity-0"
        >
          {videoJson ? formatVideoDuration(videoJson.duration) : "..."}
        </p>

        {!isTouchDevice() && (
          <MiniVideoPlayer
            showMiniPlayer={showMiniPlayer}
            playerId={playerId}
            videoJson={videoJson}
          />
        )}
      </div>

      <PlaylistVideoTitle videoJson={videoJson} />
    </div>
  )
}
