export {}

declare global {
  interface Window {
    $bp: CallableFunction
    Brid: {
      players: {
        [key: string]: {
          isReady: boolean
          currentTime: (time?: number) => void
          destroy: (preservePlayerDIV?: boolean) => void
        }
      }
    }
  }
}
