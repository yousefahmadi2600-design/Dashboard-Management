import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Bell, Search } from "lucide-react";
import { useRef } from "react";
import { StudentsContext } from "../../context/StudentsContext";
import useClickOutside from "../../hooks/useClickOutside";

function Navigation() {
  const { storedStudents } = useContext(StudentsContext);
  const profRef = useRef();
  const profIconRef = useRef();
  const { isOpen: isProfOpen, setIsOpen: setIsProfOpen } = useClickOutside(
    profRef,
    profIconRef,
  );
  const dropdownSearchRef = useRef();
  const searchIconRef = useRef();
  const { isOpen: isSearchOpen, setIsOpen: setIsSearchOpen } = useClickOutside(
    dropdownSearchRef,
    searchIconRef,
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchModalRef = useRef();
  useEffect(() => searchModalRef.current?.focus(), [isModalOpen]);
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");

  const location = useLocation();

  const searchResult =
    searchValue.length <= 2
      ? []
      : storedStudents.filter((student) => {
          const nameMatch = student.name
            .toLowerCase()
            .includes(searchValue.toLowerCase());
          const idMatch = student.studentId
            .toLowerCase()
            .includes(searchValue.toLowerCase());
          const eamilMatch = student.email
            .toLowerCase()
            .includes(searchValue.toLowerCase());
          const majorMatch = student.major
            .toLowerCase()
            .includes(searchValue.toLowerCase());
          const statusMatch = student.status
            .toLowerCase()
            .includes(searchValue.toLowerCase());
          return (
            idMatch || nameMatch || eamilMatch || statusMatch || majorMatch
          );
        });

  const searchSlice = searchResult.slice(0, 5);

  const titles = {
    "/": "DASHBOARD",
    "/courses": "COURSES",
    "/students": "LIST OF STUDENTS",
  };

  return (
    <div className="fixed top-0 right-0 left-0 z-30 flex h-16 place-items-center justify-between border-b-2 border-b-slate-400 bg-slate-300 px-4 sm:left-16 md:left-18 lg:left-20 lg:h-20 dark:border-b-slate-800 dark:bg-slate-950">
      <div className="left-div lg:mr-4 lg:px-4">
        <span className="font-semibold text-black sm:text-2xl lg:text-3xl dark:text-gray-200">
          {titles[location.pathname] || "STUDENT OVERVIEW"}
        </span>
      </div>
      <div className="right-div flex gap-1.5 lg:w-150 lg:gap-2">
        {/* search for small size */}
        <div
          ref={searchIconRef}
          onClick={() => {
            if (isProfOpen) setIsProfOpen(false);
            setIsSearchOpen(!isSearchOpen);
          }}
          className="relative flex h-9 w-9 items-center rounded-full bg-violet-500 p-1.5 hover:cursor-pointer hover:bg-violet-400 lg:relative lg:hidden lg:min-h-11 lg:min-w-8 dark:bg-violet-600 dark:hover:bg-violet-500"
        >
          <Search className="size-7 stroke-white lg:absolute lg:left-3" />
        </div>
        {/* search input for big size */}
        <div className="relative hidden flex-2 lg:block">
          <input
            value={searchValue}
            placeholder="Search ..."
            type="text"
            className="h-9 w-full rounded-3xl bg-slate-100 pl-11 lg:h-11 lg:pl-13 dark:bg-slate-700 dark:placeholder:text-slate-500"
            onClick={() => setIsModalOpen(true)}
          />
          <Search className="absolute top-1.5 left-2 size-7 stroke-slate-700 lg:left-3 lg:size-8 dark:stroke-slate-500" />
        </div>
        <div className="relative h-9 w-9 rounded-full bg-violet-500 p-1.5 shadow-sm shadow-slate-300 hover:cursor-pointer hover:bg-violet-400 lg:h-11 lg:min-h-11 lg:w-11 dark:bg-violet-600 dark:shadow-slate-900 dark:hover:bg-violet-500">
          <Bell className="absolute size-6 stroke-slate-200 lg:size-8" />
          <div className="absolute -top-1 -right-1 rounded-full bg-red-600 p-0.5 text-sm text-white">
            35
          </div>
        </div>
        <div
          ref={profIconRef}
          onClick={() => {
            if (isSearchOpen) setIsSearchOpen(false);
            setIsProfOpen(!isProfOpen);
          }}
          className="flex h-9 w-9 items-center rounded-3xl bg-violet-500 text-slate-100 shadow-sm shadow-slate-300 md:w-40 md:p-0.5 lg:h-11 lg:min-w-40 lg:flex-1 dark:bg-violet-600 dark:shadow-slate-900"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-400 text-sm text-white md:h-8 md:w-8 lg:h-10 lg:w-9">
            YA
          </div>
          <div className="ml-2 hidden py-1 leading-4 md:block">
            <span className="">Yousef Ahmadi</span>
            <br />
            <span className="text-[14px] text-slate-300">Manager</span>
          </div>
        </div>
      </div>
      {/* dropdown search input */}
      <div
        ref={dropdownSearchRef}
        onClick={(e) => e.stopPropagation()}
        className={`${isSearchOpen ? " pointer-events-auto translate-y-2 opacity-100" : "pointer-events-none translate-y-0 opacity-0"} fixed top-14 right-0 left-0 bg-slate-300 px-4 py-2 transition-all duration-300 sm:ml-16 md:ml-18 lg:hidden dark:bg-slate-950`}
      >
        <div className="relative">
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search ..."
            type="text"
            className="h-9 w-full rounded-3xl bg-slate-100 pl-11 outline-none sm:h-12 sm:pl-13 lg:h-11 dark:bg-slate-900 dark:placeholder:text-slate-400 dark:text-white"
          />
          <Search className="absolute top-1 left-2 size-7 stroke-slate-700 sm:top-2 sm:left-3 sm:size-8 dark:stroke-slate-400" />
        </div>
        <div
          className={`${isSearchOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"} w-full bg-slate-300 px-0 transition-all duration-300`}
        >
          {searchSlice.map((student) => (
            <div
              className="flex items-center gap-3.5 px-6 py-2 pt-2 hover:cursor-pointer dark:bg-slate-950"
              onClick={() => {
                navigate(`/student/${student.id}`);
                setIsModalOpen(false);
                setIsSearchOpen(false);
              }}
            >
              <img src="#" className="h-10 w-10" />
              <p className="text-md dark:text-white">
                <span className="text-gray-500">name</span> : {student.name}{" "}
                <span className="text-gray-500">| ID</span> :{" "}
                {student.studentId}{" "}
                <span className="text-gray-500">| major</span> : {student.major}
              </p>
            </div>
          ))}
          {searchResult.length >= 6 && (
            <div className="flex items-center justify-center p-2 dark:bg-slate-950">
              <p className="text-gray-800 dark:text-gray-400">
                Showing{" "}
                <span className="text-lg font-semibold text-black dark:text-white">
                  5
                </span>{" "}
                of{" "}
                <span className="text-lg font-semibold text-black dark:text-white">
                  {searchResult.length}
                </span>{" "}
                results
              </p>
            </div>
          )}
        </div>
      </div>
      {isModalOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="fixed top-24 left-1/2 z-50 w-150 -translate-x-1/2"
              onClick={(e) => e.stopPropagation()}
            >
              <input
                ref={searchModalRef}
                value={searchValue}
                type="text"
                className="w-full rounded-2xl bg-zinc-200 p-4 text-lg outline-none dark:bg-slate-900 dark:text-gray-200"
                placeholder="Search student"
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
            <div
              onClick={(e) => e.stopPropagation()}
              className={`${searchSlice.length !== 0 ? " pointer-events-auto translate-y-2 opacity-100" : "pointer-events-none translate-y-0 opacity-0"} fixed top-32 left-1/2 z-40 w-150 -translate-x-1/2 rounded-b-2xl bg-zinc-200 pt-5 transition-all duration-300 dark:bg-slate-900`}
            >
              {searchSlice.map((student) => (
                <div
                  className="flex items-center gap-3.5 px-6 py-2 pt-2 hover:cursor-pointer"
                  onClick={() => {
                    navigate(`/student/${student.id}`);
                    setIsModalOpen(false);
                  }}
                >
                  <img src="#" className="h-10 w-10" />
                  <p className="text-md dark:text-white">
                    <span className="text-gray-500">name</span> : {student.name}{" "}
                    <span className="text-gray-500">| ID</span> :{" "}
                    {student.studentId}{" "}
                    <span className="text-gray-500">| major</span> :{" "}
                    {student.major}
                  </p>
                </div>
              ))}
              {searchResult.length >= 6 && (
                <div className="flex items-center justify-center p-2">
                  <p className="text-gray-800 dark:text-gray-400">
                    Showing{" "}
                    <span className="text-lg font-semibold text-black dark:text-white">
                      5
                    </span>{" "}
                    of{" "}
                    <span className="text-lg font-semibold text-black dark:text-white">
                      {searchResult.length}
                    </span>{" "}
                    results
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
      {/* profile details dropdown */}
      <div
        className={`${isProfOpen ? " pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"} fixed top-16 right-0 bottom-14 left-0 z-40 bg-black/30 text-black transition-all duration-300 sm:bottom-0 sm:left-16 md:left-18 lg:top-20 lg:left-20`}
      >
        <div
          ref={profRef}
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="fixed top-0 right-0 left-0 z-50 items-center justify-center bg-slate-50 px-4 dark:bg-slate-950 dark:text-white"
        >
          <div className="mt-4 grid grid-cols-1 gap-1">
            <div
              className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-400 text-sm text-white lg:h-20 lg:w-20`}
            >
              YA
            </div>
            <div className="mx-auto font-semibold">Yousef Ahmadi</div>
            <div className="mx-auto pb-2 text-gray-600 dark:text-gray-400">
              Manager
            </div>
          </div>
          <button className="w-full border-t border-gray-400 p-2">
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
