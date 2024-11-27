import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import Experience from "./Experience";
import Testimonials from "./Testimonials";

library.add(fab, fas);

const About = () => {
  const [activeSection, setActiveSection] = useState("experience");

  const sections = [
    {
      id: "experience",
      title: "Experience",
      component: <Experience />,
      icon: "briefcase",
    },
    {
      id: "testimonials",
      title: "Testimonials",
      component: <Testimonials />,
      icon: "quote-right",
    },
  ];

  return (
    <section className="min-h-screen w-full py-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container  px-4 max-w-7xl">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.h1>

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
                  src="/assets/amdebirhan_asmamaw.jpg"
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
                      Computer Science graduate skilled in web and mobile app
                      development. Passionate about technology and continuous
                      learning.
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
                  onClick={() => setActiveSection(section.id)}
                  className={`
                    px-8 py-4 rounded-xl text-sm font-semibold transition-all duration-300
                    flex items-center gap-3 backdrop-blur-sm
                    ${
                      activeSection === section.id
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                        : "bg-white/80 text-gray-700 hover:bg-stone-300 hover:text-stone-800 hover:shadow-md dark:bg-gray-800/80 dark:text-gray-200"
                    }
                  `}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FontAwesomeIcon icon={section.icon} className="text-lg" />
                  {section.title}
                </motion.button>
              ))}
            </div>

            {/* Content Display */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 backdrop-blur-sm"
              >
                {
                  sections.find((section) => section.id === activeSection)
                    .component
                }
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
