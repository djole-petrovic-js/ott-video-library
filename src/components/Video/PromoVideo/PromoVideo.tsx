/**
 * Components.
 */
import WatchNow from "@/src/components/Video/PromoVideo/WatchNow"
import VideoTitle from "@/src/components/Video/PromoVideo/VideoTitle"
import VideoDescription from "@/src/components/Video/PromoVideo/VideoDescription"
import VideoSnapshot from "@/src/components/Video/PromoVideo/VideoSnapshot"
/**
 * Types.
 */
import { ServicesJsonType } from "@/src/types/servicesJsonType"
/**
 * Props.
 */
interface PromoVideoProps {
  playerId: number
  videoJson: ServicesJsonType | null
}
/**
 * Promo Video Component.
 */
export default function PromoVideo({ playerId, videoJson }: PromoVideoProps) {
  const video = videoJson ? videoJson.Video[0] : null

  return (
    <div className="flex flex-col md:flex-row justify-center bg-gradient-to-b from-primaryBg via-secondaryBg to-primaryBg px-[10%] py-10">
      <VideoSnapshot video={video} />

      <div className="flex justify-center items-center w-full md:w-[30%] md:ml-10">
        <div className="w-full">
          <VideoTitle video={video} />
          <VideoDescription video={video} />
          <WatchNow playerId={playerId} video={video} />
        </div>
      </div>
    </div>
  )
}
