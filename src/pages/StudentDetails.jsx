import { useParams } from "react-router-dom";
import HeroSection from "../components/studentsDetails/HeroSection";
import ProgressRing from "../components/studentsDetails/ProgressRing";
import Table from "../components/ui/Table";
import Pagination from "../pagination/Pagination";
import {  useContext, useState } from "react";
import AnimatedMulti from "../components/ui/Select";
import { projectStatusOptions } from "../constants/statusOptions";
import StudentCourseCard from "../components/studentsDetails/StudentCourseCard";
import ProjectCard from "../components/studentsDetails/ProjectCard";
import StudentDetailsSkeleton from "../components/skeleton/StudentDetailsSkeleton";
import TableSkeleton from "../components/skeleton/TableSkeleton";
import { statusClasses } from "../constants/statusClasses";
import useSkeleton from "../hooks/useSkeleton";
import { StudentsContext } from "../context/StudentsContext";

function StudentDetails() {
  // loading selekton
  const {isLoading} = useSkeleton()
  // access to student
  const {storedStudents} = useContext(StudentsContext)
  const { id } = useParams();
  const student = storedStudents.find((item) => item.id === Number(id));

  // selector
  const [courseStatus, setCourseStatus] = useState([]);
  const [projectStatus, setProjectStatus] = useState([]);

  const filteredProjects =
    projectStatus.length > 0
      ? student.projects.filter((project) =>
          projectStatus.some(
            (status) =>
              status.value.toLowerCase() === project.status.toLowerCase(),
          ),
        )
      : student.projects;
  const filteredCourses =
    courseStatus.length > 0
      ? student.courses.filter((course) =>
          courseStatus.some(
            (status) =>
              status.value.toLowerCase() === course.status.toLowerCase(),
          ),
        )
      : student.courses;
  // pagination for course
  const coursePerPage = 4;
  const totalCousres = filteredCourses.length;
  const [currentCoursePage, setCurrentCoursePage] = useState(1);
  const lastIndexOfCourse = currentCoursePage * coursePerPage;
  const firstIndexOfCourse = lastIndexOfCourse - coursePerPage;
  const coursesInPages = filteredCourses.slice(
    firstIndexOfCourse,
    lastIndexOfCourse,
  );
  // pagination for project
  const projectPerPage = 4;
  const totalProjects = filteredProjects.length;
  const [currentProjectPage, setCurrentProjectPage] = useState(1);
  const lastIndexOfProject = currentProjectPage * projectPerPage;
  const firstIndexOfProject = lastIndexOfProject - projectPerPage;
  const projectsInPages = filteredProjects.slice(
    firstIndexOfProject,
    lastIndexOfProject,
  );

  // calculating performance-ring details
  const gpaRate = student.gpa * 5;
  const projectRate =
    student.projects.length == 0
      ? 0
      : (student.projects.filter((project) => project.status === "Completed")
          .length /
          student.projects.length) *
        100;
  const performance =
    student.gpa === null
      ? null
      : Math.round((student.attendanceRate + gpaRate + projectRate) / 3);
  const completedCourses = student.courses.filter(
    (course) => course.status === "Completed",
  );
  const courseCompletion =
    student.courses.length === 0
      ? null
      : ((completedCourses.length / student.courses.length) * 100).toFixed(0);
  // building columns for course table

  const courseCols = [
    { name: "Course", key: "name" },
    { name: "Instructor", key: "instructor" },
    { name: "Credits", key: "credits" },
    { name: "Progress", key: "progress" },
    {
      name: "Status",
      key: "status",
      render(course) {
        return (
          <td key={this.key} className="flex p-3">
            <div
              className={`rounded-xl px-3 py-1 font-semibold ${statusClasses[course.status]}`}
            >
              {course.status}
            </div>
          </td>
        );
      },
    },
  ];

  //building columns for projects table
  const projectCols = [
    { name: "Project", key: "name" },
    { name: "Date", key: "dueDate" },
    { name: "Score", key: "score" },
    {
      name: "Status",
      key: "status",
      render(project) {
        return (
          <td key={this.key} className="flex p-3">
            <div
              className={`rounded-xl px-3 py-1 font-semibold ${statusClasses[project.status]}`}
            >
              {project.status}
            </div>
          </td>
        );
      },
    },
  ];
  return (
    <div className="z-10 w-full px-3 pt-3">
      <HeroSection student={student} />
      <div className="grid flex-1 grid-cols-3 gap-1 lg:hidden">
        <ProgressRing
          title={"Graduation Progress"}
          rate={student.progress === null ? null : student.progress}
          percentage={student.progress === null ? null : student.progress}
        />
        <ProgressRing
          title={"Performance Score"}
          rate={performance}
          percentage={performance}
        />
        <ProgressRing
          title={"Course Completion"}
          rate={courseCompletion}
          percentage={courseCompletion}
        />
      </div>
      <div className="flex items-start">
        <div className="flex-4 lg:mr-2">
          <div className="my-2 space-y-2 rounded-xl bg-slate-50 p-3 dark:bg-slate-800 dark:text-gray-200">
            <div className="mb-3 flex items-center justify-between px-2">
              <h1 className="text-lg font-bold dark:text-gray-200">Courses</h1>
              <AnimatedMulti
                placeholder={"Status"}
                options={projectStatusOptions}
                state={courseStatus}
                setState={(option) => {
                  setCourseStatus(option);
                  setCurrentCoursePage(1);
                }}
              />
            </div>
            {!isLoading && (
              <Table
                title={"courses"}
                list={coursesInPages}
                cols={courseCols}
              />
            )}
            {isLoading && <TableSkeleton totalCols={coursesInPages.length} />}
            {!isLoading && (
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:hidden">
                {coursesInPages.map((course, index) => (
                  <StudentCourseCard course={course} key={index} />
                ))}
              </div>
            )}
            {isLoading && (
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:hidden">
                {coursesInPages.map(() => (
                  <StudentDetailsSkeleton />
                ))}
              </div>
            )}

            <Pagination
              itemPerPage={coursePerPage}
              totalItems={totalCousres}
              itemName={"courses"}
              currentPage={currentCoursePage}
              setCurrentPage={setCurrentCoursePage}
            />
          </div>

          <div className="my-2 space-y-2 rounded-xl bg-slate-50 p-3 dark:bg-slate-800 dark:text-gray-200">
            <div className="mb-3 flex items-center justify-between px-2">
              <h1 className="text-lg font-bold dark:text-gray-200">Projects</h1>
              <AnimatedMulti
                placeholder={"Status"}
                options={projectStatusOptions}
                state={projectStatus}
                setState={(option) => {
                  setProjectStatus(option);
                  setCurrentProjectPage(1);
                }}
              />
            </div>
            {!isLoading && (
              <Table
                title={"projects"}
                list={projectsInPages}
                cols={projectCols}
              />
            )}
            {isLoading && <TableSkeleton totalCols={projectsInPages.length} />}
            {!isLoading && (
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:hidden">
                {projectsInPages.map((project, index) => (
                  <ProjectCard key={index} project={project} />
                ))}
              </div>
            )}
            {isLoading && (
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:hidden">
                {projectsInPages.map(() => (
                  <StudentDetailsSkeleton />
                ))}
              </div>
            )}
            <Pagination
              itemPerPage={projectPerPage}
              totalItems={totalProjects}
              itemName={"projects"}
              currentPage={currentProjectPage}
              setCurrentPage={setCurrentProjectPage}
            />
          </div>
        </div>
        <div className="hidden flex-1 lg:block">
          <ProgressRing
            title={"Graduation Progress"}
            rate={student.progress === null ? null : student.progress}
            percentage={student.progress === null ? null : student.progress}
          />
          <ProgressRing
            title={"Performance Score"}
            rate={performance}
            percentage={performance}
          />
          <ProgressRing
            title={"Course Completion"}
            rate={courseCompletion}
            percentage={courseCompletion}
          />
        </div>
      </div>
    </div>
  );
}

export default StudentDetails;
