/**
 * Types.
 */
import { VideoSnapshotsType } from "@/src/types/videoSnapshotsType"
/**
 * Additional video snapshots object. (an extension of the standard video snapshots object).
 */
export type AdditionalVideoSnapshotsType = {
  [snapshotId: string]: VideoSnapshotsType
}
