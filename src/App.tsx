/**
 * Native and external packages imports
 */
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom"
import { ErrorBoundary } from "react-error-boundary"
/**
 * Components.
 */
import Header from "@/src/components/Layout/Header"
import Footer from "@/src/components/Layout/Footer"
import ScrollToTop from "@/src/components/ScrollToTop"
/**
 * Pages
 */
import ContentPage from "@/src/pages/ContentPage"
import NotFoundPage from "@/src/pages/NotFoundPage"
import VideoPage from "@/src/pages/VideoPage"
import ErrorPage from "@/src/pages/ErrorPage"
/**
 * Types.
 */
import { ApplicationCmsConfigurationType } from "@/src/types/ApplicationCmsConfigurationTypes"
/**
 * Contexts.
 */
import { ApplicationCmsConfigurationContext } from "@/src/context/ApplicationCmsConfigurationContext"
/**
 * Application Configuration json.
 */
import ApplicationCmsConfiguration from "@/src/app-config/config.json"
/**
 * Global styles.
 */
import "@/src/index.css"

const router = createBrowserRouter([
  {
    errorElement: <NotFoundPage />,
    element: (
      <>
        <ErrorBoundary FallbackComponent={ErrorPage}>
          <Outlet />
        </ErrorBoundary>
      </>
    ),
    children: [
      {
        path: "/video/:pid/:vid",
        element: (
          <>
            <ScrollToTop>
              <>
                <Header />
                <VideoPage />
                <Footer />
              </>
            </ScrollToTop>
          </>
        )
      },
      {
        path: "/page/:slug",
        element: (
          <>
            <Header />
            <ContentPage />
            <Footer />
          </>
        )
      },
      {
        path: "/",
        element: (
          <>
            <Header />
            <ContentPage />
            <Footer />
          </>
        )
      }
    ]
  }
])

export default function App() {
  const applicationCmsConfiguration =
    ApplicationCmsConfiguration as unknown as ApplicationCmsConfigurationType

  return (
    <ApplicationCmsConfigurationContext.Provider
      value={applicationCmsConfiguration}
    >
      <RouterProvider router={router} />
    </ApplicationCmsConfigurationContext.Provider>
  )
}
