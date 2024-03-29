/**
 * React.js Core.
 */
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
/**
 * Renders a loading spinner for the mini video player.
 */
export default function MiniVideoPlayerLoading() {
  return (
    <div className="absolute top-0 aspect-video w-full">
      <div className="flex w-full relative items-center justify-center h-full">
        <FontAwesomeIcon className="fa-spin" icon={faSpinner} />
      </div>
    </div>
  )
}
