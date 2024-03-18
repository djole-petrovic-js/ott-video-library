/**
 * Assets
 */
import LeftArrowIcon from "@/src/assets/icons/LeftArrowIcon"
/**
 * Props.
 */
type LeftArrowProps = {
  onClick: () => void
  scrollingInProgress: boolean
}
/**
 * Manage the left arrow in a slider.
 */
export default function LeftArrow({
  onClick,
  scrollingInProgress
}: LeftArrowProps) {
  return (
    <button
      disabled={scrollingInProgress}
      onClick={onClick}
      className={`
        ${scrollingInProgress ? "opacity-30" : "opacity-70"}
        ${"ontouchstart" in window ? "visible" : "invisible"}
        group-hover:visible cursor-pointer h-full w-[40px] flex justify-center absolute items-center z-20 bg-black`}
    >
      <LeftArrowIcon />
    </button>
  )
}
