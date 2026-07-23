import { faker } from "@faker-js/faker";
import img1 from "../assets/courses/course1.webp";
import img2 from "../assets/courses/course2.webp";
import img3 from "../assets/courses/course3.webp";
import img4 from "../assets/courses/course4.webp";
import img5 from "../assets/courses/course5.webp";
import img6 from "../assets/courses/course6.webp";
import img7 from "../assets/courses/course7.webp";
import img8 from "../assets/courses/course8.webp";
import img9 from "../assets/courses/course9.webp";
import img10 from "../assets/courses/course10.webp";
import img11 from "../assets/courses/course11.webp";
import img12 from "../assets/courses/course12.webp";
import img13 from "../assets/courses/course13.webp";
import img14 from "../assets/courses/course14.webp";
const courseUrl = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
  img13,
  img14,
];
const majors = [
  "Software engineering",
  "Computer science",
  "Information technology",
  "Computer engineering",
];

export const courseStatus = ["In Progress", "Upcoming", "Completed"];
faker.seed(4);
export const courses = Array.from({ length: 30 }, (_, index) => {
  const status = courseStatus[faker.number.int({ min: 0, max: 2 })];
  const category = [];
  for (let i = 0; i < 3; i++) {
    category.push(majors[faker.number.int({ min: 0, max: 3 })]);
  }
  const uniqueCategory = [...new Set(category)];
  return {
    id: index + 1,
    name: faker.commerce.productName(),
    instructor: faker.person.fullName(),
    credits: faker.number.int({ min: 1, max: 3 }),
    like: faker.number.float({ min: 2, max: 5, fractionDigits: 1 }),
    participant: faker.number.int({ min: 30, max: 40 }),
    categories: uniqueCategory,
    price: faker.number.float({ min: 10, max: 30, fractionDigits: 1 }),
    status: status,
    progress:
      status === "Completed" ? 100 : faker.number.int({ min: 30, max: 90 }),
    image: courseUrl[index % courseUrl.length],
  };
});

faker.seed(7);
export const graduatedCourses = Array.from({ length: 30 }, (_, index) => {
  return {
    id: index + 1,
    name: faker.commerce.productName(),
    instructor: faker.person.fullName(),
    credits: faker.number.int({ min: 1, max: 3 }),
    status: "Completed",
    progress: 100,
  };
});
