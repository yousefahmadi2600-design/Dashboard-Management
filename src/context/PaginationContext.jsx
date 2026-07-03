import { createContext } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const PaginatioContext = createContext();

function PaginatioProvider({ children }) {
  return (
    <PaginatioContext.Provider value={{}}>{children}</PaginatioContext.Provider>
  );
}

export default PaginatioProvider;
