import { faker } from "@faker-js/faker";

const courseUrl = [
  "https://i.postimg.cc/tJZSWs43/fran-innocenti-n-Owkd4Yvd-Ug-unsplash.jpg",
  "https://i.postimg.cc/T3Cs8MFy/frederick-shaw-ll-XWZUAQz5A-unsplash.jpg",
  "https://i.postimg.cc/d3Y6k4g0/ux-indonesia-zwa-FDXF3v-Wc-unsplash.jpg",
  "https://i.postimg.cc/vH87Jgs6/istockphoto-2214849457-2048x2048.webp",
  "https://i.postimg.cc/dQND0LCG/quilia-1-a-A2Fadydc-unsplash.jpg",
  "https://i.postimg.cc/4d9ZNxTg/vitaly-gariev-RDf6Cvns88Q-unsplash.jpg",
  "https://i.postimg.cc/MHpCf6CW/evgeniy-surzhan-VFMhqki-L6E4-unsplash.jpg",
  "https://i.postimg.cc/X7wc0FHp/dom-fou-YRMWVcdyhm-I-unsplash.jpg",
  "https://i.postimg.cc/4ddBfd7N/organizer-eth63-Sz-Kxz-Vr-Gt-L4-unsplash.jpg",
  "https://i.postimg.cc/qqRC9hFB/pexels-micahways-10498800.jpg",
  "https://i.postimg.cc/FskY345C/pexels-max-fischer-5212342.jpg",
  "https://i.postimg.cc/13Z3FVKs/pexels-andy-barbour-6683580.jpg",
  "https://i.postimg.cc/1Xqynyn3/pexels-cottonbro-7395911.jpg",
  "https://i.postimg.cc/QMYBcxt9/pexels-rdne-7092339.jpg",
  "https://i.postimg.cc/HkpjK78P/pexels-yankrukov-8199151.jpg",
  "https://i.postimg.cc/0Nhk86rk/windows-p74ndn-YWRY4-unsplash.jpg",
  "https://i.postimg.cc/2SKmwqQC/mimi-thian-vd-XMSi-X-n6M-unsplash.jpg",
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
