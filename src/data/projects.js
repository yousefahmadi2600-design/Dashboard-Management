import { faker } from "@faker-js/faker";
const statuses = ["Active","Inactive","Completed"]

faker.seed(5);
export const projects = Array.from({ length: 30 }, (_, index) => {
  const status = statuses[faker.number.int({ min: 0, max: 2 })];
  return {
    id: index + 1,
    name: faker.company.catchPhrase(),
    status,
    score:
      status === "Completed" ? faker.number.int({ min: 70, max: 100 }) : null,
    dueDate: faker.date.recent().toLocaleDateString(),
  };
});
faker.seed(6);
export const graduatedProjects = Array.from({ length: 30 }, (_, index) => {
  return {
    id: index + 1,
    name: faker.company.catchPhrase(),
    status: "Completed",
    score: faker.number.int({ min: 70, max: 100 }),
    dueDate: faker.date.recent().toLocaleDateString(),
  };
});
