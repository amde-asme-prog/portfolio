import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fab, fas);

const About = ({ about }) => {
  const [activeSection, setActiveSection] = useState("core");
  const [aboutData, setAboutData] = useState(null);
  // const { data: aboutData, isLoading, isError } = useAboutQuery();
  const [core, setCore] = useState(null);
  const [interests, setInterests] = useState(null);
  const [sections, setSections] = useState([]);
  useEffect(() => {
    if (about) {
      setAboutData(about);
      setSections([
        {
          id: "core",
          title: about.core_title,
          subtitle: about.core_subtitle,
          list: JSON.parse(about.core_lists),
          icon: "heart",
        },
        {
          id: "interests",
          title: about.interest_title,
          subtitle: about.interest_subtitle,
          list: about.interests_lists && JSON.parse(about.interests_lists),
          icon: "compass",
        },
      ]);
    }
  }, [about]);

  return (
    <section
      id="about"
      className="px-12 min-h-screen w-full py-20 bg-gray-100 dark:bg-stone-900 mb-5"
    >
      <p className="text-center text-4xl font-bold text-stone-800 dark:text-stone-400 py-10 pb-20">
        About Me
      </p>
      <div className="container px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Profile Image Section */}
          <motion.div
            className="lg:w-1/3 flex justify-center items-start sticky top-24"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative group">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-x"></div>

                <img
                  src={aboutData?.image_path}
                  className="absolute inset-[3px] w-[calc(100%-6px)] h-[calc(100%-6px)] object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                  alt="Amdebirhan Asmamaw"
                />

                {/* Hover Card */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h2 className="text-xl font-bold mb-2">
                      Amdebirhan Asmamaw
                    </h2>
                    <p className="text-sm text-gray-200">
                      {aboutData?.about_me}
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-blue-500 rounded-tl-xl"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-purple-500 rounded-br-xl"></div>
            </div>
          </motion.div>

          {/* Content Section */}
          <div className="lg:w-2/3">
            {/* Navigation Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {sections.map((section) => (
                <motion.button
                  key={section.id}
                  onClick={() =>
                    setActiveSection((prev) =>
                      prev == "core" ? "interests" : "core"
                    )
                  }
                  className={`px-8 py-4 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-3 backdrop-blur-sm ${
                    activeSection === section.id
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                      : "bg-white/80 text-gray-700 hover:bg-stone-300 hover:text-stone-800 hover:shadow-md dark:bg-gray-800/80 dark:text-gray-200"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FontAwesomeIcon icon={section.icon} className="text-lg" />
                  {section.title}
                </motion.button>
              ))}
            </div>

            {/* Content Display */}
            {
              <ContentDisplay
                {...sections.find((section) => section.id === activeSection)}
              />
            }
          </div>
        </div>
      </div>
    </section>
  );
};

const ContentDisplay = ({ title, subtitle, list, icon }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 backdrop-blur-sm"
      >
        <div>
          <h3 className="text-2xl font-bold mb-4 text-purple-700 dark:text-purple-400">
            {title}
          </h3>
          <p className="mb-6 text-gray-700 dark:text-gray-300">{subtitle}</p>
          <ul className="list-disc pl-6 space-y-3 text-gray-600 dark:text-gray-400">
            {list &&
              list.map((item, index) => (
                <li key={index}>
                  {item.title ? (
                    <>
                      <strong>{item.title}:</strong> {item.description}
                    </>
                  ) : (
                    item
                  )}
                </li>
              ))}
          </ul>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
export default About;
