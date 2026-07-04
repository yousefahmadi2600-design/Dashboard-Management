const ProgressRing = ({ percentage, rate, title }) => {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;

  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="mt-2 rounded-2xl bg-slate-50 p-3 lg:my-2 lg:w-full dark:bg-slate-800">
      <div>
        <div className="relative flex justify-center">
          <svg className="h-20 w-20 lg:h-45 lg:w-45" viewBox="0 0 180 180">
            <circle
              cx="90"
              cy="90"
              r={radius}
              strokeWidth="10"
              fill="transparent"
              className="stroke-slate-200 dark:stroke-slate-700"
            />

            <circle
              cx="30"
              cy="90"
              r={radius}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              transform="rotate(-90 60 60)"
              className="fill-transparent stroke-violet-600 stroke-10"
            />
          </svg>
          <div className="absolute top-2/8 text-center font-bold text-violet-600 dark:text-violet-500">
            {percentage !== null ? (
              <>
                <span className="text-3xl lg:text-5xl">{rate}</span>
                <span className="text-xl">%</span>
                <br />
                <p className="hidden max-w-26 lg:block">{title}</p>
              </>
            ) : (
              <>
                Not started yet
                <div className="hidden h-25 w-full items-center justify-center lg:flex">
                  <p className="">
                    <br />
                    {title}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
        <p className="text-center text-violet-600 dark:text-violet-500 lg:hidden">
          {title}
        </p>
      </div>
    </div>
  );
};
export default ProgressRing;
