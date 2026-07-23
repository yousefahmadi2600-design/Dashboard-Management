import { Eye, Trash2, UserPen } from "lucide-react";
import { statusClasses } from "../../constants/statusClasses";
function StudentCard({
  student,
  onStudentClick,
  setEditingStudent,
  setIsEditOpen,
  onDeleteClick,
  allDetails,
}) {
  return (
    <div
      onClick={() => onStudentClick(student)}
      className="grid grid-rows-[auto_1fr_auto_auto] rounded-xl bg-slate-50 p-1 shadow-sm shadow-slate-300 dark:bg-slate-900 dark:text-white dark:shadow-slate-900"
    >
      <div className="relative justify-start">
        <img
          src={student.image}
          className="h-40 w-full overflow-hidden rounded-xl object-fill"
        />
        <div
          className={`${statusClasses[student.status]} absolute top-0 right-1 mt-1 rounded-2xl px-1 text-sm`}
        >
          {student.status}
        </div>
      </div>
      <div className="p-2 pb-0 text-lg font-semibold">{student.name} </div>
      <div className="p-2 pt-0">
        <p className="text-sm text-gray-800 sm:text-base dark:text-gray-300">
          {student.major}
        </p>
        {allDetails && (
          <>
            <p className="flex items-center text-sm text-gray-800 sm:text-base dark:text-gray-300">
              <Eye className="size-5 stroke-gray-500" /> &nbsp;Attendance :{" "}
              <span className="font-semibold">{student.attendanceRate}%</span>
            </p>
            <p className="flex items-center text-sm text-gray-800 sm:text-base dark:text-gray-300">
              <span className="ml-px flex h-4.5 w-4.5 items-center justify-center rounded-full border-2 border-gray-500 text-[9px] font-semibold text-gray-500">
                &nbsp;A+
              </span>
              &nbsp; GPA : <span className="font-semibold">{student.gpa}</span>
            </p>
          </>
        )}
      </div>
      {allDetails && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="mx-2 flex h-9 gap-1 border-t border-gray-400"
        >
          <i
            onClick={() => {
              onDeleteClick(student);
            }}
            className="my-2 flex h-6 flex-1 items-center justify-center rounded-2xl border border-red-700 bg-red-400 sm:h-6"
          >
            <Trash2 className="size-4 rounded-full stroke-white sm:size-5" />
          </i>
          <i
            onClick={() => {
              setEditingStudent(student);
              setIsEditOpen(true);
            }}
            className="my-2 flex h-6 flex-1 items-center justify-center rounded-2xl border border-yellow-600 bg-yellow-400 sm:h-6"
          >
            <UserPen className="size-4 rounded-full stroke-white sm:size-5" />
          </i>
        </div>
      )}
    </div>
  );
}

export default StudentCard;
