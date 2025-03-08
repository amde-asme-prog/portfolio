/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useSkillsQuery } from "../../hooks/skillsQuery";

// Sophisticated skeleton component with staggered animations
const SkillsSkeleton = () => {
  // Define category colors for consistency with the actual content
  const categoryColors = [
    "from-emerald-500 to-teal-500",
    "from-blue-500 to-indigo-500",
    "from-purple-500 to-pink-500",
  ];

  return (
    <section
      id="skills"
      className="relative px-4 sm:px-8 md:px-12 w-full min-h-screen py-24 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-slate-900"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5" />

      <div className="relative container mx-auto">
        {/* Title Skeleton */}
        <div className="text-center mb-24">
          <div className="h-14 w-72 sm:w-96 bg-gradient-to-r from-gray-300 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-lg mx-auto mb-8 animate-pulse" />
          <div className="h-4 w-full max-w-3xl bg-gray-200 dark:bg-gray-700 rounded mx-auto animate-pulse mb-2" />
          <div className="h-4 w-5/6 max-w-2xl bg-gray-200 dark:bg-gray-700 rounded mx-auto animate-pulse mb-2" />
          <div className="h-4 w-4/6 max-w-xl bg-gray-200 dark:bg-gray-700 rounded mx-auto animate-pulse" />
        </div>

        {/* Skills Categories Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg overflow-hidden"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Category Header Skeleton */}
              <div className="flex items-center mb-6 sm:mb-8">
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${categoryColors[index]} flex items-center justify-center mr-4 shadow-lg`}
                >
                  <div className="w-4 h-4 sm:w-5 sm:h-5 bg-white/30 rounded-full animate-pulse" />
                </div>
                <div className="h-6 w-28 sm:w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>

              {/* Skills Grid Skeleton */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {[...Array(6)].map((_, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3 sm:p-4 overflow-hidden relative"
                    style={{
                      animationDelay: `${index * 0.2 + skillIndex * 0.1}s`,
                    }}
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="relative">
                        <div
                          className={`size-10 sm:size-12 bg-gradient-to-br ${categoryColors[index]} opacity-70 rounded-lg`}
                        />
                        <div className="absolute -top-2 -right-2 w-8 sm:w-10 h-4 sm:h-5 bg-white dark:bg-gray-800 rounded-lg" />
                      </div>
                      <div className="space-y-1 sm:space-y-2">
                        <div className="h-3 sm:h-4 w-14 sm:w-16 bg-gray-200 dark:bg-gray-600 rounded animate-pulse" />
                        <div className="h-2 sm:h-3 w-10 sm:w-12 bg-gray-200 dark:bg-gray-600 rounded animate-pulse" />
                      </div>
                    </div>

                    {/* Animated Progress Bar Skeleton with shimmer effect */}
                    <div className="mt-2 sm:mt-3 h-1.5 w-full bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                      <div className="h-full w-full bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-600 dark:via-gray-500 dark:to-gray-600 relative overflow-hidden">
                        <div className="absolute inset-0 h-full w-[200%] animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const [technicalSkills, setTechnicalSkills] = useState([]);
  const {
    data: skillsData,
    isLoading: isSkillsLoading,
    error: skillsError,
  } = useSkillsQuery();

  useEffect(() => {
    setTechnicalSkills(skillsData);
  }, [skillsData]);

  if (isSkillsLoading) {
    return <SkillsSkeleton />;
  } else if (skillsError) {
    return <SkillsSkeleton />;
    // return <ErrorMessage status={skillsError.response?.status} />;
  }

  return (
    <section
      id="skills"
      className="relative px-4 sm:px-8 md:px-12 w-full min-h-screen py-16 sm:py-24 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-slate-900"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5" />

      <div className="relative container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-24"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent mb-4 sm:mb-8">
            Skills & Expertise
          </h1>
          <p className="text-slate-700 dark:text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed px-2">
            Combining technical excellence with professional acumen to deliver
            innovative solutions across multiple platforms and technologies.
          </p>
        </motion.div>

        <TechnicalSkills technicalSkills={technicalSkills || []} />
      </div>
    </section>
  );
};

const TechnicalSkills = ({ technicalSkills }) => {
  const categories = [
    { id: "front-end", icon: "desktop", color: "from-emerald-500 to-teal-500" },
    { id: "back-end", icon: "server", color: "from-blue-500 to-indigo-500" },
    { id: "mobile-app", icon: "mobile", color: "from-purple-500 to-pink-500" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16">
      {categories.map((category, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8 flex items-start justify-start flex-wrap sm:flex-nowrap">
            <div
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mr-4 shadow-lg shrink-0`}
            >
              <FontAwesomeIcon
                icon={["fas", category.icon]}
                className="text-white text-lg sm:text-xl"
              />
            </div>
            <span className="mt-2 sm:mt-0">
              {category.id.replace("-", " ").charAt(0).toUpperCase() +
                category.id.slice(1).replace("-", " ")}{" "}
              Development
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {technicalSkills
              .filter((skill) => skill.type === category.id)
              .map((skill, skillIndex) => (
                <Skill
                  key={skillIndex}
                  skill={skill}
                  categoryColor={category.color}
                  delay={skillIndex * 0.1}
                />
              ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const Skill = ({ skill, categoryColor, delay }) => (
  <motion.div
    className="group relative bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3 sm:p-4 hover:shadow-lg transition-all duration-300"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: 0.3 + delay }}
    whileHover={{ y: -5, scale: 1.02 }}
  >
    <div className="flex items-center gap-3 sm:gap-4">
      <div className="relative">
        <div
          className={`size-10 sm:size-12 flex items-center justify-center bg-gradient-to-br ${categoryColor} rounded-lg shadow-md`}
        >
          <FontAwesomeIcon
            icon={["fab", skill.icon]}
            className="text-white text-base sm:text-xl"
          />
        </div>
        <div className="absolute -top-2 -right-2 bg-white dark:bg-gray-800 shadow-md text-xs font-semibold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg">
          <span
            className={`bg-gradient-to-r ${categoryColor} bg-clip-text text-transparent`}
          >
            {skill.proficiency}%
          </span>
        </div>
      </div>
      <div>
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
          {skill.name}
        </h3>
        {/* Optional: Add skill description or experience years */}
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5 sm:mt-1">
          {skill.experience} {skill.experience === 1 ? "year" : "years"}
        </p>
      </div>
    </div>

    {/* Progress bar */}
    <div className="mt-2 sm:mt-3 h-1.5 w-full bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${skill.proficiency}%` }}
        transition={{ duration: 1, delay: 0.8 + delay }}
        className={`h-full bg-gradient-to-r ${categoryColor}`}
      />
    </div>
  </motion.div>
);

export default Skills;
