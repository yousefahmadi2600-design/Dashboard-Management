import { courses } from "../data/courses";
import CourseCard from "../components/courses/courseCard";
import Pagination from "../pagination/Pagination";
import { useEffect, useState } from "react";
import CourseCardSkeleton from "../components/skeleton/CourseCardSkeleton";
import AnimatedMulti from "../components/ui/Select";
import Input from "../components/ui/Input";
import { majorOptions } from "../constants/majorOptions";
import { statusOptions } from "../constants/statusOptions";
import useSearch from "../hooks/useSearch";
import usePagination from "../hooks/usePagination";

function Courses() {
  //selectors
  const [categoryState, setCategoryState] = useState([]);
  const [courseStatusState, setCourseStatusState] = useState([]);
  // search
  const [searchValue, setSearchValue] = useState("");
  //filtering
  const filteredCourseList = useSearch(courses, {
    searchValue,
    majorList: categoryState,
    statusList: courseStatusState,
  });
  // skeleton
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
      return clearTimeout(timeout);
    }, 500);
  }, []);
  // Pagination
  const coursePerPage = 12;
  const {
    currentPage,
    setCurrentPage,
    itemInPage: courseInPage,
    totalItems: totalCourses,
  } = usePagination(coursePerPage, filteredCourseList);
  
  return (
    <div className="px-3">
      <div className="items-center pt-2 lg:mr-6 lg:ml-3 lg:flex lg:gap-2 lg:py-3">
        <Input
          placeholder={"Search courses ..."}
          onChange={(e) => {
            setSearchValue(e.target.value);
            setCurrentPage(1);
          }}
          className={"ml-auto lg:hidden lg:h-7 lg:w-70"}
        />

        <div className="flex flex-wrap gap-2 py-2">
          <AnimatedMulti
            placeholder={"Category"}
            options={majorOptions}
            state={categoryState}
            setState={setCategoryState}
          />
          <AnimatedMulti
            placeholder={"Status"}
            options={statusOptions}
            state={courseStatusState}
            setState={setCourseStatusState}
          />
        </div>

        <Input
          placeholder={"Search courses ..."}
          onChange={(e) => {
            setSearchValue(e.target.value);
            setCurrentPage(1);
          }}
          className={"ml-auto hidden h-7 lg:block lg:h-9 lg:max-w-80"}
        />
      </div>
      <div className="">
        {!isLoading && (
          <div className="mb-3 grid h-full grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {courseInPage.map((course, index) => {
              return <CourseCard course={course} key={index} />;
            })}
          </div>
        )}
        {isLoading && (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => {
              return <CourseCardSkeleton key={index} />;
            })}
          </div>
        )}
      </div>

      <Pagination
        itemPerPage={coursePerPage}
        totalItems={totalCourses}
        itemName={"courses"}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
export default Courses;
