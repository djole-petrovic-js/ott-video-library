/**
 * Types.
 */
import type { ServicesVideoType } from "@/src/types/servicesVideoType"
/**
 * Props.
 */
type VideoTitleProps = {
  video: ServicesVideoType | null
}
/**
 * Video title, inside of the Promo video component.
 */
export default function VideoTitle({ video }: VideoTitleProps) {
  return (
    <div className="relative mb-4 w-full mt-4">
      {video && (
        <div className="font-bold lg:text-3xl text-white">
          <h2>{video?.name || video?.title}</h2>
        </div>
      )}

      {!video && (
        <div className="w-full font-bold lg:text-3xl text-white">
          <div className="animate-pulse rounded-md bg-blue-900">
            <p className="invisible">Placeholder text</p>
          </div>
        </div>
      )}
    </div>
  )
}
