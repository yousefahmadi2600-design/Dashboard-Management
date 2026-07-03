import { Eye, FolderCheck, FolderClock, FoldersIcon } from "lucide-react";
import StudentKpiCard from "./StudentKpiCard";
import scoreIcon from "../../data/score-svgrepo-com.svg";
import StudentCardSkeleton from "../skeleton/StudentCardSkeleton";
import { useEffect, useState } from "react";
import HeroSectionSkelecton from "../skeleton/HeroSectionSkelecton";
function HeroSection({ student }) {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
      return clearTimeout(timeout);
    }, 500);
  }, []);
  return (
    <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800 dark:text-gray-200">
      {isLoading && <HeroSectionSkelecton />}
      {!isLoading && (
        <div>
          <div className="">
            <h1 className="pb-2 font-bold md:pb-4 md:text-lg lg:text-2xl">
              Student Details
            </h1>
          </div>
          <div className="flex">
            <div className="">
              {student.image === null ? (
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cyan-600">
                  {student.name
                    .split(" ")
                    .map((item) => item[0])
                    .join("")}
                </div>
              ) : (
                <img
                  src={student.image}
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-cyan-600"
                />
              )}
            </div>
            <div className="mt-3 ml-6">
              <h2 className="font-semibold lg:text-xl">{student.name}</h2>
              <div className="mt-2.5 hidden grid-cols-4 gap-3 lg:grid lg:text-lg">
                <div className="">
                  <p className="text-gray-500 dark:text-gray-400">ID</p>
                  <p>{student.studentId}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Major</p>
                  <p>{student.major}</p>
                </div>

                <div>
                  <p className="ml-3 text-gray-500 dark:text-gray-400">
                    Status
                  </p>
                  <p className="ml-3">{student.status}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Email</p>
                  <p>{student.email}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-1 grid grid-cols-2 gap-1 p-1 text-sm md:text-base lg:hidden">
            <div className="">
              <p className="text-gray-500 dark:text-gray-400">ID</p>
              <p>{student.studentId}</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">Major</p>
              <p>{student.major}</p>
            </div>

            <div>
              <p className="text-gray-500 dark:text-gray-400">Status</p>
              <p>{student.status}</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">Email</p>
              <p>{student.email}</p>
            </div>
          </div>
        </div>
      )}

      {!isLoading && (
        <div className="mt-2 grid grid-cols-2 gap-0.5 md:mt-0 md:grid-cols-3 md:gap-3 lg:gap-2 lg:my-2 lg:grid-cols-5">
          <StudentKpiCard
            titel={student.gpa === null ? "N/A" : student.gpa}
            description={student.gpa === null ? "No data yet" : "GPA"}
            icon={<img src={scoreIcon} className="h-8 w-8" />}
            bg={"bg-green-300"}
          />
          <StudentKpiCard
            titel={student.projects.length}
            description={"Total projects"}
            bg={"bg-yellow-300"}
            icon={<FoldersIcon color="black" />}
          />
          <StudentKpiCard
            titel={
              student.projects.filter(
                (project) => project.status === "Completed",
              ).length
            }
            description={"Completed projects"}
            bg={"bg-orange-300"}
            icon={<FolderCheck color="black" />}
          />
          <StudentKpiCard
            titel={
              student.courses.filter(
                (course) => course.status === "In Progress",
              ).length
            }
            description={"Enrolled courses"}
            bg={"bg-pink-300"}
            icon={<FolderClock color="black" />}
          />
          <StudentKpiCard
            titel={
              student.attendanceRate === null ? "N/A" : student.attendanceRate
            }
            description={
              student.attendanceRate === null
                ? "No data yet"
                : "Attendance rate"
            }
            bg={"bg-sky-300"}
            icon={<Eye color="black" />}
          />
        </div>
      )}
      {isLoading && (
        <div className="grid grid-cols-2 gap-1 md:grid-cols-3 md:gap-3 lg:my-2 lg:grid-cols-5">
          <StudentCardSkeleton />
          <StudentCardSkeleton />
          <StudentCardSkeleton />
          <StudentCardSkeleton />
          <StudentCardSkeleton />
        </div>
      )}
    </div>
  );
}

export default HeroSection;
