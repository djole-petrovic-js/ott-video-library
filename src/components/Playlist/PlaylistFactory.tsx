/**
 * React.js.
 */
import { useRef } from "react"
/**
 * Components.
 */
import PlaylistCarousel from "@/src/components/Playlist/PlaylistCarousel/PlaylistCarousel"
import PlaylistSlider from "@/src/components/Playlist/PlaylistSlider/PlaylistSlider"
/**
 * Hooks.
 */
import usePlaybackDataProvider from "@/src/hooks/usePlaybackDataProvider"
/**
 * Types.
 */
import type { PlaybackConfigurationType } from "@/src/types/playbackConfigurationType"
/**
 * Props.
 */
type PlaylistFactoryProps = {
  playerId: number
  playbackConfiguration: PlaybackConfigurationType
}
/**
 * Prepare the correct playlist component based on playback configuration.
 */
export default function PlaylistFactory({
  playerId,
  playbackConfiguration
}: PlaylistFactoryProps) {
  const wrapperDivRef = useRef<HTMLDivElement>(null)

  const { jsonData: playlistJson } = usePlaybackDataProvider(
    wrapperDivRef,
    playerId,
    playbackConfiguration
  )

  return (
    <>
      {playbackConfiguration.layout === "slider" && (
        <div ref={wrapperDivRef}>
          <PlaylistSlider
            playerId={playerId}
            videos={playlistJson ? playlistJson.Video : []}
            playlistTitle={playlistJson ? playlistJson.Playlist.name : ""}
            wrap={false}
          />
        </div>
      )}

      {playbackConfiguration.layout === "carousel" && (
        <div ref={wrapperDivRef}>
          <PlaylistCarousel
            playerId={playerId}
            videos={playlistJson ? playlistJson.Video : []}
          />
        </div>
      )}
    </>
  )
}
