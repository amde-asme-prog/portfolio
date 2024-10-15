import { motion } from "framer-motion";
import {
  FaDownload,
  FaDribbble,
  FaGithub,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
import { RiShakeHandsLine } from "react-icons/ri";
import { Fragment } from "react";

const Home = () => {
  const referenceIcons = [
    {
      href: "https://github.com/amde-asme-prog",
      label: "GitHub",
      icon: <FaGithub />,
    },
    {
      href: "https://www.linkedin.com/in/amdebirhan-asmamaw",
      label: "LinkedIn",
      icon: <FaLinkedin />,
    },
    {
      href: "https://twitter.com/amdebirhanasmamaw",
      label: "Twitter",
      icon: <FaTwitter />,
    },
    {
      href: "https://dribbble.com/amdebirhanasmamaw",
      label: "Dribbble",
      icon: <FaDribbble />,
    },
  ];

  return (
    <section
      id="home"
      className="flex flex-col lg:flex-row w-full pt-28 bg-gradient-to-r from-background_container to-background_card_accent pb-20"
    >
      <motion.div
        className="flex flex-col gap-y-6 w-full lg:w-2/3
         px-3 sm:px-4 md:px-8 lg:px-10 py-5 lg:py-6 overflow-visible"
        initial={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, scale: 1 }}
      >
        <div className="flex flex-col gap-y-8">
          <div className="text-6xl max-sm:text-3xl max-md:text-4xl font-extrabold text-text_primary">
            Hello,
          </div>
          <div className="text-6xl max-sm:text-3xl max-md:text-4xl font-bold text-text_primary">
            This is{" "}
            <span className="text-blue-500 font-roboto font-bold">
              Amdebirhan,
            </span>{" "}
            I’m
          </div>
          <TypeWriter />
        </div>
        <div className="relative flex flex-row items-center justify-left text-center gap-x-2 text-3xl sm:text-4xl md:text-5xl">
          {referenceIcons.map((item, index) => (
            <Fragment key={index}>
              {index > 0 && <div className="h-px w-4 bg-gray-500"></div>}
              <motion.a
                key={index}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                whileHover={{ scale: 1.15, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-blue-800 hover:text-blue-600"
              >
                {item.icon}
              </motion.a>
            </Fragment>
          ))}
        </div>
        <div className="flex flex-row justify-start gap-x-4 max-md:justify-center max-md:w-full items-center pt-4">
          <motion.a
            href="/assets/amdebirhan_asmamaw-cv.pdf"
            download="amdebirhan asmamaw cv.pdf"
            className="flex flex-row items-center gap-3 uppercase text-blue-800 bg-background_card text-lg rounded-xl border-border_primary border-2 px-5 py-3 shadow-md hover:shadow-md hover:shadow-blue-300"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            resume
            <FaDownload className="inline-flex text-sm sm:text-base lg:text-lg" />
          </motion.a>
          <motion.a
            href="#contact"
            className="uppercase rounded-xl bg-blue-600 text-white px-5 py-3 flex flex-row items-center gap-3 text-lg border-2 border-border_primary hover:shadow-md hover:shadow-blue-300"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            hire me
            <RiShakeHandsLine
              size={24}
              className="inline-flex text-sm sm:text-base lg:text-lg"
            />
          </motion.a>
        </div>
      </motion.div>
      <motion.div
        className="flex w-full lg:w-1/2 items-center justify-center bg-contain overflow-hidden"
        initial={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, scale: 1 }}
      >
        <img
          src="/assets/undraw_programming.svg"
          alt="coding"
          className="max-w-full h-auto"
        />
      </motion.div>
    </section>
  );
};

export default Home;

const TypeWriter = () => {
  return (
    <TypeAnimation
      sequence={[
        "A Full Stack Developer",
        2000,
        "Mobile App Developer",
        2000,
        "A Software Developer",
        2000,
      ]}
      wrapper="span"
      speed={50}
      repeat={Infinity}
      className="text-6xl font-roboto font-bold max-sm:text-3xl max-md:text-4xl text-red-500 mb-3"
    />
  );
};
