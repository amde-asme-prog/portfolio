/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { useServicesQuery } from "../../hooks/servicesQuery";

library.add(fas, fab);

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

const Services = () => {
  const {
    data: services,
    isLoading: isServicesLoading,
    error: servicesError,
  } = useServicesQuery();

  if (isServicesLoading || servicesError) {
    return (
      <section
        id="services"
        className="py-16 px-4 sm:px-8 md:px-12 w-full bg-gray-100 dark:bg-stone-900 mb-5"
      >
        <div className="mx-auto px-10">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white text-center mb-12">
            Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[...Array(4)].map((_, index) => (
              <ShimmerCard key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }
  //  else if (servicesError) {
  //   return <ErrorMessage status={servicesError.response?.status} />;
  // }

  return (
    <section
      id="services"
      className="py-16 px-4 sm:px-8 md:px-12 w-full bg-gray-100 dark:bg-stone-900 mb-5"
    >
      <div className="mx-auto px-10">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white text-center mb-12">
          Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {services &&
            services.map((service, index) => (
              <div
                key={index}
                className="flex items-start gap-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg">
                  <FontAwesomeIcon icon={service.icon} size="lg" />
                </div>
                <div>
                  <h3 className="font-roboto text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    {service.title}
                  </h3>
                  <p className=" font-serif text-gray-600 dark:text-gray-400">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
