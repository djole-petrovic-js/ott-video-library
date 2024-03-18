/**
 * React.js Core.
 */
import { useContext } from "react"
import { useParams } from "react-router-dom"
/**
 * Components.
 */
import PlaylistFactory from "@/src/components/Playlist/PlaylistFactory"
import VideoFactory from "@/src/components/Video/VideoFactory"
/**
 * Contexts.
 */
import { ApplicationCmsConfigurationContext } from "@/src/context/ApplicationCmsConfigurationContext"
/**
 * Types.
 */
import { ApplicationCmsConfigurationType } from "@/src/types/ApplicationCmsConfigurationTypes"
/**
 * Exceptions.
 */
import UserFriendlyException from "@/src//exceptions/UserFriendlyException"
/**
 * Build the video content stripes, based on the json configuration.
 *
 * Featured video is shown on top of the page, if it is defined.
 * - It has to be done this way, because of the specific styling requirements.
 *
 * For other stripes, initialize the correct Factory component based on the playback configuration.
 */
export default function ContentPage() {
  const applicationCmsConfiguration: ApplicationCmsConfigurationType =
    useContext(
      ApplicationCmsConfigurationContext
    ) as ApplicationCmsConfigurationType

  let { slug } = useParams()

  if (!slug) {
    slug = Object.keys(applicationCmsConfiguration.pages)[0]
  }

  const featured = applicationCmsConfiguration.pages[slug].featured

  return (
    <div>
      {featured !== undefined && (
        <div className="-mt-32 shadow-2xl">
          <VideoFactory
            key={`${featured.layout}-${featured.id}`}
            playerId={applicationCmsConfiguration.playerId}
            playbackConfiguration={featured}
          />
        </div>
      )}

      <div
        className={
          applicationCmsConfiguration.pages[slug].featured
            ? "md:-mt-40"
            : "-mt-0"
        }
      >
        {applicationCmsConfiguration.pages[slug].content.map(
          (playbackConfiguration) => {
            switch (playbackConfiguration.type) {
              case "video": {
                return (
                  <VideoFactory
                    key={`${playbackConfiguration.layout}-${playbackConfiguration.id}`}
                    playerId={applicationCmsConfiguration.playerId}
                    playbackConfiguration={playbackConfiguration}
                  />
                )
              }

              case "playlist": {
                return (
                  <PlaylistFactory
                    key={`${slug}-${playbackConfiguration.layout}-${playbackConfiguration.id}`}
                    playerId={applicationCmsConfiguration.playerId}
                    playbackConfiguration={playbackConfiguration}
                  />
                )
              }

              default: {
                throw new UserFriendlyException("Unknown content type.")
              }
            }
          }
        )}
      </div>
    </div>
  )
}
