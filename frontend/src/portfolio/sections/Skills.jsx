/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSkillsQuery } from "../../hooks/skillsQuery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { use } from "react";

library.add(fas, fab);

// Modern 3D-style skill card design
const SkillCard = ({ skill, index, isVisible }) => {
  const colors = {
    beginner: "from-amber-400 to-orange-500",
    intermediate: "from-teal-400 to-emerald-500",
    advanced: "from-blue-400 to-indigo-500",
    expert: "from-purple-400 to-fuchsia-500",
  };

  const getLevel = (proficiency) => {
    if (proficiency < 40) return "beginner";
    if (proficiency < 60) return "intermediate";
    if (proficiency < 80) return "advanced";
    if (proficiency < 100) return "expert";
    return "expert";
  };

  const level = getLevel(skill.proficiency);
  const levelColor = colors[level];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateY: -15 }}
      animate={
        isVisible
          ? { opacity: 1, y: 0, rotateY: 0 }
          : { opacity: 0, y: 30, rotateY: -15 }
      }
      transition={{ duration: 0.6, delay: index * 0.1, type: "spring" }}
      className="group relative perspective"
    >
      <div
        className="relative bg-white dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl overflow-hidden transition-all duration-300 
          hover:shadow-[0_20px_50px_rgba(8,112,184,0.15)] dark:hover:shadow-[0_20px_50px_rgba(139,92,246,0.15)]
          p-6 border border-slate-200 dark:border-slate-700/50 transform-gpu hover:-translate-y-2"
      >
        {/* Floating skill level badge */}
        <div className="absolute top-4 right-4 z-10">
          <div
            className={`text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${levelColor} text-white`}
          >
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </div>
        </div>

        {/* Skill content */}
        <div className="flex flex-col">
          <div className="flex items-center mb-4">
            {/* Abstract 3D icon */}
            <div
              className={`relative h-14 w-14 rounded-2xl bg-gradient-to-br ${levelColor} flex items-center justify-center shadow-lg mr-4 
                transform-gpu rotate-3 group-hover:rotate-6 transition-transform duration-300`}
            >
              <div className="absolute inset-0 rounded-2xl bg-white/4" />
              <FontAwesomeIcon
                icon={["fab", skill.icon]}
                className=" text-white text-3xl"
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                {skill.name}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {skill.experience} {skill.experience === 1 ? "year" : "years"}{" "}
                experience
              </p>
            </div>
          </div>

          {/* Curved progress bar */}
          <div className="mt-2 h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${skill.proficiency}%` }}
              transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
              className={`h-full bg-gradient-to-r ${levelColor} relative`}
            >
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJzdHJpcGVzIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoNDUpIj48cmVjdCB3aWR0aD0iMiIgaGVpZ2h0PSI0IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMikiIC8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3N0cmlwZXMpIiAvPjwvc3ZnPg==')] opacity-40" />
            </motion.div>
          </div>

          {/* Projects count and proficiency percentage */}
          <div className="flex justify-between mt-4 text-sm">
            <span className="font-medium text-slate-600 dark:text-slate-400">
              {Math.round(skill.proficiency)}% Proficiency
            </span>
            {/* <span className="font-medium text-slate-600 dark:text-slate-400">
              {Math.floor(Math.random() * 20) + 1} Projects
            </span> */}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Improved skeleton with flowing animation
const SkillsSkeleton = () => {
  return (
    <section className="relative w-full min-h-screen py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-300 dark:bg-purple-900/30 rounded-full filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-300 dark:bg-blue-900/30 rounded-full filter blur-3xl opacity-20 animate-pulse" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title skeleton */}
        <div className="text-center mb-16">
          <div className="h-12 w-64 bg-gradient-to-r from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-600 rounded-lg mx-auto mb-6 animate-pulse" />
          <div className="h-4 w-full max-w-lg bg-slate-200 dark:bg-slate-700 rounded mx-auto animate-pulse mb-2" />
          <div className="h-4 w-3/4 max-w-md bg-slate-200 dark:bg-slate-700 rounded mx-auto animate-pulse" />
        </div>

        {/* Tabs skeleton */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-full">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-10 w-32 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* Skills grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm animate-pulse"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-center mb-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-200 dark:bg-slate-700 mr-4" />
                <div className="space-y-2">
                  <div className="h-5 w-24 bg-slate-200 dark:bg-slate-700 rounded" />
                  <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded" />
                </div>
              </div>
              <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full mb-4" />
              <div className="flex justify-between">
                <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded" />
                <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const [skillsCategory, setSkillsCategory] = useState("all");
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [isInView, setIsInView] = useState(false);

  const {
    data: skillsData,
    isLoading: isSkillsLoading,
    error: skillsError,
  } = useSkillsQuery();

  const categoriesData = [
    { id: "all", label: "All Skills" },
    { id: "front-end", label: "Frontend" },
    { id: "back-end", label: "Backend" },
    { id: "mobile-app", label: "Mobile" },
  ];

  const [categories, setCategories] = useState([]);

  const updateCategories = () => {
    const isMobile = window.innerWidth <= 768; // Adjust breakpoint as needed
    const filtereCategories = isMobile
      ? categoriesData.filter((category) => category.id !== "all")
      : categoriesData;
    setCategories(filtereCategories);
    setSkillsCategory(filtereCategories[0].id);
  };
  useEffect(() => {
    updateCategories(); // Set initial state
    window.addEventListener("resize", updateCategories);

    return () => {
      window.removeEventListener("resize", updateCategories);
    };
  }, []);

  useEffect(() => {
    if (skillsData) {
      setFilteredSkills(
        skillsCategory === "all"
          ? skillsData
          : skillsData.filter((skill) => skill.type === skillsCategory)
      );
    }
  }, [skillsData, skillsCategory]);

  useEffect(() => {
    // Auto-set to visible after a delay
    const timer = setTimeout(() => setIsInView(true), 300);
    return () => clearTimeout(timer);
  }, []);

  if (isSkillsLoading || skillsError) {
    return <SkillsSkeleton />;
  }

  return (
    <motion.section
      id="skills"
      className="relative w-full min-h-screen py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-300 dark:bg-purple-900/30 rounded-full filter blur-3xl opacity-20" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-300 dark:bg-blue-900/30 rounded-full filter blur-3xl opacity-20" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxMTEiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] bg-center opacity-50" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mb-6">
            Technical Proficiency
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
            My toolkit includes cutting-edge technologies that enable me to
            build performant, accessible, and beautiful digital experiences.
          </p>
        </motion.div>

        {/* Category filter tabs */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-wrap justify-center space-x-2 p-1.5 bg-slate-100 dark:bg-slate-800/70 backdrop-blur-sm rounded-full shadow-inner">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSkillsCategory(category.id)}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  skillsCategory === category.id
                    ? "text-white shadow-md"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white"
                } ${category.id === "all" ? "hidden lg:block" : ""}`}
              >
                {skillsCategory === category.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    initial={false}
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{category.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Skills grid with animated transition between categories */}
        <AnimatePresence mode="wait">
          <motion.div
            key={skillsCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredSkills.map((skill, index) => (
              <SkillCard
                key={skill.name}
                skill={skill}
                index={index}
                isVisible={isInView}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state when no skills match the filter */}
        {filteredSkills.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              No skills found in this category.
            </p>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default Skills;
