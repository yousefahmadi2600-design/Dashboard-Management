import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRightIcon,
} from "lucide-react";

function Pagination({
  itemPerPage,
  totalItems,
  itemName,
  currentPage,
  setCurrentPage,
}) {
  const totalPages = Math.ceil(totalItems / itemPerPage);
  const pages = [];
  for (
    let i = Math.max(1, currentPage - 2);
    i <= Math.min(totalPages, currentPage + 2);
    i++
  ) {
    pages.push(i);
  }
  return (
    <div className="flex sm:flex-row flex-col-reverse gap-2 items-center justify-between text-[12px] sm:text-sm lg:mt-4 lg:px-3">
      <span className="text-gray-600 dark:text-gray-400">
        Showing &nbsp;
        <span className="font-semibold text-black lg:text-lg sm:text-base dark:text-gray-100">
          {currentPage} _ {totalPages}&nbsp;
        </span>
        of{" "}
        <span className="font-semibold text-black lg:text-lg sm:text-base dark:text-gray-100">
          &nbsp;{totalItems}&nbsp;
        </span>{" "}
        {itemName}
      </span>
      <div className="flex items-center gap-1">
        <ChevronsLeft
          onClick={() => setCurrentPage(currentPage / currentPage)}
          className="size-4 sm:size-5 dark:stroke-white"
        />
        <ChevronLeft
          onClick={() => {
            if (currentPage > 1) setCurrentPage(currentPage - 1);
          }}
          className="size-4 sm:size-5 dark:stroke-white"
        />
        {pages.map((page, index) => {
          return (
            <button
              key={index}
              onClick={() => setCurrentPage(page)}
              className={
                currentPage === page
                  ? "h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-violet-600 text-white lg:h-8 lg:w-8 dark:bg-violet-800"
                  : "h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-violet-300 text-black lg:h-8 lg:w-8 dark:bg-violet-400"
              }
            >
              {page}
            </button>
          );
        })}
        <ChevronRight
          onClick={() => {
            if (currentPage < totalPages) setCurrentPage(currentPage + 1);
          }}
          className="size-4 sm:size-5 dark:stroke-white"
        />
        <ChevronsRightIcon
          onClick={() => setCurrentPage(totalPages)}
          className="size-4 sm:size-5 dark:stroke-white"
        />
      </div>
    </div>
  );
}

export default Pagination;
