function DashboardCardSkeleton() {
  return (
    <div className="flex h-21 animate-pulse gap-2 space-y-3 rounded-lg border p-4 sm:h-23 lg:block lg:h-30 lg:gap-0">
      <div className="h-11 w-10 rounded bg-gray-400 lg:h-5 lg:w-20 dark:bg-gray-700"></div>
      <div className="space-y-1 lg:space-y-3">
        <div className="h-5 w-20 rounded bg-gray-400 lg:w-24 dark:bg-gray-700"></div>
        <div className="h-5 w-25 rounded bg-gray-400 lg:w-30 dark:bg-gray-700"></div>
      </div>
    </div>
  );
}

export default DashboardCardSkeleton;
