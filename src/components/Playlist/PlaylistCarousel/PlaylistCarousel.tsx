/**
 * React.js Core.
 */
import Slider from "react-slick"
import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"
/**
 * Components.
 */
import PlaylistCarouselVideo from "@/src/components/Playlist/PlaylistCarousel/PlaylistCarouselVideo/PlaylistCarouselVideo"
/**
 * Constants.
 */
import { SLIDER_SETTINGS } from "@/src/components/Playlist/PlaylistCarousel/PlaylistCarouselSliderConfig"
/**
 * Types.
 */
import type { ServicesVideoType } from "@/src/types/servicesVideoType"
/**
 * Props.
 */
type PlaylistSliderProps = {
  playerId: number
  videos: ServicesVideoType[]
}
/**
 * Carousel Component.
 */
export default function PlaylistCarousel({
  playerId,
  videos
}: PlaylistSliderProps) {
  const videosToRender =
    videos.length > 0
      ? videos.map((video: ServicesVideoType, index: number) => ({
          index: index,
          video: video
        }))
      : Array.from({ length: 25 }, (_, index) => index + 1).map((index) => ({
          index: index,
          video: null
        }))

  return (
    <Slider {...SLIDER_SETTINGS}>
      {videosToRender.map(({ index, video }) => {
        return (
          <PlaylistCarouselVideo
            key={`carousel-video-${index}`}
            playerId={playerId}
            video={video}
          />
        )
      })}
    </Slider>
  )
}
