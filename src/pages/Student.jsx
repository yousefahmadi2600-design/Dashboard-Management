import { useNavigate } from "react-router-dom";
import TableSkeleton from "../components/skeleton/TableSkeleton";
import Table from "../components/ui/Table";
import Pagination from "../pagination/Pagination";
import { useContext, useEffect, useState } from "react";
import AnimatedMulti from "../components/ui/Select";
import CustomSelect from "../components/ui/customSelect";
import { toast } from "sonner";
import { statusClasses } from "../constants/statusClasses";
import { majorClasses } from "../constants/majorClasses";
import { majorOptions } from "../constants/majorOptions";
import { studentStatusOptions } from "../constants/studentStatusOptions";
import { sortOptions } from "../constants/sortOptions";
import { Plus, Trash2, UserPen } from "lucide-react";
import AddForm from "../components/students/AddForm";
import EditForm from "../components/students/EditForm";
import StudentCard from "../components/ui/StudentCard";
import StudentListCardSkeleton from "../components/skeleton/StudentListCardSkeleton";
import Input from "../components/ui/Input";
import useSkeleton from "../hooks/useSkeleton";
import useSearch from "../hooks/useSearch";
import usePagination from "../hooks/usePagination";
import useStudentActions from "../hooks/useStudentActions";
import { StudentsContext } from "../context/StudentsContext";

