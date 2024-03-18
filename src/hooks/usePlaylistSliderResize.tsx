import { RefObject, useEffect, useState } from "react";

type BreakPoint = 'SM' | 'MD' | 'LG' | 'XL' | '2XL' | '3XL';

type BreakPointConfig = {
  [key in BreakPoint]: {
    items: number;
    margin: number;
  };
};

const WIDTH_BREAK_POINTS: BreakPointConfig = {
  SM: {
    items: 2,
    margin: 2,
  },
  MD: {
    items: 2,
    margin: 2,
  },
  LG: {
    items: 3,
    margin: 3,
  },
  XL: {
    items: 4,
    margin: 4,
  },
  '2XL': {
    items: 5,
    margin: 5,
  },
  '3XL': {
    items: 6,
    margin: 5,
  },
};

const getParentSizeType = (parentWidth: number) => {
  if (parentWidth >= 0 && parentWidth <= 480) {
    return 'SM';
  } else if (parentWidth >= 481 && parentWidth <= 768) {
    return 'MD';
  } else if (parentWidth >= 769 && parentWidth <= 1024) {
    return 'LG';
  } else if (parentWidth >= 1024 && parentWidth <= 1200) {
    return 'XL';
  } else if (parentWidth >= 1200 && parentWidth <= 1440) {
    return '2XL';
  } else return '3XL';
};

const getBrakePointConfig = (parentWidth: number) => {
  const parentSizeType = getParentSizeType(parentWidth);

  return WIDTH_BREAK_POINTS[parentSizeType];
};

export default function usePlaylistSliderResize(containerRef: RefObject<HTMLDivElement>) {
  const { items, margin } = getBrakePointConfig(window.innerWidth - 75);

  const [numberOfThumbsToShow, setNumberOfThumbsToShow] = useState(items);
  const [marginToUse, setMarginToUse] = useState(margin);

  useEffect(() => {
    const container = containerRef.current;

    if ( !container ) { return; }

    const observer = new ResizeObserver(() => {
      container.scrollLeft = 0;

      const width = container.offsetWidth;
      const { items, margin } = getBrakePointConfig(width);

      setNumberOfThumbsToShow(items);
      setMarginToUse(margin);
    });

    observer.observe(container);

    return () => {
      observer.disconnect();
    }
  }, [containerRef]);

  return { numberOfThumbsToShow, marginToUse };
}