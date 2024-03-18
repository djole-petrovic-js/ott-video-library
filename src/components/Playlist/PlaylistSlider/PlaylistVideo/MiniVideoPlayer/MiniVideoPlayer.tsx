/**
 * React.js Core.
 */
import { useNavigate } from "react-router-dom"
import { useCallback, useEffect, useRef, useState } from "react"
/**
 * Components.
 */
import TimeProgress from "@/src/components/Playlist/PlaylistSlider/PlaylistVideo/MiniVideoPlayer/TimeProgress"
import MuteToggle from "@/src/components/Playlist/PlaylistSlider/PlaylistVideo/MiniVideoPlayer/MuteToggle"
import Loading from "@/src/components/Playlist/PlaylistSlider/PlaylistVideo/MiniVideoPlayer/Loading"
/**
 * Types.
 */
import type { ServicesVideoType } from "@/src/types/servicesVideoType"
/**
 * Mini video player, when hovering over a video thumbnail.
 */
export default function MiniVideoPlayer({
  playerId,
  showMiniPlayer,
  videoJson
}: {
  playerId: string | number
  showMiniPlayer: boolean
  videoJson: ServicesVideoType | null
}) {
  const navigate = useNavigate()

  const videoReference = useRef<HTMLVideoElement>(null)
  const progressDivReference = useRef<HTMLDivElement>(null)

  const [miniPlayerState, setMiniPlayerState] = useState({
    videoStarted: false,
    status: "paused",
    volume: 0,
    muted: true
  })
  /**
   * Navigate to the video page.
   */
  function handleOnVideoClick() {
    if (videoJson) {
      navigate(`/video/${playerId}/${videoJson.id}`)
    }
  }
  /**
   * Mute or unmute the video.
   */
  function muteToggleClick() {
    const videoElement: HTMLVideoElement | null = videoReference.current

    if (videoElement) {
      setMiniPlayerState((miniPlayerState) => {
        const volumeSubState = {
          volume: videoElement.volume === 0 ? 0.5 : 0,
          muted: videoElement.muted ? false : true
        }

        return { ...miniPlayerState, ...volumeSubState }
      })
    }
  }
  /**
   * Update the progress bar.
   */
  function onTimeUpdate() {
    const videoElement: HTMLVideoElement | null = videoReference.current
    const progressDiv = progressDivReference.current

    if (videoElement && progressDiv) {
      const percentage =
        (videoElement.currentTime * 100) / videoElement.duration

      progressDiv.style.width = `${percentage}%`
    }
  }
  /**
   * Mark the video as started.
   */
  const onPlaying = useCallback(() => {
    if (!miniPlayerState.videoStarted) {
      setMiniPlayerState((prev) => ({ ...prev, videoStarted: true }))
    }
  }, [miniPlayerState])
  /**
   * Set the video status to playing.
   */
  const onPlay = () => {
    setMiniPlayerState((prev) => ({ ...prev, status: "playing" }))
  }
  /**
   * Set the video status to paused.
   */
  const onPause = () => {
    setMiniPlayerState((prev) => ({ ...prev, status: "paused" }))
  }
  /**
   * Attach the event listeners to the video element.
   */
  useEffect(() => {
    const videoElement: HTMLVideoElement | null = videoReference.current

    if (videoElement) {
      videoElement.ontimeupdate = onTimeUpdate
      videoElement.onplaying = onPlaying
      videoElement.onplay = onPlay
      videoElement.onpause = onPause
    }
  }, [onPlaying])
  /**
   * Update the video element when the mini player state changes.
   * For example, reset the progress bar on mouse leave.
   * Or autoplay the video when the video element is ready.
   */
  useEffect(() => {
    const videoElement: HTMLVideoElement | null = videoReference.current
    const progressDiv = progressDivReference.current

    if (videoElement && showMiniPlayer) {
      videoElement.volume = miniPlayerState.volume
      videoElement.muted = miniPlayerState.muted

      if (videoJson && miniPlayerState.status !== "playing") {
        videoElement.play()
      }
    }

    if (
      videoElement &&
      !showMiniPlayer &&
      miniPlayerState.videoStarted &&
      miniPlayerState.status !== "paused"
    ) {
      videoElement.pause()

      videoElement.currentTime = 0
    }

    if (progressDiv && !showMiniPlayer) {
      progressDiv.style.width = "0%"
    }
  }, [miniPlayerState, showMiniPlayer, videoJson])

  return (
    <>
      {showMiniPlayer && !miniPlayerState.videoStarted && <Loading />}

      <div
        className={`${
          showMiniPlayer && miniPlayerState.videoStarted
            ? "visible"
            : "invisible"
        } absolute top-0 aspect-video z-10`}
      >
        <div className="flex w-full relative">
          <MuteToggle
            videoReference={videoReference}
            onClickHandler={muteToggleClick}
          />

          <div onClick={handleOnVideoClick}>
            {videoJson && (
              <video
                ref={videoReference}
                src={videoJson.source.sd}
                preload="none"
                loop
              ></video>
            )}
          </div>

          <TimeProgress videoReference={videoReference} />

          <div className="absolute bottom-0 flex w-full z-10">
            <div className="w-full h-[3px]">
              <div
                ref={progressDivReference}
                className="bg-gray-300 h-full"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
