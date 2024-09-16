import React from "react";
import {
  FaCode,
  FaReact,
  FaNodeJs,
  FaPython,
  FaJava,
  FaLaravel,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiFlutter,
  SiTypescript,
  SiCss3,
  SiHtml5,
  SiTailwindcss,
} from "react-icons/si";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
// import RadialSeparators from "./RadialSeperator";

const Skills = () => {
  const technicalSkills = [
    {
      name: "JavaScript",
      level: 90,
      icon: <FaCode />,
    },
    {
      name: "React",
      level: 90,
      icon: <FaReact />,
    },
    {
      name: "React-native",
      level: 80,
      icon: <FaReact />,
    },
    {
      name: "Next.js",
      level: 80,
      icon: <SiNextdotjs />,
    },
    {
      name: "Flutter",
      level: 80,
      icon: <SiFlutter />,
    },
    {
      name: "Node.js",
      level: 60,
      icon: <FaNodeJs />,
    },
    {
      name: "TypeScript",
      level: 60,
      icon: <SiTypescript />,
    },
    {
      name: "CSS",
      level: 90,
      icon: <SiCss3 />,
    },
    {
      name: "HTML",
      level: 90,
      icon: <SiHtml5 />,
    },
    {
      name: "TailwindCSS",
      level: 95,
      icon: <SiTailwindcss />,
    },
    {
      name: "Java",
      level: 65,
      icon: <FaJava />,
    },
    {
      name: "Laravel",
      level: 60,
      icon: <FaLaravel />,
    },
  ];

  const professionalSkills = [
    {
      name: "Communication",
      level: 85,
    },
    {
      name: "Teamwork",
      level: 90,
    },
    {
      name: "Problem Solving",
      level: 80,
    },
    {
      name: "Project Management",
      level: 75,
    },
  ];

  return (
    <section id="skills" className="  w-full py-24  bg-background_primary">
      <div className="max-w-screen-xl mx-auto px-8">
        <h1 className="text-5xl font-bold text-heading text-center mb-16">
          My Skills
        </h1>
        <h2 className="text-3xl font-bold text-sub_heading mb-8">
          Technical Skills
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
          {technicalSkills.map((skill, index) => (
            <div
              key={index}
              className="bg-background_secondary p-1 sm:p-3 md:p-5 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-row gap-x-2"
            >
              <div className="text-xl sm:text-3xl md:text-4xl text-text_tertiary self-center">
                {skill.icon}
              </div>
              <div className="relative w-full">
                <div className="flex items-center justify-between mb-2 gap-x-1 sm:gap-x-4">
                  <h2 className="text-xs sm:text-xl flex-1 font-semibold text-text_secondary">
                    {skill.name}
                  </h2>
                  <div className="text-xs font-semibold inline-block py-1 px-1 sm:px-2 uppercase rounded-full text-text_tertiary bg-background_primary bg-opacity-10">
                    {skill.level}%
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-2 text-xs flex rounded bg-gray-200">
                  <div
                    style={{ width: `${skill.level}%` }}
                    className="shadow-none bg-blue-600"
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-3xl font-bold text-sub_heading mb-8">
          Professional Skills
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
          {professionalSkills.map((skill, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-background_secondary p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="w-32 h-32 mb-6">
                {/* TODO - CircularProgressbar with separator  */}
                <CircularProgressbarWithChildren
                  value={skill.level}
                  minValue={0}
                  maxValue={100}
                  text={`${skill.level}%`}
                  styles={buildStyles({})}
                ></CircularProgressbarWithChildren>
              </div>
              <h2 className="text-xl font-semibold text-text_secondary">
                {skill.name}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
