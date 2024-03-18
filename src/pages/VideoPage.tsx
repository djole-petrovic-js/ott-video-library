/**
 * React.js Core.
 */
import { useParams } from "react-router-dom"
import { useMemo } from "react"
/**
 * Components.
 */
import VideoDetails from "@/src/components/Video/VideoDetails"
/**
 * Hooks.
 */
import usePlaybackDataProvider from "@/src/hooks/usePlaybackDataProvider"
/**
 * Types.
 */
import { PlaybackConfigurationType } from "@/src/types/playbackConfigurationType"
/**
 * Exceptions.
 */
import UserFriendlyException from "@/src/exceptions/UserFriendlyException"
/**
 * Initialize the video player and show the video details.
 */
export default function VideoPage() {
  const { pid, vid } = useParams()

  if (pid == null || vid == null) {
    throw new UserFriendlyException(
      "Something went wrong while loading your video. Please try again."
    )
  }

  const playbackConfiguration: PlaybackConfigurationType = useMemo(() => {
    return {
      type: "video",
      mode: "video",
      id: vid,
      items: 0,
      layout: "promo"
    }
  }, [vid])

  const { jsonData: videoJson } = usePlaybackDataProvider(
    null,
    Number(pid),
    playbackConfiguration
  )

  return (
    <VideoDetails
      key={`${pid}-${vid}`}
      playerId={Number(pid)}
      videoJson={videoJson}
    />
  )
}
