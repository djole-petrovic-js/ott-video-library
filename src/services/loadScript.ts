/**
 * Load a generic script tag.
 *
 * @param {string} scriptUrl - Script URL.
 *
 * @returns {Promise<{ loaded: boolean }>}
 */
export function loadScriptTag(scriptUrl: string): Promise<{ loaded: boolean }> {
  return new Promise((resolve, reject) => {
    const head: HTMLHeadElement | null = document.querySelector("head")
    const script: HTMLScriptElement = document.createElement("script")

    if (head == null) {
      throw new Error("Could not find HEAD element!")
    }

    script.type = "text/javascript"
    script.async = true
    script.src = scriptUrl

    script.onload = () => {
      resolve({ loaded: true })
    }

    script.onerror = () => {
      reject({ loaded: false })
    }

    head.appendChild(script)
  })
}
