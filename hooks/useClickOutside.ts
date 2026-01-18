import { useEffect, RefObject } from "react";

/**
 * Custom hook to handle clicks outside of a referenced element
 * @param ref - React ref object for the element to detect outside clicks
 * @param handler - Callback function to execute when click is outside
 */
export function useClickOutside<T extends HTMLElement | null>(
  ref: RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

