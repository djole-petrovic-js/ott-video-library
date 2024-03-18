/**
 * React.js Core.
 */
import { useContext } from "react"
import { Link } from "react-router-dom"
/**
 * Types.
 */
import { ApplicationCmsConfigurationType } from "@/src/types/ApplicationCmsConfigurationTypes"
import { ApplicationCmsConfigurationContext } from "@/src/context/ApplicationCmsConfigurationContext"
/**
 * Header Component.
 */
export default function Header() {
  const applicationCmsConfiguration: ApplicationCmsConfigurationType =
    useContext(
      ApplicationCmsConfigurationContext
    ) as ApplicationCmsConfigurationType

  return (
    <div className="relative z-20">
      <div className="flex flex-row items-center gap-4 py-4 px-8">
        <nav className="flex">
          {Object.keys(applicationCmsConfiguration.pages).map((slug) => {
            return (
              <div className="mr-5" key={slug}>
                <Link
                  className={`text-xl font-semibold text-gray-200`}
                  to={`/page/${slug}`}
                >
                  {applicationCmsConfiguration.pages[slug].title}
                </Link>
              </div>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
