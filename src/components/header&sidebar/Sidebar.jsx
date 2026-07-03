import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SelectContext } from "../../context/SelectContext";
import {
  LayoutDashboard,
  LibraryBigIcon,
  Moon,
  Sun,
  Users,
} from "lucide-react";
function Sidebar() {
  const { activeSidebar, setActiveSidebar } = useContext(SelectContext);
  const location = useLocation();
  useEffect(() => {
    setActiveSidebar(() => {
      switch (location.pathname) {
        case "/":
          return "dashboard";
        case "/courses":
          return "courses";
        case "/students":
          return "students";
      }
    });
  }, [location.pathname]);
  // toggle theme
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      {
        document.documentElement.classList.remove("dark", "bg-slate-950");
        setIsDark(false);
      }
    } else {
      document.documentElement.classList.add("dark", "bg-slate-950");
      setIsDark(true);
    }
  };

  const navigate = useNavigate();

  return (
    <div>
      <div className="fixed right-0 bottom-0 left-0 z-30 grid h-14 grid-cols-4 border-t border-t-slate-400 bg-slate-100 p-1 sm:hidden dark:bg-slate-950 dark:text-gray-200">
        <a
          href="#"
          onClick={() => navigate("/")}
          className={`${activeSidebar === "dashboard" && "border border-violet-800 bg-violet-300 text-violet-700 dark:bg-violet-500/20 dark:text-violet-400"} flex flex-col items-center overflow-hidden rounded-lg py-1 lg:py-4`}
        >
          <div className="flex items-center justify-center">
            <LayoutDashboard
              className={`size-6 stroke-black lg:size-7 dark:stroke-gray-100 ${activeSidebar === "dashboard" && "stroke-violet-700 dark:stroke-violet-500"}`}
            />
          </div>
          <span className="text-[10px]">Dashboard</span>
        </a>
        <a
          onClick={() => navigate("/students")}
          href="#"
          className={`flex flex-col items-center overflow-hidden rounded-lg py-1 lg:py-4 ${activeSidebar === "students" && "border border-violet-800 bg-violet-300 text-violet-700 dark:bg-violet-500/20 dark:text-violet-400"} `}
        >
          <div className="flex items-center justify-center">
            <Users
              className={`size-6 stroke-black lg:size-7 dark:stroke-gray-100 ${activeSidebar == "students" && "stroke-violet-700 dark:stroke-violet-500"}`}
            />
          </div>
          <span className="text-[10px]">Students</span>
        </a>
        <a
          onClick={() => navigate("/courses")}
          href="#"
          className={`flex flex-col items-center overflow-hidden rounded-lg py-1 lg:py-4 ${activeSidebar === "courses" && "border border-violet-800 bg-violet-300 text-violet-700 dark:bg-violet-500/20 dark:text-violet-400"} `}
        >
          <div className="flex items-center justify-center">
            <LibraryBigIcon
              className={`size-6 stroke-black lg:size-7 dark:stroke-gray-100 ${activeSidebar === "courses" && "stroke-violet-700 dark:stroke-violet-500"}`}
            />
          </div>
          <span className="text-[10px]">Courses</span>
        </a>
        <a
          onClick={toggleTheme}
          href="#"
          className="flex flex-col items-center justify-end overflow-hidden rounded-lg py-1 lg:py-4"
        >
          <div className="relative">
            <Moon
              className={`absolute -right-3 bottom-0 size-6 scale-0 rotate-90 stroke-black opacity-0 transition-all duration-300 lg:size-7 dark:scale-100 dark:rotate-0 dark:stroke-gray-100 dark:opacity-100`}
            />

            <Sun
              className={`absolute -right-3 bottom-0 size-6 scale-100 rotate-0 stroke-black opacity-100 transition-all duration-300 lg:size-7 dark:scale-0 dark:rotate-90 dark:stroke-gray-100 dark:opacity-0`}
            />
          </div>
          <span className={`${!isDark ? "hidden" : "block"} text-[10px]`}>
            Dark mode
          </span>
          <span className={`${isDark ? "hidden" : "block"} text-[10px]`}>
            Day mode
          </span>
        </a>
      </div>
      <div className="fixed top-0 bottom-0 left-0 z-30 hidden w-16 border-r-slate-300 bg-slate-100 text-[10px] sm:grid md:w-18 md:text-[12px] lg:w-20 dark:bg-slate-900">
        <div className="px-1 pt-1 font-medium text-black dark:text-white">
          <a
            onClick={() => navigate("/")}
            href="#"
            className={`${activeSidebar === "dashboard" ? "border border-violet-800 bg-violet-300 text-violet-700 dark:bg-violet-500/20 dark:text-violet-400" : "hover:bg-violet-700"} grid grid-flow-row items-center gap-1 overflow-hidden rounded-lg py-4 xl:gap-1 xl:py-5`}
          >
            <div className="flex justify-center">
              <LayoutDashboard
                size={28}
                className={`stroke-black dark:stroke-gray-100 ${activeSidebar === "dashboard" && "stroke-violet-700 dark:stroke-violet-500"}`}
              />
            </div>
            <span className="text-center">Dashboard</span>
          </a>
          <a
            onClick={() => {
              navigate("/students");
              setActiveSidebar("students");
            }}
            href="#"
            className={`grid grid-flow-row items-center gap-1 overflow-hidden rounded-lg py-4 ${activeSidebar === "students" ? "border border-violet-800 bg-violet-300 text-violet-700 dark:bg-violet-500/20 dark:text-violet-400" : "hover:bg-violet-700"} `}
          >
            <div className="flex justify-center">
              <Users
                size={28}
                className={`stroke-black dark:stroke-gray-100 ${activeSidebar == "students" && "stroke-violet-700 dark:stroke-violet-500"}`}
              />
            </div>
            <span className="text-center">Students</span>
          </a>
          <a
            onClick={() => {
              navigate("/courses");
              setActiveSidebar("courses");
            }}
            href="#"
            className={`grid grid-flow-row items-center gap-1 overflow-hidden rounded-lg py-4 ${activeSidebar === "courses" ? "border border-violet-800 bg-violet-300 text-violet-700 dark:bg-violet-500/20 dark:text-violet-400" : "hover:bg-violet-700"} `}
          >
            <div className="flex justify-center">
              <LibraryBigIcon
                className={`size-7 stroke-black dark:stroke-gray-100 ${activeSidebar === "courses" && "stroke-violet-700 dark:stroke-violet-500"}`}
              />
            </div>
            <span className="text-center">Courses</span>
          </a>
          <a
            onClick={toggleTheme}
            href="#"
            className={`flex h-21 flex-col items-center justify-end overflow-hidden rounded-lg py-1 lg:py-4`}
          >
            <div className="grid grid-flow-row gap-1 text-center">
              <div className="relative">
                <Moon
                  className={`absolute bottom-1 left-2/10 size-6 scale-0 rotate-90 stroke-black opacity-0 transition-all duration-300 lg:size-7 dark:scale-100 dark:rotate-0 dark:stroke-gray-100 dark:opacity-100`}
                />

                <Sun
                  className={`absolute bottom-1 left-2/10 size-6 scale-100 rotate-0 stroke-black opacity-100 transition-all duration-300 lg:size-7 dark:scale-0 dark:rotate-90 dark:stroke-gray-100 dark:opacity-0`}
                />
              </div>
              <span className={`${!isDark ? "hidden" : "block"} h-9 lg:h-4`}>
                Dark mode
              </span>
              <span className={`${isDark ? "hidden" : "block"} h-9 lg:h-4`}>
                Day mode
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
