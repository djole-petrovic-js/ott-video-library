/**
 * Components.
 */
import Footer from "@/src/components/Layout/Footer"
import Header from "@/src/components/Layout/Header"
/**
 * Exceptions.
 */
import UserFriendlyException from "@/src/exceptions/UserFriendlyException"
/**
 * Props.
 */
type ErrorPageProps = {
  error: Error
}
/**
 * Shows an error message to the user.
 */
export default function ErrorPage({ error }: ErrorPageProps) {
  const isUserFriendly = error instanceof UserFriendlyException
  /**
   * For development purposes, log the error to the console.
   */
  console.error("ErrorPage", error)

  return (
    <>
      <Header />

      <div className="w-full h-screen flex items-center justify-center">
        <h1>
          500 |{" "}
          {isUserFriendly ? error.message : "Error occured, please try again."}
        </h1>
      </div>

      <Footer />
    </>
  )
}
