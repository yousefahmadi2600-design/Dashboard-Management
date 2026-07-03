import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

export default function AnimatedMulti({
  placeholder,
  options,
  state,
  setState,
}) {
  return (
    <Select
      value={state}
      placeholder={placeholder}
      options={options}
      components={animatedComponents}
      isMulti
      closeMenuOnSelect={false}
      unstyled
      onChange={(selectedValue) => {
        setState(selectedValue);
      }}
      styles={{
        control: (base) => ({
          ...base,
          minHeight:"36px",
        }),
      }}
      classNames={{
        control: () =>
          " dark:bg-violet-600 bg-violet-500 shadow-sm dark:shadow-slate-900 shadow-slate-300 border border-violet-600 rounded-lg sm:px-2 lg:px-6 sm:py-1 pl-2 text-slate-200 text-sm sm:text-base",
        menu: () =>
          "dark:bg-violet-950 bg-violet-700 border border-violet-700 lg:rounded-2xl rounded-lg lg:mt-2 overflow-hidden lg:p-1 text-[12px] sm:text-sm",

        option: ({
          isFocused,
        }) => ` lg:px-3 lg:py-2 p-1 rounded-lg cursor-pointer transition-colors
      ${isFocused ? "bg-violet-500 text-white" : "text-white"}`,
      }}
    />
  );
}
