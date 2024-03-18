/**
 * Playbacks are the main content of the app.
 * They can be a playlist, a video, a channel, a tag or the latest videos.
 */
export type PlaybackConfigurationType = {
  type: "playlist" | "video"
  mode: "playlist" | "video" | "latest" | "channel" | "tag"
  id: number | string
  items: number
  layout: "carousel" | "slider" | "promo" | "featured"
}
