import { useState } from "react";

export default function usePagination(itemPerPage,filteredList) {
  const [currentPage, setCurrentPage] = useState(1);
  const lastIndex = itemPerPage * currentPage;
  const firstIndex = lastIndex - itemPerPage;
  const itemInPage = filteredList.slice(firstIndex, lastIndex);
  const totalItems = filteredList.length;
  return {currentPage,setCurrentPage,itemInPage,totalItems}
}
