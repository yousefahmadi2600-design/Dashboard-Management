function CourseCardSkeleton() {
  return (
    <div className="h-80 animate-pulse space-y-3 rounded-lg border p-2 lg:h-104">
      <div className="h-50 w-full rounded bg-gray-400 lg:h-60 dark:bg-gray-700"></div>
      <div className="flex justify-between">
        <div className="h-5 w-40 rounded bg-gray-400 dark:bg-gray-700"></div>
        <div className="h-5 w-20 rounded bg-gray-400 dark:bg-gray-700"></div>
      </div>
      <div className="h-6 w-60 rounded bg-gray-400 dark:bg-gray-700"></div>
      <div className="h-6 w-60 rounded bg-gray-400 dark:bg-gray-700"></div>
    </div>
  );
}

export default CourseCardSkeleton;
