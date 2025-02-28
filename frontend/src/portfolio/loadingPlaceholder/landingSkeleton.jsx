const LandingSkeleton = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col lg:flex-row w-full pt-28 pb-20"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-100 via-white to-gray-200 dark:from-blue-950 dark:via-gray-900 dark:to-stone-950">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-300/10 via-transparent to-purple-300/10 dark:from-blue-500/10" />
        <div className="absolute inset-0 backdrop-blur-[1px]" />
      </div>

      <div className="relative container mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center">
        <div className="flex flex-col gap-12 w-full lg:w-2/3 z-10">
          <div className="space-y-8">
            {/* Skeleton for greeting */}
            <div className="h-14 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>

            {/* Skeleton for introduction */}
            <div className="space-y-4">
              <div className="h-10 w-4/5 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
              <div className="h-10 w-2/3 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
            </div>

            {/* Skeleton for typewriter */}
            <div className="h-8 w-1/2 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
          </div>

          {/* Skeleton for social icons */}
          <div className="flex gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"
              ></div>
            ))}
          </div>

          {/* Skeleton for buttons */}
          <div className="flex gap-4 sm:gap-6">
            <div className="h-12 w-40 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
            <div className="h-12 w-32 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
          </div>
        </div>

        {/* Skeleton for image */}
        <div className="relative w-full lg:w-1/2 mt-12 lg:mt-0">
          <div className="relative z-10 overflow-hidden rounded-2xl aspect-video">
            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
          </div>
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-200/20 to-purple-200/20 blur-xl opacity-40 dark:opacity-50 -z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default LandingSkeleton;
