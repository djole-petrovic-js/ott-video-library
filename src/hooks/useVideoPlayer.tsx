/**
 * React.js Core.
 */
import { useEffect, useState } from "react"
/**
 * Types.
 */
import { ServicesJsonType } from "@/src/types/servicesJsonType"
import { loadScriptTag } from "@/src/services/loadScript"
/**
 * Props.
 */
type useVideoPlayerProps = {
  servicesJson: ServicesJsonType | null
  width?: string
  height?: string
  playerIdentifier: string
  granularPlayerConfiguration?: {
    startPlaylistIndex?: number
    start_volume?: number
    autoplay?: boolean
    autoplay_desktop?: boolean
    controls?: boolean
    video_source?: string
  }
  playerEvents?: {
    [key: string]: () => void
  }
}
/**
 * Initialize the video player.
 * Load the player main script.
 * Initialize the player and attach the event listeners.
 *
 * @param servicesJson - The video data.
 *
 * @returns isPlayerReady - Is the player ready.
 */
export function useVideoPlayer({
  servicesJson,
  width = "16",
  height = "9",
  playerIdentifier,
  granularPlayerConfiguration = {},
  playerEvents = {}
}: useVideoPlayerProps) {
  const [isPlayerReady, setIsPlayerReady] = useState<boolean>(false)

  const [playerMainScriptLoadedStatus, setPlayerMainScriptLoadedStatus] =
    useState<boolean>(!!window.$bp)
  /**
   * Load the player main script.
   */
  useEffect(() => {
    const playerMainScriptAlreadyExists = document.querySelector(
      'head script[src$="brid.min.js"]'
    )

    if (!playerMainScriptAlreadyExists) {
      loadScriptTag("https://services.brid.tv/player/build/brid.min.js")
        .then(() => {
          setPlayerMainScriptLoadedStatus(true)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [])
  /**
   * Initialize the player and attach the event listeners.
   */
  useEffect(() => {
    if (
      servicesJson &&
      playerMainScriptLoadedStatus &&
      window.Brid &&
      !window.Brid.players[playerIdentifier]
    ) {
      const playerConfig = {
        id: servicesJson,
        width,
        height,
        playlist: { Video: servicesJson.Video },
        ...granularPlayerConfiguration
      }

      window.$bp(playerIdentifier, playerConfig, () => {
        const loadedPlayerReference = window.$bp(playerIdentifier)

        for (const [event, handler] of Object.entries(playerEvents)) {
          loadedPlayerReference.on(event, handler)
        }

        setIsPlayerReady(true)
      })
    }
    /**
     * Destroy the player and remove the scripts.
     */
    return () => {
      if (window.Brid) {
        if (
          window.Brid.players[playerIdentifier] &&
          window.Brid.players[playerIdentifier].isReady
        ) {
          window.$bp(playerIdentifier).destroy()
          /**
           * Script cleanup.
           */
          const scripts = [
            ...document.querySelectorAll("script[src*=\\/player\\/build]"),
            ...document.querySelectorAll(
              "script[src*=\\/sdkloader\\/ima3\\.js]"
            )
          ]

          for (const script of scripts) {
            script.remove()
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerMainScriptLoadedStatus, servicesJson, playerIdentifier])

  return { isPlayerReady }
}
