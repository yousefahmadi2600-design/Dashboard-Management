import { createContext } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const FilteredContext = createContext();

function FilteredProvider({ children }) {
  return (
    <FilteredContext.Provider
      value={{}}
    >
      {children}
    </FilteredContext.Provider>
  );
}

export default FilteredProvider;
