function StudentKpiCard({ titel, description, icon, bg }) {
  return (
    <div className="flex items-center rounded-2xl bg-slate-200 shadow-slate-300 transition-shadow duration-300 hover:shadow-sm lg:mt-3 dark:bg-slate-700 dark:shadow-slate-900">
      <div
        className={`ml-2 rounded-full ${bg} flex h-10 w-10 items-center justify-center lg:h-12 lg:w-12`}
      >
        {icon}
      </div>
      <div className="m-2">
        <h1 className="font-bold lg:text-lg">{titel}</h1>
        <h2 className="text-[10px] text-gray-500 md:text-sm dark:text-gray-300">
          {description}
        </h2>
      </div>
    </div>
  );
}

export default StudentKpiCard;
