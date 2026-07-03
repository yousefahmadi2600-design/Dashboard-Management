import { Search } from "lucide-react";

function Input({ onChange, className, placeholder }) {
  return (
    <div className={`relative flex-1 ${className}`}>
      <input
        onChange={onChange}
        type="text"
        placeholder={placeholder}
        className="h-9 w-full min-w-11/12 rounded-lg border border-gray-300 bg-slate-100 pl-9 text-sm shadow-sm shadow-slate-300 outline-none placeholder:text-slate-400 sm:min-w-40 md:pl-10 lg:w-full lg:py-2 lg:pr-3 lg:pl-10 lg:text-base dark:border dark:border-slate-900 dark:bg-slate-900 dark:text-slate-100 dark:shadow-slate-900 dark:placeholder:text-slate-500"
      />
      <Search className="absolute top-1.5 md:top-1 left-2 size-6 stroke-slate-500 md:size-7" />
    </div>
  );
}

export default Input;
