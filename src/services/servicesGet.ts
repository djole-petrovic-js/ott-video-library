import UserFriendlyException from "@/src/exceptions/UserFriendlyException"
import type { PlaybackConfigurationType } from "@/src/types/playbackConfigurationType"
import type { ServicesJsonType } from "@/src/types/servicesJsonType"
/**
 * Call the services API to get the video data.
 *
 * @param {number | string} playerId - Player ID.
 * @param {PlaybackConfigurationType} playbackConfiguration - Playback configuration.
 *
 * @returns {Promise<ServicesJsonType>}
 */
export async function servicesGet(
  playerId: number | string,
  playbackConfiguration: PlaybackConfigurationType
): Promise<ServicesJsonType> {
  const url = `https://services.brid.tv/services/get/${playbackConfiguration.mode}/${playerId}/${playbackConfiguration.id}.json`

  const response = await fetch(url)

  if (!response.ok) {
    throw new UserFriendlyException(
      "Internal error occured while loading your content. Please try again."
    )
  }

  const json = await response.json()

  if (json.Error) {
    throw new UserFriendlyException(
      "This content appears to be missing. Did you enter correct URL?"
    )
  }

  return json
}
