import { useEffect } from "react";

const DEFAULT_THRESHOLD = 60;
const DEFAULT_TIME = 600;

export function useGestureNavigation({ ref, onSwipeLeft, onSwipeRight, onSwipeDown, threshold = DEFAULT_THRESHOLD, timeThreshold = DEFAULT_TIME }) {
  useEffect(() => {
    const element = ref?.current;
    if (!element) return;

    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;

    const handleTouchStart = (event) => {
      const touch = event.touches?.[0];
      if (!touch) return;
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
      touchStartTime = Date.now();
    };

    const handleTouchEnd = (event) => {
      const touch = event.changedTouches?.[0];
      if (!touch) return;

      const deltaX = touch.clientX - touchStartX;
      const deltaY = touch.clientY - touchStartY;
      const elapsed = Date.now() - touchStartTime;

      if (elapsed > timeThreshold) return;

      const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY);

      if (isHorizontalSwipe && Math.abs(deltaX) > threshold) {
        if (deltaX < 0) {
          onSwipeLeft?.();
        } else {
          onSwipeRight?.();
        }
      } else if (!isHorizontalSwipe && deltaY > threshold) {
        onSwipeDown?.();
      }
    };

    element.addEventListener("touchstart", handleTouchStart, { passive: true });
    element.addEventListener("touchend", handleTouchEnd);

    return () => {
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchend", handleTouchEnd);
    };
  }, [ref, onSwipeLeft, onSwipeRight, onSwipeDown, threshold, timeThreshold]);
}

