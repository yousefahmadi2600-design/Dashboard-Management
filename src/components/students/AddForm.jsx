import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
function AddForm({ onFormClick, handleCancel }) {
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
      name: "Major :",
      type: "text",
      register: "major",
    },
    {
      name: "Email :",
      type: "text",
      register: "email",
    },
  ];
  const addSchema = yup.object().shape({
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    major: yup.string().required(),
    email: yup.string().email().required(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(addSchema),
  });

  return (
    <form onSubmit={handleSubmit(onFormClick)}>
      {inputFields.map((field) => (
        <div key={field.name}>
          <p className="ml-1 font-semibold sm:ml-2"> {field.name}</p>
          <input
            className="my-1 h-8 w-full rounded-2xl bg-white px-2 text-black outline-none sm:my-2 sm:h-10 lg:my-2 dark:border dark:border-violet-900 dark:bg-slate-600/95 dark:text-gray-200"
            type={field.type}
            {...register(field.register)}
            placeholder={field.placeholder}
          />
          {errors[field.register] && (
            <p className="text-red-500">{errors[field.register]?.message}</p>
          )}
        </div>
      ))}

      <div className="mt-5 flex h-8 items-center justify-between text-sm font-semibold text-white sm:text-base">
        <button
          type="submit"
          className="h-8 rounded-2xl bg-violet-500 px-5 sm:h-9 dark:bg-violet-600"
        >
          Add
        </button>
        <button
          type="button"
          className="h-8 rounded-2xl bg-red-500 px-3 sm:h-9"
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

export default AddForm;
