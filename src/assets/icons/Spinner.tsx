/**
 * 
 * @returns 
 */
export default function Spinner() {
  return (
    <div
      className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] md:h-8 md:w-8 xl:h-12 xl:w-12 "
      role="status"
    ></div>
  )
}