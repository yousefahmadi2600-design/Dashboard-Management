import { Star, User } from "lucide-react";
import { majorClasses } from "../../constants/majorClasses";
import { statusClasses } from "../../constants/statusClasses";
import { useState } from "react";
function CourseCard({ course }) {
  const [isHover, setIsHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={`${isHover ? "bg-slate-400 lg:dark:bg-slate-800" : "bg-slate-50 dark:bg-slate-900"} grid grid-rows-[auto_auto_1fr_rauto] rounded-lg p-2 shadow-sm shadow-slate-300 transition-all duration-300 lg:p-3 dark:text-gray-200 dark:shadow-slate-900`}
    >
      <div className="relative h-50 w-full overflow-hidden rounded-lg">
        {course.participant === 40 && (
          <span className="absolute top-1 left-0 ml-3 flex items-center rounded-xl bg-green-400 px-2 font-semibold text-green-700 lg:px-3 lg:text-lg lg:font-bold">
            FULL
          </span>
        )}
        <img
          src={course.image}
          className={`${isHover?"scale-105":"scale-100"} transition-all duration-200 h-full w-full object-cover object-center`}
        />
      </div>
      <div className="mt-2 flex items-start justify-between lg:mt-4">
        <div className="flex flex-wrap gap-2">
          {course.categories.map((category, index) => {
            return (
              <h1
                key={index}
                className={`min-w-40 overflow-hidden rounded-md border-none px-2 text-sm sm:text-base ${majorClasses[category]}`}
              >
                {category}
              </h1>
            );
          })}
        </div>

        <div className="flex gap-1 text-lg">
          <Star className="fill-yellow-500" color="" />
          {course.like}
        </div>
      </div>
      <div className="py-2 text-lg font-semibold lg:py-4 lg:text-xl lg:font-bold">
        {course.name}
        <div className="text-base text-gray-900 lg:pt-2 dark:text-white">
          instructor : {course.instructor}
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-t-gray-500 lg:py-2">
        <p className="flex items-end text-gray-700 dark:text-gray-400">
          <User className="size-6 dark:stroke-gray-400" /> Capacity : &nbsp;{" "}
          <span className="text-lg font-semibold text-black lg:text-xl dark:text-white">
            {course.participant}
          </span>{" "}
          &nbsp;/40{" "}
        </p>
        <p
          className={`${statusClasses[course.status]} mt-1 flex items-center rounded-xl px-2 font-semibold lg:h-8 lg:px-3 lg:font-bold dark:border-none dark:bg-transparent`}
        >
          {course.status}
        </p>
      </div>
    </div>
  );
}

export default CourseCard;
