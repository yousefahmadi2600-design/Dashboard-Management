import { statusClasses } from "../../constants/statusClasses";
function ProjectCard({ project }) {
  return (
    <div className="relative space-y-1 rounded-lg border border-gray-400 bg-slate-50 p-3 shadow-sm shadow-slate-300 duration-300 hover:bg-slate-400 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-200 dark:shadow-slate-900 lg:dark:hover:bg-slate-800">
      <h1 className="max-w-50 font-semibold">{project.name}</h1>
      <h2 className="border-t border-gray-300 dark:border-gray-700">
        Date : {project.dueDate}
      </h2>
      <h2 className="border-t border-gray-300 dark:border-gray-700">
        score : {project.score}
      </h2>
      <h2
        className={`${statusClasses[project.status]} absolute right-3 bottom-3 rounded-2xl border px-2 text-sm`}
      >
        {project.status}
      </h2>
    </div>
  );
}

export default ProjectCard;
