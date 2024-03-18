import Footer from "@/src/components/Layout/Footer"
import Header from "@/src/components/Layout/Header"
/**
 * Renders the NotFoundPage component.
 * This component displays a 404 - Not Found message.
 */
export default function NotFoundPage() {
  return (
    <>
      <Header />

      <div className="w-full h-screen flex items-center justify-center">
        <h1 className="text-4xl">404 - Not Found</h1>
      </div>

      <Footer />
    </>
  )
}
