/**
 * Assets
 */
import RightArrowIcon from "@/src/assets/icons/RightArrowIcon"
/**
 * Props.
 */
type RightArrowProps = {
  onClick: () => void
  scrollingInProgress: boolean
}
/**
 * Manage the right arrow in a slider.
 */
export default function RightArrow({
  onClick,
  scrollingInProgress
}: RightArrowProps) {
  return (
    <button
      disabled={scrollingInProgress}
      onClick={onClick}
      className={`
        ${scrollingInProgress ? "opacity-30" : "opacity-70"}
        ${"ontouchstart" in window ? "visible" : "invisible"}
        flex items-center justify-center absolute top-0 left-[calc(100%-40px)]
        group-hover:visible cursor-pointer h-full w-[40px] z-20 bg-black
      `}
    >
      <RightArrowIcon />
    </button>
  )
}
