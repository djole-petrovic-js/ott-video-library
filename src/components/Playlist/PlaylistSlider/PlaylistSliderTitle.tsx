/**
 * Props.
 */
type PlaylistSliderTitleProps = {
  playlistTitle: string
}
/**
 * Playlist slider title.
 */
export default function PlaylistSliderTitle({
  playlistTitle
}: PlaylistSliderTitleProps) {
  return (
    <div className="relative mb-4 w-full">
      {playlistTitle && (
        <div className={`font-bold lg:text-3xl text-white w-fit`}>
          <h1>{playlistTitle}</h1>
        </div>
      )}

      {!playlistTitle && (
        <div className="font-bold lg:text-3xl text-white w-fit">
          <div className="animate-pulse bg-blue-900 rounded-md">
            <h1 className="invisible">Playlist title placeholder</h1>
          </div>
        </div>
      )}
    </div>
  )
}
