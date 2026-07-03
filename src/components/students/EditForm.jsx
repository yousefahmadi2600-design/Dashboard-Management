import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

function EditForm({ onFormClick, handleCancel, editingStudent }) {
  const inputFields = [
  {
    name: "Firstname :",
    type: "text",
    register: "firstname",
  },
  {
    name: "Lastname :",
    type: "text",
    register: "lastname",
  },
  {
    name: "Email :",
    type: "text",
    register: "email",
  },
  {
    name: "Major :",
    type: "text",
    register: "major",
  },
  {
    name: "Status :",
    type: "text",
    register: "status",
  },
];
  const editSchema = yup.object().shape({
    firstname: yup.string(),
    lastname: yup.string(),
    major: yup.string(),
    email: yup.string().email(),
    status: yup.string(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(editSchema),
    defaultValues: {
      firstname: editingStudent?.name.split(" ")[0],
      lastname: editingStudent?.name.split(" ")[1],
      major: editingStudent?.major,
      email: editingStudent?.email,
      status: editingStudent?.status,
    },
  });
  return (
    <form onSubmit={handleSubmit(onFormClick)}>
      {inputFields.map((field) => (
        <div key={field.name}>
          <p className="font-semibold ml-1 sm:ml-2">{field.name}</p>
          <input
            className="my-1 sm:my-2 h-8 sm:h-10 w-full rounded-2xl bg-white px-2 text-black outline-none dark:border dark:border-violet-900 dark:bg-slate-600/95 dark:text-gray-200"
            type={field.type}
            {...register(field.register)}
          />
          {errors[field.register] && (
            <p className="text-red-500">{errors[field.register]?.message}</p>
          )}
        </div>
      ))}

      <div className="mt-5 flex h-8 justify-between text-sm sm:text-base font-semibold text-white">
        <button
          type="submit"
          className="rounded-2xl bg-violet-500 px-5 h-9 dark:bg-violet-600"
        >
          Save
        </button>
        <button
          type="button"
          className="rounded-2xl bg-red-500 px-3 h-9"
          onClick={() => {
            handleCancel();
            reset();
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EditForm;
