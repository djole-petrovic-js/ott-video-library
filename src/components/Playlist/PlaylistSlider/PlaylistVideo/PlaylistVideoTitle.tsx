/**
 * React.js Core.
 */
import type { ServicesVideoType } from "@/src/types/servicesVideoType"
/**
 * Props.
 */
type PlaylistVideoTitleProps = {
  videoJson: ServicesVideoType | null
}
/**
 * Video title, for each video inside of the Playlist slider.
 */
export default function PlaylistVideoTitle({
  videoJson
}: PlaylistVideoTitleProps) {
  return (
    <div className="relative my-4 w-full">
      {videoJson && (
        <div className={`transition-opacity duration-[1500ms]`}>
          <div className="line-clamp-1 relative">
            <p
              className=""
              style={{ wordBreak: "revert", whiteSpace: "normal" }}
            >
              {videoJson?.name || videoJson.title}
            </p>
          </div>
        </div>
      )}

      {!videoJson && (
        <div className={`w-full`}>
          <div
            style={{ width: "fit-content" }}
            className="bg-blue-900 animate-pulse rounded-md"
          >
            <div className="line-clamp-1 relative">
              <p
                className="invisible"
                style={{ wordBreak: "revert", whiteSpace: "normal" }}
              >
                Playlist video description placeholder
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
