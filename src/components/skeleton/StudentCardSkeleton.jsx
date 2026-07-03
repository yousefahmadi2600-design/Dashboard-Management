function StudentCardSkeleton() {
  return (
    <div className="flex h-14 animate-pulse space-y-3 rounded-lg border p-2 lg:mt-3 lg:h-22 lg:p-4">
      <div className="h-11 w-11 rounded-full bg-gray-400 lg:items-center lg:justify-center dark:bg-gray-700"></div>
      <div className="pl-4">
        <div className="h-4 w-10 rounded bg-gray-400 lg:w-10 dark:bg-gray-700"></div>
        <div className="mt-2 h-4 w-20 rounded bg-gray-400 lg:w-32 dark:bg-gray-700"></div>
      </div>
    </div>
  );
}

export default StudentCardSkeleton;
