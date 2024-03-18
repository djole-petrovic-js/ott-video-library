/**
 * React.js Core.
 */
import { useEffect } from "react"
/**
 * Hooks.
 */
import useIntersectionObserver from "@/src/hooks/useIntersectionObserver"
import usePlaybackLocalStorage from "@/src/hooks/usePlaybackLocalStorage"
/**
 * Services.
 */
import { servicesGet } from "@/src/services/servicesGet"
/**
 * Types.
 */
import type { PlaybackConfigurationType } from "@/src/types/playbackConfigurationType"
/**
 * When an element is in the viewport, load the relevant data, based on the playback configuration.
 * If the data is not in the local storage, fetch it from the server.
 * If the data is in the local storage, use it.
 *
 * @param wrapperDivRef - HTML element reference.
 * @param playerId - Player ID.
 * @param playbackConfiguration - Playback configuration.
 *
 * @returns jsonData - JSON data.
 */
export default function usePlaybackDataProvider(
  wrapperDivRef: React.RefObject<HTMLDivElement> | null,
  playerId: number,
  playbackConfiguration: PlaybackConfigurationType
) {
  const { isIntersecting } = useIntersectionObserver(wrapperDivRef)

  const [jsonData, setToStorage] = usePlaybackLocalStorage(
    playbackConfiguration
  )

  useEffect(() => {
    if (!jsonData && (isIntersecting || wrapperDivRef == null)) {
      servicesGet(playerId, playbackConfiguration).then(setToStorage)
    }
  }, [
    jsonData,
    isIntersecting,
    playerId,
    playbackConfiguration,
    setToStorage,
    wrapperDivRef
  ])

  return {
    jsonData
  }
}
