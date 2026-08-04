function DashboardKpiCard({ icon, detail, titele, description }) {
  return (
    <div className="rounded-lg bg-linear-to-b from-slate-500 via-slate-400 to-transparent p-0.5 shadow-slate-300 transition-shadow duration-300 hover:shadow-md sm:h-auto lg:rounded-2xl dark:from-black dark:via-slate-600 dark:shadow-black">
      <div className="h-full rounded-lg bg-gray-50 p-2 sm:items-center lg:block lg:rounded-2xl lg:p-3 dark:bg-slate-900">
        <div className="w-full items-center sm:flex">
          <h1 className="text-[12px] font-semibold text-gray-700 sm:hidden  dark:text-gray-300">
            {titele}
          </h1>
          <div className="flex sm:hidden">
            {icon}
            <div className="ml-2 sm:w-50 lg:ml-3">
              <h1 className="flex h-full items-center text-xl font-semibold dark:text-gray-100">
                {detail}
              </h1>
            </div>
          </div>
          <div className="hidden sm:flex items-center flex-wrap">
            {icon}
            <div className="ml-2 lg:ml-3">
              <h1 className="hidden text-[12px] font-semibold text-gray-700 sm:block sm:text-base lg:py-1 xl:text-lg dark:text-gray-300">
                {titele}
              </h1>
              <h1 className="text-xl font-semibold lg:text-2xl lg:font-bold dark:text-gray-100">
                {detail}
              </h1>
            </div>
          </div>
        </div>
        {/* {description} */}

        <p className="text-[10px] text-gray-600 sm:text-sm lg:text-base dark:text-gray-300">
          <span
            className={`${description.className} text-sm font-semibold sm:text-base lg:text-lg`}
          >
            {description.num} &nbsp;
          </span>
          {description.text}
        </p>
      </div>
    </div>
  );
}

export default DashboardKpiCard;
