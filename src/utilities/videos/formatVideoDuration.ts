/**
 * Formt video duration from seconds to HH:MM:SS.
 *
 * @param {string|number} secNumb - Number of seconds.
 *
 * @returns {string} - Formatted duration.
 */
export default function formatVideoDuration(secNumb?: string | number): string {
  if (secNumb === undefined) {
    secNumb = 0
  }

  if (typeof secNumb === "string") {
    secNumb = parseInt(secNumb)
  }

  let hours: string | number = Math.floor(secNumb / 3600)
  let minutes: string | number = Math.floor((secNumb - hours * 3600) / 60)
  let seconds: string | number = secNumb - hours * 3600 - minutes * 60

  if (hours < 10) {
    hours = "0" + hours
  }
  if (minutes < 10) {
    minutes = "0" + minutes
  }
  if (seconds < 10) {
    seconds = "0" + seconds
  }

  return (hours != "00" ? hours + ":" : "") + minutes + ":" + seconds
}