function Students() {
  const { storedStudents, setStoredStudents } = useContext(StudentsContext)
  const navigate = useNavigate();
  // skeleton
  const isLoading = useSkeleton();
  // selecters
  const [status, setStatus] = useState([]);
  const [major, setMajor] = useState([]);
  // filtering
  const [searchValue, setSearchValue] = useState("");
  const filteredList = useSearch(storedStudents, {
    searchValue: searchValue,
    majorList: major,
    statusList: status,
  });
  const [sortState, setSortState] = useState();
  const sortedFilterdList = [...filteredList].sort((a, b) => {
    if (sortState?.name === "name") {
      return sortState?.value === "atoz"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
    if (sortState?.name === "GPA") {
      return sortState?.value === "lowestGpa" ? a.gpa - b.gpa : b.gpa - a.gpa;
    }
    if (sortState?.name === "attendance") {
      return sortState?.value === "lowestAttendance"
        ? a.attendanceRate - b.attendanceRate
        : b.attendanceRate - a.attendanceRate;
    }
    return 0;
  });
  // pagination
  const [studentPerPage, setStudentPerPage] = useState(() => {
    const num = localStorage.getItem("num");
    if (num) {
      return JSON.parse(num);
    }
    localStorage.setItem("num", 8);
    return 8;
  });
  const {
    currentPage,
    setCurrentPage,
    itemInPage: studentsInPage,
  } = usePagination(studentPerPage, sortedFilterdList);
  useEffect(() => setCurrentPage(1), [major, status, sortState]);
  useEffect(() => {
    localStorage.setItem("num", studentPerPage);
  }, [studentPerPage]);
  // building colunms for list of student table
  const colunms = [
    {
      name: "Avatar",
      key: "avatar",
      render(student) {
        return student.image === null ? (
          <td key={this.key}>
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-cyan-600">
              {student.name
                .split(" ")
                .map((part) => part[0])
                .join("")}
            </div>
          </td>
        ) : (
          <td key={this.key}>
            <img
              src={student.image}
              className="mx-auto h-10 w-10 rounded-full"
            />
          </td>
        );
      },
    },
    { name: "Name", key: "name" },
    {
      name: "Status",
      key: "status",
      render(student) {
        return (
          <td className="flex p-3" key={this.key}>
            <div
              className={`rounded-xl px-3 py-1 font-semibold ${statusClasses[student.status]}`}
            >
              {student.status}
            </div>
          </td>
        );
      },
    },
    { name: "ID", key: "studentId" },
    {
      name: "Major",
      key: "major",
      render(student) {
        return (
          <td className="flex p-3" key={this.key}>
            <div
              className={`rounded-xl px-3 py-1 font-semibold ${majorClasses[student.major]}`}
            >
              {student.major}
            </div>
          </td>
        );
      },
    },
    { name: "Gpa", key: "gpa" },
    { name: "Email", key: "email" },
    {
      name: "Attendance rate",
      key: "attendanceRate",
      render(student) {
        return (
          <td key={this.key} className="p-3 text-center">
            {student.attendanceRate}
          </td>
        );
      },
    },
    {
      name: "Actions",
      key: "actions",
      render(student) {
        return (
          <td key={this.key}>
            <div
              className="flex justify-center gap-2 hover:cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Trash2
                className="dark:stroke-white"
                onClick={() => onDeleteClick(student)}
              />
              <UserPen
                className="dark:stroke-white"
                onClick={() => {
                  setEditingStudent(student);
                  setIsEditOpen(true);
                }}
              />
            </div>
          </td>
        );
      },
    },
  ];
  // access to student for edit & delete & add
  const [editingStudent, setEditingStudent] = useState(null);
  const [IsAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  // determining student per page by User
  function setInputValue(e) {
    setStudentPerPage(e.target.value);
    e.target.value = "";
  }
  const onDeleteClick = (student) => {
    setStoredStudents(storedStudents.filter((item) => item.id !== student.id));
    toast.success("Student deleted successfully");
  };
  const { onEditClick, onAddClick } = useStudentActions(
    editingStudent,
    setStoredStudents,
    setIsEditOpen,
    setIsAddOpen,
    storedStudents,
  );

  const onStudentClick = (student) => {
    navigate(`/student/${student.id}`);

  };
  const handleAddCancel = () => {
    setIsAddOpen(false);
  };
  const handleEditCancel = () => {
    setIsEditOpen(false);
  };
  return (
    <div className="px-4 dark:text-white">
      <div className="items-center lg:flex lg:py-5">
        <div className="flex h-8 gap-2 py-2">
          <Input
            placeholder={"Search students by name or ID"}
            className={"lg:hidden"}
            onChange={(e) => {
              setSearchValue(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-2 sm:mt-6 lg:mt-0">
          <AnimatedMulti
            placeholder={"Major"}
            options={majorOptions}
            state={major}
            setState={setMajor}
          />
          <AnimatedMulti
            placeholder={"Status"}
            options={studentStatusOptions}
            state={status}
            setState={setStatus}
          />
          <CustomSelect
            options={sortOptions}
            state={sortState}
            setState={setSortState}
          />
        </div>
        <div className="ml-auto hidden items-center gap-3 lg:flex dark:text-gray-200">
          <Input
            className={"hidden min-w-30 pr-2 lg:block"}
            onChange={(e) => {
              setSearchValue(e.target.value);
              setCurrentPage(1);
            }}
            placeholder={"Search students by name or ID"}
          />
          <button
            onClick={() => setIsAddOpen(true)}
            className="flex h-9 items-center gap-2 rounded-lg bg-violet-500 pr-3 pl-2 text-gray-200 dark:bg-violet-600"
          >
            <Plus />
            Add student
          </button>
        </div>
      </div>
      {!isLoading && (
        <div className="hidden overflow-x-auto lg:block">
          <Table
            title={"students"}
            list={studentsInPage}
            cols={colunms}
            onStudentClick={onStudentClick}
          />
        </div>
      )}
      {isLoading && (
        <div className="hidden lg:block">
          <TableSkeleton totalCols={colunms.length} />
        </div>
      )}
      {!isLoading && (
        <div className="mt-3 grid grid-cols-2 gap-1 sm:mt-2 md:grid-cols-3 lg:hidden">
          {studentsInPage.map((student, index) => (
            <StudentCard
              key={index}
              student={student}
              onEditClick={onEditClick}
              onDeleteClick={onDeleteClick}
              setIsEditOpen={setIsEditOpen}
              setEditingStudent={setEditingStudent}
              onStudentClick={onStudentClick}
              allDetails={true}
            />
          ))}
        </div>
      )}
      {isLoading && (
        <div className="mt-3 grid grid-cols-2 gap-1 md:grid-cols-3 lg:hidden">
          {studentsInPage.map((_, index) => (
            <StudentListCardSkeleton key={index} />
          ))}
        </div>
      )}
      <div className="mt-3 px-1 pb-2 text-[12px] sm:px-2 sm:pb-4 sm:text-sm xl:text-sm">
        <div className="">
          <Pagination
            itemPerPage={studentPerPage}
            totalItems={filteredList.length}
            itemName={"list of students"}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <div className="flex h-8 items-center justify-center gap-1 text-gray-600 sm:justify-start sm:gap-2 lg:mx-3 dark:text-gray-400">
          Showing students per page &nbsp;{" "}
          <input
            placeholder={studentPerPage}
            type="text"
            className="w-16 rounded-md bg-violet-400 px-2 outline-none placeholder:text-gray-800"
            onKeyDown={(e) => e.key === "Enter" && setInputValue(e)}
          />
        </div>
      </div>
      {IsAddOpen && (
        <div
          onClick={() => setIsAddOpen(false)}
          className="fixed inset-0 left-0 z-40 bg-black/40 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="fixed top-15 left-1/2 z-50 flex w-70 -translate-x-1/2 items-center justify-center rounded-2xl bg-slate-200 px-3 py-4 text-black sm:w-100 lg:top-20 lg:w-130 lg:px-10 lg:py-5 dark:bg-slate-900 dark:text-gray-200"
          >
            <div className="h-full w-full">
              <AddForm
                onFormClick={onAddClick}
                handleCancel={handleAddCancel}
              />
            </div>
          </div>
        </div>
      )}
      {isEditOpen && (
        <div
          className="fixed inset-0 left-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsEditOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="fixed top-15 left-1/2 z-50 flex w-70 -translate-x-1/2 items-center justify-center rounded-2xl bg-slate-200 px-3 py-4 text-black sm:w-100 sm:pb-6 lg:top-20 lg:w-130 lg:px-10 lg:py-5 dark:bg-slate-900 dark:text-gray-200"
          >
            <div className="h-full w-full">
              <EditForm
                onFormClick={onEditClick}
                handleCancel={handleEditCancel}
                editingStudent={editingStudent}
              />
            </div>
          </div>
        </div>
      )}
      {/* add student btn for mobile */}
      <div className="fixed right-2 bottom-16 z-30 sm:right-4 sm:bottom-5 lg:hidden">
        <button
          onClick={() => setIsAddOpen(true)}
          className="text[12px] flex h-8 items-center rounded-lg bg-violet-500 pr-2 pl-1 text-gray-200 sm:h-9 sm:text-base dark:bg-violet-600"
        >
          <Plus className="size-6" />
          Add student
        </button>
      </div>
    </div>
  );
}

export default Students;
