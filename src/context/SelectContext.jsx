import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const SelectContext = createContext();

function SelectProvider({ children }) {

  const [activeSidebar, setActiveSidebar] = useState("");
  return (
    <SelectContext.Provider
      value={{
        activeSidebar,
        setActiveSidebar,
      }}
    >
      {children}
    </SelectContext.Provider>
  );
}

export default SelectProvider;
