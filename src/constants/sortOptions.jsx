import {
  ArrowDown10,
  ArrowDownWideNarrow,
  ArrowDownZa,
  ArrowUp01,
  ArrowUpAz,
  ArrowUpNarrowWide,
} from "lucide-react";

export const sortOptions = [
  {
    name: "name",
    value: "atoz",
    label: "Name(A to Z)",
    icon: <ArrowUpAz className="size-4 stroke-white" />,
  },
  {
    name: "name",
    value: "ztoa",
    label: "Name(Z to A)",
    icon: <ArrowDownZa className="size-4 stroke-white" />,
  },
  {
    name: "GPA",
    value: "lowestGpa",
    label: "GPA(Low to high)",
    icon: <ArrowUp01 className="size-5 stroke-white" />,
  },
  {
    name: "GPA",
    value: "highestGpa",
    label: "GPA(High to low)",
    icon: <ArrowDown10 className="size-5 stroke-white" />,
  },
  {
    name: "attendance",
    value: "lowestAttendance",
    label: "Attend(Low to high)",
    icon: <ArrowUpNarrowWide color="white" />,
  },
  {
    name: "attendance",
    value: "highestAttendance",
    label: "Attend(High to low)",
    icon: <ArrowDownWideNarrow color="white" />,
  },
];
