import { motion } from "framer-motion";
import { FaDribbble, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const referenceIcons = [
    {
      href: "https://github.com/amde-asme-prog",
      label: "GitHub",
      icon: <FaGithub size={20} />,
    },
    {
      href: "https://www.linkedin.com/in/amdebirhan-asmamaw",
      label: "LinkedIn",
      icon: <FaLinkedin size={20} />,
    },
    {
      href: "https://twitter.com/amdebirhanasmamaw",
      label: "Twitter",
      icon: <FaTwitter size={20} />,
    },
    {
      href: "https://dribbble.com/amdebirhanasmamaw",
      label: "Dribbble",
      icon: <FaDribbble size={20} />,
    },
  ];
  return (
    <footer className="bg-background_header text-text_primary p-4">
      <div className="container mx-auto flex justify-around items-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Amdebirhan Asmamaw. All rights
          reserved.
        </p>
        <div className="relative flex flex-row items-center justify-left text-center gap-x-4 text-3xl sm:text-4xl md:text-5xl">
          {referenceIcons.map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              aria-label={item.label}
              whileHover={{ scale: 1.15, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="text-text_subtle hover:text-blue-600"
            >
              {item.icon}
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
