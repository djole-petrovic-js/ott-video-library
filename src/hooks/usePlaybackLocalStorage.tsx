/**
 * React.js Core.
 */
import { useCallback, useState } from "react"
/*
 * Types.
 */
import { PlaybackConfigurationType } from "@/src/types/playbackConfigurationType"
import { ServicesJsonType } from "@/src/types/servicesJsonType"
/**
 * Local storage hook.
 */
export default function usePlaybackLocalStorage(
  playbackConfiguration: PlaybackConfigurationType
) {
  /**
   * Get from storage.
   */
  const getFromStorage = useCallback(() => {
    const key = `${playbackConfiguration.mode}-${playbackConfiguration.layout}-${playbackConfiguration.id}`

    const item = localStorage.getItem(key)

    if (!item) {
      return null
    }

    const parsedItem = JSON.parse(item)

    if (parsedItem.expiration < new Date().getTime()) {
      localStorage.removeItem(key)
      return null
    }

    return JSON.parse(parsedItem.value)
  }, [playbackConfiguration])
  /**
   * Set to storage.
   */
  const setToStorage = useCallback(
    (value: ServicesJsonType) => {
      const key = `${playbackConfiguration.mode}-${playbackConfiguration.layout}-${playbackConfiguration.id}`

      const expirationMs = 15 * 60 * 1000
      const expirationTime = new Date().getTime() + expirationMs

      const item = {
        value: JSON.stringify(value),
        expiration: expirationTime
      }

      localStorage.setItem(key, JSON.stringify(item))

      setValue(value)
    },
    [playbackConfiguration]
  )
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setValue] = useState<ServicesJsonType | null>(getFromStorage())

  return [getFromStorage(), setToStorage]
}
