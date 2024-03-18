/**
 * Generate a random integer between the given range.
 *
 * @param {number} min - The minimum value of the range.
 * @param {number} max - The maximum value of the range.
 *
 * @returns {number} - The random integer.
 */
export default function getRandomInteger(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
