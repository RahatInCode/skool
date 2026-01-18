import { useEffect, useCallback } from "react";

/**
 * Custom hook to handle keyboard navigation for dropdowns and menus
 * @param isOpen - Whether the menu is currently open
 * @param onClose - Callback to close the menu
 * @param onEscape - Optional callback for Escape key (defaults to onClose)
 */
export function useKeyboardNavigation(
  isOpen: boolean,
  onClose: () => void,
  onEscape?: () => void
) {
  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        if (onEscape) {
          onEscape();
        } else {
          onClose();
        }
      }
    },
    [isOpen, onClose, onEscape]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("keydown", handleEscape);
      };
    }
  }, [isOpen, handleEscape]);
}

