import { ChevronDown, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function CustomSelect({ options, state, setState }) {
  const dropdownRef = useRef(null);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("pointerdown", handleClickOutside);
    return () =>
      document.removeEventListener("pointerdown", handleClickOutside);
  }, [isOpen]);
  const handleKeyDown = (e) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setIsOpen(true);
        setHighlightedIndex((prev) =>
          prev < options.length - 1 ? prev + 1 : 0,
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setIsOpen(true);
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : options.length - 1,
        );
        break;
      case "Enter":
        if (isOpen === true && highlightedIndex !== -1)
          setState(options[highlightedIndex]);
        else setIsOpen(true);
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : options.length - 1,
        );
        break;
      case "Escape":
        setIsOpen(false);
        break;
      case "Delete":
        setState();
        break;
    }
  };
  const dropdown = options.filter((option) => option.label !== state?.label);

  return (
    <div
      className="relative text-[12px] lg:text-base"
      ref={dropdownRef}
      onKeyDown={(e) => handleKeyDown(e)}
    >
      <button
        className="flex h-9 items-center justify-center rounded-lg border border-violet-600 bg-violet-500 px-2 text-sm text-slate-200 shadow-sm shadow-slate-300 sm:text-base lg:gap-2 lg:px-6 dark:bg-violet-600 dark:shadow-slate-900"
        onClick={() => setIsOpen(!isOpen)}
      >
        {state === undefined ? (
          "Sort by"
        ) : (
          <>
            {state.label}
            {state.icon}
          </>
        )}
        {state !== undefined && (
          <X
            onClick={(e) => {
              e.stopPropagation();
              setState(undefined);
            }}
            size={16}
            strokeWidth={4}
          />
        )}
        <ChevronDown size={20} strokeWidth={3} />
      </button>
      {isOpen && (
        <div className="absolute top-6 -right-4 z-10 row-end-10 mt-2 grid overflow-hidden rounded-2xl border border-violet-700 bg-violet-700 p-1 text-[12px] sm:top-6.5 sm:text-sm lg:w-50 dark:bg-violet-950">
          {dropdown.map((option, index) => (
            <div
              key={option.label}
              className={`${index === highlightedIndex && "bg-slate-700"} flex justify-between rounded-lg p-2 text-white hover:bg-violet-500`}
              onClick={() => {
                setIsOpen(false);
                setState(option);
              }}
            >
              {option.label}
              {option.icon}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomSelect;
