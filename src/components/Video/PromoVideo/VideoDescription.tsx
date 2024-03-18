/**
 * Types.
 */
import type { ServicesVideoType } from "@/src/types/servicesVideoType"
/**
 * Props.
 */
type VideoDescriptionProps = {
  video: ServicesVideoType | null
}
/**
 * Show the video description, inside of the Promo video component.
 */
export default function VideoDescription({ video }: VideoDescriptionProps) {
  return (
    <div className="relative mb-4 w-full">
      {video && (
        <div className="delay-100 transition-all duration-[1500ms] text-white">
          <p className="line-clamp-4 text-white text-small">
            {video.description}
          </p>
        </div>
      )}

      {!video && (
        <div className="w-full text-white">
          <div className="animate-pulse rounded-md bg-blue-900">
            <p className="invisible line-clamp-4 text-white text-small">
              Witness the captivating dance of raindrops as they gracefully
              caress a glass window, creating an ethereal spectacle of nature's
              tears. Let the rhythmic patter of rain transport you to a world of
              tranquility and wonder, where the outside landscape transforms
              into a glistening canvas of serenity. Indulge in the soothing
              sounds and mesmerizing visuals of "Raindance: A Symphony of
              Nature's Tears" for a truly enchanting experience
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
