import { VideoSnapshotsType } from "@/src/types/videoSnapshotsType"
/**
 * Services Video Type.
 */
export type ServicesVideoType = {
  id: number
  title: string
  name: string
  duration: number
  description: string
  additional_snapshots?: {
    [snapshotId: string]: VideoSnapshotsType
  }
  snapshots?: VideoSnapshotsType
  source: {
    sd: string
  }
  thumbnail: string
  created: string
}
