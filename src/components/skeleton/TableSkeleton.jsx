function TableSkeleton({ totalCols }) {
  return (
    <table className="hidden w-full overflow-hidden rounded-md md:table">
      <tbody className="w-full overflow-hidden rounded-md">
        {Array.from({ length: 3 }).map((_, index) => {
          return (
            <tr
              key={index}
              className="bg-gray-400 even:bg-slate-300 hover:bg-slate-800 dark:bg-gray-700"
            >
              {Array.from({ length: totalCols }).map((_, index) => (
                <td key={index} className="p-4">
                  <div className="h-6 w-full animate-pulse rounded bg-gray-500 dark:bg-gray-400"></div>
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default TableSkeleton;
