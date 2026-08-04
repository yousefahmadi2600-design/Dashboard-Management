import { Trash2, UserPen } from "lucide-react";
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
      <div className="relative w-full">
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
      <h3 className="p-2 pb-0">{student.name}</h3>
      <div className="p-2 pt-0">
        <p className="text-sm font-light text-gray-700 sm:text-base dark:text-gray-300">
          {student.major}
        </p>
        {allDetails && (
          <>
            <p className="flex items-center text-sm font-light text-gray-800 sm:text-base dark:text-gray-300">
              Attendance:&nbsp;
              <span className="font-medium">{student.attendanceRate}%</span>
            </p>
            <p className="flex items-center text-sm font-light text-gray-800 sm:text-base dark:text-gray-300">
              GPA:&nbsp;<span className="font-medium">{student.gpa}</span>
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
