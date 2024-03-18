import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
/**
 * React.js Core.
 */
import { faVolumeMute, faVolumeHigh } from "@fortawesome/free-solid-svg-icons"
/**
 * Props.
 */
type MiniVideoPlayerMuteToggleProps = {
  videoReference: React.MutableRefObject<HTMLVideoElement | null>
  onClickHandler: () => void
}
/**
 * Toggle the mute state of the mini video player.
 */
export default function MiniVideoPlayerMuteToggle({
  videoReference,
  onClickHandler
}: MiniVideoPlayerMuteToggleProps) {
  if (!videoReference.current) {
    return null
  }

  return (
    <div className="absolute top-0 flex w-full justify-end z-10">
      <div
        className="rounded-md bg-white m-1 px-1 text-black border-black border"
        onClick={onClickHandler}
      >
        <FontAwesomeIcon
          icon={
            videoReference.current.volume === 0 ? faVolumeHigh : faVolumeMute
          }
        />
      </div>
    </div>
  )
}
