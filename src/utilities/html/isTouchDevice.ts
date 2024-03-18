/**
 * Figures out if the device is a touch device.
 *
 * @returns {boolean} Whether or not the device is a touch device.
 */
export default function isTouchDevice(): boolean {
  return "ontouchstart" in window
}
