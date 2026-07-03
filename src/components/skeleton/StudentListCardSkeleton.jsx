function StudentListCardSkeleton() {
  return (
    <div className="animate-pulse space-y-2 rounded-lg border border-gray-400 p-1">
      <div className="h-30 w-full rounded-lg bg-gray-400 dark:bg-gray-700"></div>
      <div className="h-5 w-30 rounded-lg bg-gray-400 dark:bg-gray-700"></div>
      <div className="h-5 w-30 rounded-lg bg-gray-400 dark:bg-gray-700"></div>
      <div className="h-5 w-full rounded-lg bg-gray-400 dark:bg-gray-700"></div>
    </div>
  );
}

export default StudentListCardSkeleton;
