/**
 * Native and external packages imports
 */
import { useRef } from "react"
import { useNavigate } from "react-router-dom"
/**
 * Hooks.
 */
import { useVideoPlayer } from "@/src/hooks/useVideoPlayer"
/**
 * Types.
 */
import type { ServicesJsonType } from "@/src/types/servicesJsonType"
import type { ServicesVideoType } from "@/src/types/servicesVideoType"
/**
 * Highlight the featured video.
 */
export default function FeaturedVideo({
  playerId,
  videoJson
}: {
  playerId: number
  videoJson: ServicesJsonType | null
}) {
  const navigate = useNavigate()
  const videoPlayerHolderRef = useRef<HTMLDivElement | null>(null)

  const video: ServicesVideoType | null = videoJson ? videoJson.Video[0] : null
  const playerIdentifier: string = "video-player"
  /**
   * Take the user to the single video page.
   */
  function handleWatchNowClick() {
    if (video) {
      navigate(`/video/${playerId}/${video.id}`)
    }
  }

  const { isPlayerReady } = useVideoPlayer({
    servicesJson: videoJson,
    playerIdentifier,
    granularPlayerConfiguration: {
      start_volume: 0,
      autoplay: true,
      autoplay_desktop: true,
      controls: false,
      video_source: "hd"
    },
    playerEvents: {
      lastSecond: () => window.Brid.players[playerIdentifier].currentTime(0)
    }
  })

  return (
    <div className="relative w-full">
      <div className="relative overflow-hidden">
        <div className="z-10 flex absolute h-full items-center ml-10">
          <div>
            <div className="z-10 bg-black py-5 top-0 bg-transparent">
              <div className="mb-4">
                {video && isPlayerReady && (
                  <h2 className="font-bold lg:text-3xl text-white">
                    {video.title || video.name}
                  </h2>
                )}
              </div>

              <div className="mb-4 max-w-[30%]">
                {video && isPlayerReady && (
                  <p className="line-clamp-4 text-white">{video.description}</p>
                )}
              </div>

              {isPlayerReady && (
                <button
                  onClick={handleWatchNowClick}
                  className="bg-s rounded-md bg-red-600 text-white py-2 px-6 hover:bg-white hover:text-black hover:border-black"
                >
                  Watch Now
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="w-[100%] mask-linear-gradient">
          {!isPlayerReady && (
            <div className="animate-pulse rounded-md bg-blue-900 w-full aspect-video"></div>
          )}

          <div ref={videoPlayerHolderRef} id="video-player"></div>
        </div>
      </div>
    </div>
  )
}
