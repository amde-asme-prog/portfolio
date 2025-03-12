const AboutSkeleton = () => {
  return (
    <section
      id="about"
      className="px-3 sm:px-8 md:px-12 min-h-screen w-full py-20 bg-gray-100 dark:bg-stone-900 mb-5"
    >
      <div className="mx-auto px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {[...Array(4)].map((_, index) => (
            <ShimmerCard key={index} />
          ))}
        </div>
      </div>
      {/* Title skeleton */}
      <div className="flex justify-center py-10 pb-20">
        <div className="h-10 w-40 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse"></div>
      </div>

      <div className="container px-2 sm:px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Profile Image Skeleton */}
          <div className="lg:w-1/3 flex justify-center items-start">
            <div className="relative group">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden">
                {/* Animated gradient placeholder */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse"></div>

                {/* Inner shimmer effect */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="w-[200%] h-full absolute -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent"></div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-blue-500/50 rounded-tl-xl"></div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-purple-500/50 rounded-br-xl"></div>
              </div>
            </div>
          </div>

          {/* Content Section Skeleton */}
          <div className="lg:w-2/3">
            {/* Navigation Buttons Skeleton */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="h-14 w-36 bg-gray-300 dark:bg-gray-700 rounded-xl animate-pulse"
                ></div>
              ))}
            </div>

            {/* Content Display Skeleton */}
            <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-8 backdrop-blur-sm">
              {/* Title skeleton */}
              <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse mb-4"></div>

              {/* Subtitle skeleton */}
              <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse mb-6"></div>

              {/* List items skeleton */}
              <div className="space-y-4 pl-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-600 mr-4"></div>
                    <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ShimmerCard = () => {
  return (
    <div className="flex items-start gap-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md animate-pulse">
      <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg" />
      <div className="flex-1">
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-1" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
      </div>
    </div>
  );
};
export default AboutSkeleton;
