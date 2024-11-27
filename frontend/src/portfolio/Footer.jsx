import { motion } from "framer-motion";
import { FaDribbble, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const referenceIcons = [
    {
      href: "https://github.com/amde-asme-prog",
      label: "GitHub",
      icon: <FaGithub size={24} />,
    },
    {
      href: "https://www.linkedin.com/in/amdebirhan-asmamaw",
      label: "LinkedIn",
      icon: <FaLinkedin size={24} />,
    },
    {
      href: "https://twitter.com/amdebirhanasmamaw",
      label: "Twitter",
      icon: <FaTwitter size={24} />,
    },
    {
      href: "https://dribbble.com/amdebirhanasmamaw",
      label: "Dribbble",
      icon: <FaDribbble size={24} />,
    },
  ];

  const quote = "Building bridges between ideas and code, one line at a time.";

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-300 py-6 px-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left Section */}
        <p className="text-sm text-center md:text-left">
          &copy; {new Date().getFullYear()} Amdebirhan Asmamaw. All rights
          reserved.
        </p>

        {/* Icon Section */}
        <div className="flex items-center justify-center gap-6 text-lg">
          {referenceIcons.map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              aria-label={item.label}
              whileHover={{ scale: 1.2, rotate: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="text-gray-400 hover:text-blue-500 transition-colors duration-300"
            >
              {item.icon}
            </motion.a>
          ))}
        </div>
      </div>

      {/* Quote Section */}
      <div className="mt-8 text-center border-t border-gray-700 pt-4">
        <motion.p
          className="text-gray-400 italic text-sm md:text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {quote}
        </motion.p>
      </div>
    </footer>
  );
};

export default Footer;
