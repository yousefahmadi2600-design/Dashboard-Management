function HeroSectionSkelecton() {
  return (
    <div className="w-full animate-pulse space-y-3 rounded border p-3">
      <div className="h-6 w-40 rounded bg-gray-400 dark:bg-gray-700"></div>
      <div className="flex items-start">
        <div className="h-20 w-20 rounded-full bg-gray-400 dark:bg-gray-700"></div>
        <div className="ml-2 lg:ml-4">
          <div className="h-5 w-20 rounded bg-gray-400 lg:w-35 dark:bg-gray-700"></div>
          <div className="mt-3 hidden grid-cols-4 gap-3 lg:grid">
            <div className="col-span-1 h-14 w-40 rounded bg-gray-400 dark:bg-gray-700"></div>
            <div className="col-span-1 h-14 w-40 rounded bg-gray-400 dark:bg-gray-700"></div>
            <div className="col-span-1 h-14 w-40 rounded bg-gray-400 dark:bg-gray-700"></div>
            <div className="col-span-1 h-14 w-40 rounded bg-gray-400 dark:bg-gray-700"></div>
          </div>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3 lg:hidden">
        <div className="h-7 rounded bg-gray-400 dark:bg-gray-700"></div>
        <div className="h-7 rounded bg-gray-400 dark:bg-gray-700"></div>
        <div className="h-7 rounded bg-gray-400 dark:bg-gray-700"></div>
        <div className="h-7 rounded bg-gray-400 dark:bg-gray-700"></div>
      </div>
    </div>
  );
}

export default HeroSectionSkelecton;
