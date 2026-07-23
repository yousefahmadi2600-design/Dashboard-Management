import { faker } from "@faker-js/faker";
import { courses, graduatedCourses } from "./courses";
import { graduatedProjects, projects } from "./projects";

const majors = [
  "Software engineering",
  "Computer science",
  "Information technology",
  "Computer engineering",
];
const statuses = ["Active", "Inactive", "Graduated"];

faker.seed(1);
export const recentStudents = Array.from({ length: 20 }, (_, index) => {
  const smallCourseList = [];
  const smallProjectList = [];
  for (let i = 0; i < faker.number.int({ min: 2, max: 7 }); i++) {
    smallCourseList.push(courses[faker.number.int({ min: 0, max: 6 })]);
    smallProjectList.push(projects[faker.number.int({ min: 0, max: 7 })]);
  }

  const uniqueSmallCourses = [...new Set(smallCourseList)];
  const uniqueSmallProjects = [...new Set(smallProjectList)];

  return {
    id: index + 1,
    name: faker.person.fullName(),
    studentId: `ST${index + 4000}`,
    major: `${majors[index % majors.length]}`,
    gpa: faker.number.float({ min: 8, max: 20, fractionDigits: 2 }),
    status: "Active",
    email: faker.internet.email({ provider: "gmail.com" }),
    projects: uniqueSmallProjects,
    courses: uniqueSmallCourses,
    attendanceRate: faker.number.int({ min: 60, max: 100 }),
    image: faker.image.avatar(),
    progress: faker.number.int({ min: 10, max: 20 }),
  };
});

// faker.seed(2);
export const students = Array.from({ length: 300 }, (_, index) => {
  const bigCourseList = [];

  const bigProjectList = [];
  for (let i = 0; i < faker.number.int({ min: 10, max: 20 }); i++) {
    bigCourseList.push(courses[faker.number.int({ min: 0, max: 29 })]);
    bigProjectList.push(projects[faker.number.int({ min: 0, max: 29 })]);
  }
  const uniqueBigCourses = [...new Set(bigCourseList)];
  const uniqueBigProjects = [...new Set(bigProjectList)];
  const status = statuses[faker.number.int({ min: 0, max: 2 })];
  return {
    id: index + 20,
    name: faker.person.fullName(),
    studentId: `ST${index + 4020}`,
    major: `${majors[index % majors.length]}`,
    gpa: faker.number.float({ min: 8, max: 20, fractionDigits: 2 }),
    status: status,
    email: faker.internet.email({ provider: "gmail.com" }),
    projects: status === "Graduated" ? graduatedProjects : uniqueBigProjects,
    courses: status === "Graduated" ? graduatedCourses : uniqueBigCourses,
    attendanceRate: faker.number.int({ min: 60, max: 100 }),
    image: faker.image.avatar(),
    progress:
      status === "Graduated" ? 100 : faker.number.int({ min: 70, max: 90 }),
  };
});
export const allStudents = recentStudents.concat(students);
