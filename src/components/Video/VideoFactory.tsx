/**
 * React.js Core.
 */
import { useRef } from "react"
/**
 * Hooks.
 */
import usePlaybackDataProvider from "@/src/hooks/usePlaybackDataProvider"
/**
 * Components.
 */
import PromoVideo from "@/src/components/Video/PromoVideo/PromoVideo"
import FeaturedVideo from "@/src/components/Video/FeaturedVideo/FeaturedVideo"
/**
 * Types.
 */
import { PlaybackConfigurationType } from "@/src/types/playbackConfigurationType"
/**
 * Props.
 */
interface VideoFactoryProps {
  playerId: number
  playbackConfiguration: PlaybackConfigurationType
}
/**
 * Intialize correct video component based on playback configuration.
 */
export default function VideoFactory({
  playerId,
  playbackConfiguration
}: VideoFactoryProps) {
  const wrapperDivRef = useRef<HTMLDivElement>(null)

  const { jsonData: videoJson } = usePlaybackDataProvider(
    wrapperDivRef,
    playerId,
    playbackConfiguration
  )

  return (
    <>
      {playbackConfiguration.layout === "promo" && (
        <div ref={wrapperDivRef}>
          <PromoVideo playerId={playerId} videoJson={videoJson} />
        </div>
      )}

      {playbackConfiguration.layout === "featured" && (
        <div ref={wrapperDivRef}>
          <FeaturedVideo playerId={playerId} videoJson={videoJson} />
        </div>
      )}
    </>
  )
}
