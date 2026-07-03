function Table({ list, cols, onStudentClick, title }) {
  return (
    <>
      <table className="lg:min-w-max lg:text-base hidden w-full overflow-hidden rounded-xl text-sm md:table lg:rounded-2xl">
        <thead className="bg-slate-600 text-left text-gray-100 dark:bg-slate-800 dark:text-gray-300">
          <tr>
            {cols.map((col, index) => (
              <th key={index} className="px-2 py-1 lg:p-2 lg:px-3">
                {col.name}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="border border-slate-300 bg-violet-400 dark:border-slate-700 dark:bg-violet-500">
          {list.length === 0 ? (
            <td
              className="py-3 text-center text-lg lg:py-8 lg:text-2xl text-white"
              colSpan={10}
            >
              No {title} found
            </td>
          ) : (
            list.map((item, index) => (
              <tr
                className="bg-slate-200 even:bg-slate-300 hover:bg-slate-500 dark:bg-slate-600 dark:even:bg-slate-700 dark:hover:bg-slate-800"
                key={index}
                onClick={() => {
                  onStudentClick?.(item);
                }}
              >
                {cols.map((col) =>
                  col.key === "avatar" ? (
                    col.render(item)
                  ) : col.key === "status" ? (
                    col.render(item)
                  ) : col.key === "major" ? (
                    col.render(item)
                  ) : col.key == "attendanceRate" ? (
                    col.render(item)
                  ) : col.key == "actions" ? (
                    col.render(item)
                  ) : (
                    <td key={col.key} className="p-1 lg:p-3">
                      {item[col.key]}
                    </td>
                  ),
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
}

export default Table;
