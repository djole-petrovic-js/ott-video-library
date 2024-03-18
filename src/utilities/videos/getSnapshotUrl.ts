/**
 * Types.
 */
import type { ServicesVideoType } from "@/src/types/servicesVideoType"
import type { AdditionalVideoSnapshotsType } from "@/src/types/additionalVideoSnapshotsType"
import type { VideoSnapshotsType } from "@/src/types/videoSnapshotsType"

/**
 * Utilities.
 */
import getRandomInteger from "@/src/utilities/numbers/getRandomInteger"
/**
 * Given a video node, return a snapshot URL for a specific rendition.
 *
 * @param {ServicesVideoType} videoNode
 * @param {keyof VideoSnapshots} rendition
 *
 * @returns {object}
 */
export default function getSnapshotUrl(
  videoNode: ServicesVideoType,
  rendition: keyof VideoSnapshotsType
): {
  url: string
  fallbacked: boolean
} {
  /**
   * Mimics the functionality in the Brid.PosterImage component.
   */
  const snapshotResult = { url: "", fallbacked: true }
  let availableSnapshots: AdditionalVideoSnapshotsType | null = null
  /**
   * Try to find a snapshot for a specific rendition.
   */
  if (videoNode.snapshots && Object.keys(videoNode.snapshots).length > 0) {
    availableSnapshots = { default_snapshots: videoNode.snapshots }
  }

  if (
    videoNode.additional_snapshots &&
    Object.keys(videoNode.additional_snapshots).length > 0
  ) {
    availableSnapshots = videoNode.additional_snapshots
  }

  if (
    availableSnapshots != null &&
    Object.keys(availableSnapshots).length > 0
  ) {
    const availableSnapshotsKeys: string[] = Object.keys(availableSnapshots)
    const availableSnapshotsRandomKey: string =
      availableSnapshotsKeys[
        getRandomInteger(0, availableSnapshotsKeys.length - 1)
      ]
    const randomSnapshot: VideoSnapshotsType =
      availableSnapshots[availableSnapshotsRandomKey]

    snapshotResult.url = randomSnapshot[rendition] || ""

    if (snapshotResult.url) {
      snapshotResult.fallbacked = false

      return snapshotResult
    }
  }
  /**
   * If .availableSnapshots object is empty, then take a snapshot from the thumbnail, if one exists.
   *
   * Otherwise, it's a black image.
   */
  const snapshotImageParts = videoNode.thumbnail
    ? videoNode.thumbnail.split("/")
    : []

  const snapshotImageExists =
    !!snapshotImageParts[snapshotImageParts.length - 1]

  const snapshotImageUrl = snapshotImageExists
    ? videoNode.thumbnail
    : "https://cdn.brid.tv/live/default/defaultThumbnail.jpeg"

  snapshotResult.url = snapshotImageUrl

  return snapshotResult
}
