/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { useAboutQuery } from "../../hooks/aboutQuery";
import AboutSkeleton from "../loadingPlaceholder/aboutSkeleton";
import { useServicesQuery } from "../../hooks/servicesQuery";

library.add(fab, fas);

const About = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("about");
  const ref = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const {
    data: aboutData,
    isLoading: isAboutLoading,
    error: aboutError,
  } = useAboutQuery();

  const {
    data: services,
    isLoading: isServicesLoading,
    error: servicesError,
  } = useServicesQuery();

  if (isAboutLoading) {
    return <AboutSkeleton />;
  } else if (aboutError) {
    return <AboutSkeleton />;
  }

  const tabs = [
    { id: "about", label: "About Me", icon: "user" },
    { id: "skills", label: "Skills", icon: "code" },
    { id: "services", label: "Services", icon: "cogs" },
    { id: "journey", label: "Journey", icon: "road" },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="relative px-4 sm:px-8 md:px-12 min-h-screen w-full py-24 overflow-hidden bg-gradient-to-b from-gray-50 via-gray-100 to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-950"
    >
      {/* Interactive 3D particles background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0 opacity-20 dark:opacity-30"
          style={{ y: backgroundY }}
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
            />
          ))}
        </motion.div>
      </div>

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <div className="container mx-auto max-w-7xl">
        <motion.div ref={sectionRef} className="text-center mb-16">
          <motion.span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-600 dark:text-blue-400 font-medium text-sm tracking-wide mb-4 shadow-sm backdrop-blur-md border border-blue-100/20 dark:border-blue-800/20">
            <span className="flex items-center justify-center w-6 h-6 bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-500 dark:to-blue-400 rounded-full text-white text-xs mr-2 shadow-inner">
              <FontAwesomeIcon icon="user" className="w-3 h-3" />
            </span>
            Discover My Story
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400"
          >
            About Me
          </motion.h2>

          <motion.p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            {aboutData?.short_bio ||
              "Get to know who I am, what drives me, and the passions that fuel my work."}
          </motion.p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Profile Image Section */}
          <motion.div className="lg:w-2/5 flex justify-center items-start lg:sticky lg:top-24">
            <div className="relative group">
              {/* Image frame with animated gradient border */}
              <div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-2xl overflow-hidden shadow-2xl transform hover:rotate-1 transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-x transform transition-transform duration-1000 group-hover:scale-105"></div>

                <div className="absolute inset-0 bg-white dark:bg-gray-800 m-[3px] rounded-2xl overflow-hidden">
                  {!isImageLoaded && (
                    <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
                      <FontAwesomeIcon
                        icon="user"
                        className="text-4xl text-gray-400 dark:text-gray-500"
                      />
                    </div>
                  )}

                  <img
                    src={`${
                      import.meta.env.VITE_SUPABASE_URL
                    }/storage/v1/object/public/portfolio_files/${
                      aboutData?.image_path
                    }`}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                      isImageLoaded ? "opacity-100" : "opacity-0"
                    } group-hover:scale-105`}
                    alt="Amdebirhan Asmamaw"
                    onLoad={() => setIsImageLoaded(true)}
                  />
                </div>

                {/* Hover overlay with bio info */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                    <h2 className="text-2xl font-bold mb-2">
                      {aboutData?.name || "Amdebirhan Asmamaw"}
                    </h2>
                    <p className="text-sm text-gray-200 line-clamp-4">
                      {aboutData?.about_me ||
                        "I'm a passionate developer dedicated to creating beautiful and functional web experiences."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-5 -left-5 w-28 h-28 border-t-4 border-l-4 border-blue-500 rounded-tl-3xl transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"></div>
              <div className="absolute -bottom-5 -right-5 w-28 h-28 border-b-4 border-r-4 border-pink-500 rounded-br-3xl transform group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300"></div>

              {/* Stats/highlights - with hover animations */}
              <motion.div
                className="absolute -right-20 top-1/4 transform rotate-6"
                whileHover={{ rotate: 0, scale: 1.05 }}
              >
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 text-center w-36 backdrop-blur-sm border border-gray-100 dark:border-gray-700">
                  <span className="block text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">
                    5+
                  </span>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    Years Experience
                  </span>
                </div>
              </motion.div>

              <motion.div
                className="absolute -left-20 bottom-1/4 transform -rotate-6"
                whileHover={{ rotate: 0, scale: 1.05 }}
              >
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 text-center w-36 backdrop-blur-sm border border-gray-100 dark:border-gray-700">
                  <span className="block text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400">
                    50+
                  </span>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    Projects Completed
                  </span>
                </div>
              </motion.div>

              {/* New badge */}
              <motion.div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full px-5 py-2 text-sm font-medium shadow-lg border border-amber-400/20 flex items-center space-x-1">
                  <FontAwesomeIcon icon="trophy" className="mr-1" />
                  <span>Top-Rated Developer</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div className="lg:w-3/5">
            {/* Tabs Navigation */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm"
                  }`}
                >
                  <FontAwesomeIcon icon={tab.icon} />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content Display */}
            <div className="relative min-h-[400px]">
              {activeTab === "about" && <AboutContent aboutData={aboutData} />}
              {activeTab === "skills" && <SkillsContent />}
              {activeTab === "services" && (
                <ServicesContent services={services} />
              )}
              {activeTab === "journey" && <JourneyContent />}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const AboutContent = ({ aboutData }) => {
  return (
    <motion.div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 backdrop-blur-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden">
      {/* Background decorative element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-500 to-purple-600 opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>

      <div className="relative">
        <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
          Who I Am
        </h3>

        <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>
            I'm a dedicated software developer with expertise in building modern
            web applications using React.js and Next.js. My skill set includes
            crafting responsive and scalable front-end designs with Tailwind CSS
            and developing robust back-end systems with Laravel.
          </p>

          <p>
            I also have a keen eye for design, using Figma to create intuitive
            and user-friendly interfaces that bring ideas to life. As a
            certified React Native developer, I develop cross-platform mobile
            applications that meet the current world market demands.
          </p>

          <div className="flex flex-wrap gap-3 mt-6">
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-medium">
              React.js
            </span>
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-medium">
              Next.js
            </span>
            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-xs font-medium">
              Tailwind CSS
            </span>
            <span className="px-3 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-full text-xs font-medium">
              Laravel
            </span>
            <span className="px-3 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 rounded-full text-xs font-medium">
              React Native
            </span>
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 italic mb-4">
            Want to know more about my approach and philosophy?
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:shadow-lg transition-all hover:scale-105 transform"
            >
              <FontAwesomeIcon icon="paper-plane" />
              Let's Connect
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-600 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
            >
              <FontAwesomeIcon icon="eye" />
              View Portfolio
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const SkillsContent = () => {
  const skills = [
    { name: "React.js", level: 90, color: "from-blue-500 to-cyan-500" },
    { name: "Next.js", level: 85, color: "from-gray-700 to-gray-900" },
    { name: "Tailwind CSS", level: 95, color: "from-cyan-500 to-blue-500" },
    { name: "Laravel", level: 80, color: "from-red-500 to-pink-500" },
    { name: "React Native", level: 85, color: "from-blue-500 to-indigo-500" },
    { name: "JavaScript", level: 90, color: "from-yellow-400 to-yellow-600" },
    { name: "TypeScript", level: 85, color: "from-blue-600 to-blue-800" },
    { name: "UI/UX Design", level: 75, color: "from-purple-500 to-pink-500" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 backdrop-blur-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-purple-500 to-pink-600 opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>

      <div className="relative">
        <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600">
          Technical Skills
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="relative"
            >
              <div className="flex justify-between mb-1">
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {skill.name}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {skill.level}%
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
          <h4 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
            Continuous Learning
          </h4>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            I'm constantly expanding my skill set. Currently learning advanced
            state management patterns and WebGL for immersive web experiences.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const ServicesContent = ({ services }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 backdrop-blur-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-500 to-green-500 opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>

      <div className="relative">
        <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500">
          Services I Offer
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {services &&
            services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}

          {(!services || services.length === 0) && (
            <div className="text-center p-8">
              <FontAwesomeIcon
                icon="spinner"
                spin
                className="text-4xl text-blue-500 mb-4"
              />
              <p className="text-gray-600 dark:text-gray-400">
                Loading services...
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const JourneyContent = () => {
  const timeline = [
    {
      year: "2018",
      title: "Started Coding Journey",
      description:
        "Began learning web development with HTML, CSS, and JavaScript.",
    },
    {
      year: "2019",
      title: "First Professional Role",
      description:
        "Joined a startup as a Junior Frontend Developer working with React.js.",
    },
    {
      year: "2021",
      title: "Fullstack Transition",
      description:
        "Expanded my skills to backend development with Laravel and Node.js.",
    },
    {
      year: "2022",
      title: "React Native Certification",
      description:
        "Became certified in React Native development for mobile applications.",
    },
    {
      year: "2023",
      title: "Lead Developer",
      description:
        "Promoted to Lead Developer, managing projects and mentoring junior developers.",
    },
    {
      year: "Present",
      title: "Freelance & Consulting",
      description:
        "Working on freelance projects while offering technical consulting services.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 backdrop-blur-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-amber-500 to-orange-600 opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>

      <div className="relative">
        <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
          My Professional Journey
        </h3>

        <div className="relative border-l-2 border-blue-500 dark:border-blue-400 ml-3 pl-8 space-y-10">
          {timeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="absolute -left-[41px] w-6 h-6 rounded-full bg-blue-500 dark:bg-blue-400 border-4 border-white dark:border-gray-800 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white"></div>
              </div>
              <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-medium mb-2">
                {item.year}
              </span>
              <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">
                {item.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const ServiceCard = ({ service, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="flex items-start gap-6 p-6 bg-white dark:bg-gray-800/50 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700"
    >
      <div className="w-14 h-14 p-3 flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-600 dark:text-blue-400 rounded-xl shadow-sm">
        <FontAwesomeIcon icon={service.icon} size="lg" />
      </div>
      <div>
        <h3 className="font-sans text-xl font-semibold text-gray-800 dark:text-white mb-2">
          {service.title}
        </h3>
        <p className="font-sans text-gray-600 dark:text-gray-400 leading-relaxed">
          {service.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {service.technologies &&
            service.technologies.map((tech, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs"
              >
                {tech}
              </span>
            ))}
          {!service.technologies && (
            <>
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs">
                React
              </span>
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs">
                Tailwind
              </span>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default About;
