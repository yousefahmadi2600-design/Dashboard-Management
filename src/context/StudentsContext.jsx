import { createContext, useEffect, useState } from "react";
import { allStudents } from "../data/stusents";

// eslint-disable-next-line react-refresh/only-export-components
export const StudentsContext = createContext();
function StudentsProvider({ children }) {
   const [storedStudents,setStoredStudents] = useState(() => {
    const students = localStorage.getItem("allStudents");
    if (students) {
      return JSON.parse(students);
    }
    localStorage.setItem("allStudents", JSON.stringify(allStudents));
    return allStudents;
  });
  useEffect(() => {
    localStorage.setItem("allStudents", JSON.stringify(storedStudents));
  }, [storedStudents]);
  return (
    <StudentsContext.Provider value={{ storedStudents, setStoredStudents }}>
      {children}
    </StudentsContext.Provider>
  );
}

export default StudentsProvider;
