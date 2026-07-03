import { useEffect, useState } from "react";

export default function useClickOutside(divRef, iconRef) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (
        !divRef.current.contains(e.target) &&
        !iconRef.current.contains(e.target)
      )
        setIsOpen(false);
    };
    document.addEventListener("pointerdown", handleClickOutside);
    return () =>
      document.removeEventListener("pointerdown", handleClickOutside);
  }, [isOpen]);
  return { isOpen, setIsOpen };
}
