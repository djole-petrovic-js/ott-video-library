/**
 * React.js Core.
 */
import { useNavigate } from "react-router-dom"
/**
 * Types.
 */
import type { ServicesVideoType } from "@/src/types/servicesVideoType"
/**
 * Props.
 */
type WatchNowProps = {
  playerId: number
  video: ServicesVideoType | null
}
/**
 * Take the user to the single video page.
 */
export default function WatchNow({ playerId, video }: WatchNowProps) {
  const navigate = useNavigate()
  /**
   * Navigate to the single video page.
   */
  function handleOnWatchNowClick() {
    if (video) {
      navigate(`/video/${playerId}/${video.id}`)
    }
  }

  return (
    <div className="relative mb-4">
      <div className={``}>
        {video && (
          <div>
            <button
              onClick={handleOnWatchNowClick}
              className={`rounded-md ${
                video ? "bg-red-600" : "bg-blue-900"
              } text-white py-2 px-6 hover:bg-white hover:text-black hover:border-black`}
            >
              Watch Now
            </button>
          </div>
        )}

        {!video && (
          <div className="animate-pulse rounded-md bg-blue-900">
            <button
              style={{ borderRight: "2px solid rgb(30 58 138)" }}
              className="rounded-md bg-blue-900 border-r-2 text-white py-2 px-6"
            >
              <span className="invisible">Watch now</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
