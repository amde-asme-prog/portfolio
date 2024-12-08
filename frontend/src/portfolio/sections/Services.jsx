import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fas, fab);

// const services = [
//   {
//     icon: "mobile-alt",
//     title: "Native and Cross-Platform Mobile App Development",
//     description:
//       "I create high-quality native and cross-platform mobile applications tailored to your design specifications, ensuring seamless performance and user experience.",
//   },
//   {
//     icon: "desktop",
//     title: "Frontend Web App Development",
//     description:
//       "I build dynamic and responsive frontends using React or vanilla JavaScript, translating your designs into interactive and engaging web experiences.",
//   },
//   {
//     icon: "server",
//     title: "Backend Development",
//     description:
//       "I develop robust backend systems using a range of technologies, customized to fit your project's needs and ensure reliable performance.",
//   },
//   {
//     icon: "plug",
//     title: "API Integration",
//     description:
//       "I integrate various APIs into your applications, enabling seamless data exchange and functionality enhancements tailored to your specific requirements.",
//   },
//   {
//     icon: "palette",
//     title: "UI/UX Design",
//     description:
//       "I craft intuitive and visually appealing UI/UX designs tailored to your needs, focusing on user-centered experiences that enhance functionality and aesthetics.",
//   },
//   {
//     icon: "headphones-alt",
//     title: "Consultation",
//     description:
//       "I offer expert consultation to help you define your project requirements, plan your development strategy, and address any technical challenges.",
//   },
// ];

const Services = ({ services }) => {
  return (
    <section
      id="services"
      className="py-16 px-12 w-full bg-gray-100 dark:bg-stone-900  mb-5"
    >
      <div className="mx-auto px-10">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white text-center mb-12">
          Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex items-start gap-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg">
                <FontAwesomeIcon icon={service.icon} size="lg" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
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
