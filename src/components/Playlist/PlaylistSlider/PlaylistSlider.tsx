/**
 * React.js Core.
 */
import { useRef } from "react"
/**
 * Components.
 */
import LeftArrow from "@/src/components/Playlist/PlaylistSlider/LeftArrow"
import RightArrow from "@/src/components/Playlist/PlaylistSlider/RightArrow"
import PlaylistVideo from "@/src/components/Playlist/PlaylistSlider/PlaylistVideo/PlaylistVideo"
import PlaylistSliderTitle from "@/src/components/Playlist/PlaylistSlider/PlaylistSliderTitle"
/**
 * Hooks.
 */
import usePlaylistSliderResize from "@/src/hooks/usePlaylistSliderResize"
import useArrowsScroll from "@/src/hooks/useArrowsScroll"
/**
 * Types
 */
import type { ServicesVideoType } from "@/src/types/servicesVideoType"
/**
 * Props.
 */
interface PlaylistSliderProps {
  playerId: number
  videos: ServicesVideoType[]
  playlistTitle: string
  wrap: boolean
}
/**
 * Playlist slider.
 */
export default function PlaylistSlider({
  playerId,
  videos,
  playlistTitle,
  wrap
}: PlaylistSliderProps) {
  const sliderWrapperRef = useRef<HTMLDivElement>(null)

  const { numberOfThumbsToShow, marginToUse } =
    usePlaylistSliderResize(sliderWrapperRef)

  const {
    scrollingInProgress,
    showLeftArrow,
    showRightArrow,
    handleLeftArrowClick,
    handleRightArrowClick
  } = useArrowsScroll({
    htmlElementReference: sliderWrapperRef
  })

  const videosToRender =
    videos.length > 0
      ? videos.map((video: ServicesVideoType, index: number) => ({
          index: index,
          video: video
        }))
      : Array.from(
          { length: numberOfThumbsToShow },
          (_, index) => index + 1
        ).map((index) => ({
          index: index,
          video: null
        }))

  return (
    <div className="bg-gradient-to-b from-primaryBg via-secondaryBg to-primaryBg">
      <div className="pt-10 w-[95%] m-auto">
        <PlaylistSliderTitle playlistTitle={playlistTitle} />

        <div className="relative group">
          {showLeftArrow && (
            <LeftArrow
              onClick={handleLeftArrowClick}
              scrollingInProgress={scrollingInProgress}
            />
          )}

          <div
            ref={sliderWrapperRef}
            className={`flex flex-row ${
              "ontouchstart" in window ? "overflow-scroll" : "overflow-hidden"
            } gap-y-4`}
            style={{ flexFlow: `row ${wrap ? "wrap" : ""}` }}
          >
            {videosToRender.map((video) => (
              <PlaylistVideo
                key={`playlist-video-${video.index}-${video.video ? 1 : 0}`}
                playerId={playerId}
                videoJson={video.video}
                numberOfThumbsToShow={numberOfThumbsToShow}
                marginToUse={marginToUse}
              />
            ))}
          </div>

          {showRightArrow && (
            <RightArrow
              onClick={handleRightArrowClick}
              scrollingInProgress={scrollingInProgress}
            />
          )}
        </div>
      </div>
    </div>
  )
}
