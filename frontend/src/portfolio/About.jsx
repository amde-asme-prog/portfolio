import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  ErrorMessage,
  LoadingSpinner,
  OfflineMessage,
} from "./reusables/ErrorResponses";

library.add(fab, fas);

const About = () => {
  const [activeSection, setActiveSection] = useState("values");

  const sections = [
    {
      id: "values",
      title: "Core Values",
      content: (
        <div>
          <h3 className="text-2xl font-bold mb-4 text-purple-700 dark:text-purple-400">
            My Principles
          </h3>
          <p className="mb-6 text-gray-700 dark:text-gray-300">
            These values define how I approach my work and life:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-gray-600 dark:text-gray-400">
            <li>
              <strong>Integrity:</strong> Upholding honesty and quality in all I
              do.
            </li>
            <li>
              <strong>Innovation:</strong> Embracing creativity and staying
              ahead of the curve.
            </li>
            <li>
              <strong>Collaboration:</strong> Building meaningful partnerships
              for success.
            </li>
            <li>
              <strong>Passion:</strong> Pursuing technology with enthusiasm and
              a growth mindset.
            </li>
          </ul>
        </div>
      ),
      icon: "heart",
    },
    {
      id: "interests",
      title: "Interests",
      content: (
        <div>
          <h3 className="text-2xl font-bold mb-4 text-green-700 dark:text-green-400">
            What Sparks My Curiosity
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Beyond coding, I find joy and inspiration in:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-gray-600 dark:text-gray-400">
            <li>Exploring the latest tech trends and breakthroughs.</li>
            <li>
              Building interactive projects and open-source contributions.
            </li>
            <li>Diving into UI/UX design and optimizing user experiences.</li>
            <li>
              Participating in hackathons and tech meetups to share ideas.
            </li>
            <li>
              Staying connected with nature through hiking and photography.
            </li>
          </ul>
        </div>
      ),
      icon: "compass",
    },
  ];

  // if (isLoading) return <LoadingSpinner />;
  // if (fetchStatus === "paused") return <OfflineMessage />;
  // if (error) return <ErrorMessage status={error.response?.status} />;
  return (
    <section
      id="about"
      className="min-h-screen w-full py-20 bg-gray-100 dark:bg-stone-900 mb-5"
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
                    .content
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
