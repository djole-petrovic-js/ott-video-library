import { createContext } from "react"

import { ApplicationCmsConfigurationType } from "@/src/types/ApplicationCmsConfigurationTypes"

export const ApplicationCmsConfigurationContext =
  createContext<ApplicationCmsConfigurationType | null>(null)
