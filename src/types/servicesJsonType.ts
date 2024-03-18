/**
 * Types.
 */
import { ServicesVideoType } from "@/src/types/servicesVideoType"
/**
 * Main Services JSON response type.
 */
export type ServicesJsonType = {
  Player: {
    id: number
    defaultThumbnail: string
  }
  Playlist: {
    id: number
    name: string
    items: number
    limit: number
    page: number
  }
  Related: ServicesVideoType[]
  Video: ServicesVideoType[]
  Error?: {
    m: string
  }
}
