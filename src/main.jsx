import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import SelectProvider from "./context/SelectContext.jsx";
import FilteredProvider from "./context/FilterContext.jsx";

createRoot(document.getElementById("root")).render(
  <FilteredProvider>
    <SelectProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </SelectProvider>
  </FilteredProvider>,
);
