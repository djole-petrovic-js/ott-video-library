import type { PlaybackConfigurationType } from "@/src/types/playbackConfigurationType"

export interface ApplicationCmsConfigurationType {
  servicesUrl: string
  playerId: number
  pages: {
    [key: string]: {
      title: string
      featured?: PlaybackConfigurationType
      content: PlaybackConfigurationType[]
    }
  }
}
