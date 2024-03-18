/**
 * React.js Core.
 */
import { useRef } from "react"
import dayjs from "dayjs"
/**
 * Components.
 */
import PlaylistSlider from "@/src/components/Playlist/PlaylistSlider/PlaylistSlider"
/**
 * Hooks.
 */
import { useVideoPlayer } from "@/src/hooks/useVideoPlayer"
/**
 * Icons.
 */
import ClockIcon from "@/src/assets/icons/ClockIcon"
import DateIcon from "@/src/assets/icons/DateIcon"
/**
 * Types.
 */
import { ServicesJsonType } from "@/src/types/servicesJsonType"
/**
 * Utilities.
 */
import formatVideoDuration from "@/src/utilities/videos/formatVideoDuration"
/**
 * Props.
 */
type VideoDetailsProps = {
  playerId: number
  videoJson: ServicesJsonType | null
}
/**
 * Render the video details, including the video player and the related videos.
 */
export default function VideoDetails({
  playerId,
  videoJson
}: VideoDetailsProps) {
  const video = videoJson ? videoJson.Video[0] : null

  const videoPlayerHolderRef = useRef<HTMLDivElement | null>(null)
  const playerIdentifier: string = "video-player"

  const { isPlayerReady } = useVideoPlayer({
    servicesJson: videoJson,
    playerIdentifier: playerIdentifier
  })

  return (
    <>
      <div className="lg:w-4/6 md:w-5/6 mx-auto">
        <div className="w-full">
          <div className="video-holder">
            {!isPlayerReady && (
              <div className="animate-pulse rounded-md bg-blue-900 w-full aspect-video"></div>
            )}

            <div ref={videoPlayerHolderRef} id={playerIdentifier}></div>
          </div>
        </div>

        <div className="w-full bg-[#2E2E3A] p-5 md:px-20 md:py-10">
          <div className="flex flex-row gap-5">
            <div className="flex flex-row justify-center gap-2">
              <div className="h-[100%]">
                <ClockIcon />
              </div>

              {video ? formatVideoDuration(video.duration) : "--"}
            </div>

            <div className="flex flex-row justify-center gap-2">
              <div className="h-[100%]">
                <DateIcon />
              </div>

              {video ? dayjs(video.created).format("D MMM") : "--"}
            </div>
          </div>

          <h2 className="font-bold text-3xl mb-5">
            {video?.title || video?.name || "Loading title..."}
          </h2>

          <p>{video?.description || "Loading description..."}</p>
        </div>
      </div>

      <PlaylistSlider
        playerId={playerId}
        videos={
          videoJson && video
            ? videoJson.Related.filter(
                (relatedVideo) => relatedVideo.id !== video.id
              )
            : []
        }
        playlistTitle="Related videos"
        wrap={true}
      />
    </>
  )
}
