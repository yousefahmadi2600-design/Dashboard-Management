import DashboardKpiCard from "../components/dashboard/DashboardKpiCard";
import { useContext, useEffect, useState } from "react";
import AnimatedMulti from "../components/ui/Select";
import Pagination from "../pagination/Pagination";
import { useNavigate } from "react-router-dom";
import Table from "../components/ui/Table";
import TableSkeleton from "../components/skeleton/TableSkeleton";
import { statusClasses } from "../constants/statusClasses";
import { majorClasses } from "../constants/majorClasses";
import { majorOptions } from "../constants/majorOptions";
import useSearch from "../hooks/useSearch";
import {
  AlertCircle,
  FileChartColumn,
  GraduationCap,
  Search,
  Zap,
} from "lucide-react";
import DashboardCardSkeleton from "../components/skeleton/DashboardCardSkeleton";
import StudentCard from "../components/ui/StudentCard";
import StudentListCardSkeleton from "../components/skeleton/StudentListCardSkeleton";
import Input from "../components/ui/Input";
import usePagination from "../hooks/usePagination";
import { StudentsContext } from "../context/StudentsContext";
function Dashboard() {
  // loading skeleton
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
      return clearTimeout(timeout);
    }, 500);
  }, []);

  // get student from localstorage
  const { storedStudents } = useContext(StudentsContext);
  const newStudents = storedStudents.filter((student) => student.id < 20);
  // search
  const [searchValue, setSearchValue] = useState("");

  // selector's state
  const [major, setMajor] = useState([]);

  // navigate
  const navigate = useNavigate();
  // filter
  const filteredStudents = useSearch(newStudents, {
    searchValue: searchValue,
    majorList: major,
  });
  //pagination
  const studentPerPage = 6;
  const {
    currentPage,
    setCurrentPage,
    itemInPage: studentsInPages,
    totalItems: totalStudents,
  } = usePagination(studentPerPage, filteredStudents);

  // calculate cards numbers

  const totalStudent = storedStudents.length;
  const activeStudents = storedStudents.filter(
    (student) => student.status === "Active",
  ).length;
  const atRiskStudents = storedStudents.filter(
    (student) => student.gpa < 12,
  ).length;
  const gpaList = storedStudents.map((student) => student.gpa);
  const AverageGpa = (
    gpaList.reduce((p, c) => p + c, 0) / totalStudent
  ).toFixed(2);
  const recentStudentCols = [
    { name: "Name", key: "name" },
    { name: "ID", key: "studentId" },
    {
      name: "Major",
      key: "major",
      render(recentStudent) {
        return (
          <td key={this.key} className="flex p-3">
            <div
              className={`rounded-lg p-1 py-1 font-semibold lg:rounded-xl lg:px-3 ${majorClasses[recentStudent.major]}`}
            >
              {recentStudent.major}
            </div>
          </td>
        );
      },
    },
    { name: "GPA", key: "gpa" },
    {
      name: "Status",
      key: "status",
      render(recentStudent) {
        return (
          <td className="p- flex lg:p-3" key={this.key}>
            <div
              className={`rounded-lg p-1 py-1 font-semibold lg:rounded-xl lg:px-3 ${statusClasses[recentStudent.status]}`}
            >
              {recentStudent.status}
            </div>
          </td>
        );
      },
    },
  ];

  // card descriptions
  const totalStudentsDesc = {
    num: `+${newStudents.length}`,
    text: "new students",
    className: "text-green-600",
  };
  const activeStudentsDesc = {
    num: `${((activeStudents / storedStudents.length) * 100).toFixed(0)}%`,
    text: "are active students",
    className: "text-green-600",
  };
  const atRiskStudentsDesc = {
    num: `${((atRiskStudents / totalStudent) * 100).toFixed(0)}%`,
    text: "have GPA below 12",
    className: "text-red-500",
  };
  const AverageGpaDesc = {
    num: 15.11,
    text: "last semester GPA",
    className: "text-amber-500",
  };
  return (
    <div className="z-10 px-4 sm:px-3 lg:pb-7">
      <div className="">
        <h1 className="px-2 py-2 text-xl font-bold sm:text-xl lg:py-6 dark:text-gray-200">
          Summery
        </h1>
      </div>
      {!isLoading && (
        <div className="grid grid-cols-2 gap-1 md:grid-cols-2 lg:grid-cols-4 lg:gap-2">
          <DashboardKpiCard
            icon={
              <GraduationCap className="size-6 h-12 stroke-black sm:size-8 lg:size-10 dark:stroke-white" />
            }
            detail={totalStudent}
            titele={"Total Students"}
            description={totalStudentsDesc}
          />
          <DashboardKpiCard
            icon={
              <Zap className="size-6 h-12 stroke-black sm:size-8 lg:size-10 dark:stroke-white" />
            }
            detail={activeStudents}
            titele={"Active Students"}
            description={activeStudentsDesc}
          />
          <DashboardKpiCard
            icon={
              <AlertCircle className="size-6 h-12 stroke-black sm:size-8 lg:size-10 dark:stroke-white" />
            }
            detail={atRiskStudents}
            titele={"At Risk Students"}
            description={atRiskStudentsDesc}
          />
          <DashboardKpiCard
            icon={
              <FileChartColumn className="size-6 h-12 stroke-black sm:size-8 lg:size-10 dark:stroke-white" />
            }
            detail={AverageGpa}
            titele={"Average GPA"}
            description={AverageGpaDesc}
          />
        </div>
      )}
      {isLoading && (
        <div className="grid grid-cols-2 gap-1 lg:grid-cols-4 lg:gap-4">
          <DashboardCardSkeleton />
          <DashboardCardSkeleton />
          <DashboardCardSkeleton />
          <DashboardCardSkeleton />
        </div>
      )}
      <div className="mt-1 hidden h-full w-full rounded-lg bg-linear-to-b from-black via-zinc-500 to-transparent p-0.5 shadow-md shadow-black md:block lg:mt-4 lg:rounded-2xl lg:p-1">
        <div className="rounded-lg bg-slate-50 p-2 lg:rounded-2xl lg:p-3 dark:bg-slate-900 dark:text-slate-200">
          <div className="mb-4 items-center justify-between lg:flex">
            <div>
              <h1 className="text-lg font-bold lg:px-2 lg:text-2xl">
                Recent students
              </h1>
            </div>
            <div className="flex gap-2 py-1 lg:gap-3 dark:text-gray-200">
              <div className="relative flex-1 lg:min-w-70">
                <input
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                    setCurrentPage(1);
                  }}
                  type="text"
                  placeholder="Search students by name or ID"
                  className="h-7 w-full min-w-11/12 rounded-lg border border-gray-300 bg-slate-100 pl-7 text-sm shadow-sm shadow-slate-300 outline-none placeholder:text-slate-400 sm:min-w-40 md:h-9 md:pl-10 lg:w-full lg:py-2 lg:pr-3 lg:pl-10 lg:text-base dark:border dark:border-slate-900 dark:bg-slate-800 dark:text-slate-100 dark:shadow-slate-900 dark:placeholder:text-slate-500"
                />
                <Search className="absolute top-1 left-2 size-6 stroke-slate-500 md:size-7" />
              </div>
              <AnimatedMulti
                placeholder={"Major"}
                options={majorOptions}
                state={major}
                setState={(option) => {
                  setMajor(option);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>
          <div className="space-y-2">
            {!isLoading && (
              <Table
                list={studentsInPages}
                onStudentClick={(student) => {
                  navigate(`/student/${student.id}`);
                }}
                cols={recentStudentCols}
                title={"students"}
              />
            )}
            {isLoading && <TableSkeleton totalCols={studentsInPages.length} />}
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              itemPerPage={studentPerPage}
              totalItems={totalStudents}
              itemName={"students"}
            />
          </div>
        </div>
      </div>
      <div className="mb-3 rounded-lg md:hidden lg:rounded-2xl lg:p-3 dark:text-slate-200">
        <div className="mb-2">
          <h1 className="ml-2 py-2 text-lg font-bold sm:text-xl lg:px-2 lg:text-2xl">
            Recent students
          </h1>

          <div className="flex flex-row-reverse flex-wrap justify-end gap-2 lg:gap-3 dark:text-gray-200">
            <Input
              placeholder={"Search students by name or ID"}
              onChange={(e) => {
                setSearchValue(e.target.value);
                setCurrentPage(1);
              }}
              className={"min-w-9/12 sm:min-w-full"}
            />

            <AnimatedMulti
              placeholder={"Major"}
              options={majorOptions}
              state={major}
              setState={(option) => {
                setMajor(option);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
        {!isLoading && (
          <div className="mb-2 grid grid-cols-2 gap-1">
            {studentsInPages.map((student, index) => (
              <StudentCard
                student={student}
                key={index}
                onStudentClick={(student) => {
                  navigate(`/student/${student.id}`);
                }}
              />
            ))}
          </div>
        )}
        {isLoading && (
          <div className="grid grid-cols-2 gap-1">
            {studentsInPages.map((_, index) => (
              <StudentListCardSkeleton key={index} />
            ))}
          </div>
        )}

        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemPerPage={studentPerPage}
          totalItems={totalStudents}
          itemName={"students"}
        />
      </div>
    </div>
  );
}

export default Dashboard;
