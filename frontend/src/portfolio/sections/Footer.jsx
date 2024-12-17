import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fab);
const Footer = ({ referenceIcons }) => {
  const quote = "Building bridges between ideas and code, one line at a time.";

  return (
    <footer className="px-12 bg-gradient-to-r from-gray-900 to-gray-800 text-gray-300 py-6 px-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left Section */}
        <p className="text-sm text-center md:text-left">
          &copy; {new Date().getFullYear()} Amdebirhan Asmamaw. All rights
          reserved.
        </p>

        {/* Icon Section */}
        <div className="flex items-center justify-center gap-6 text-lg">
          {referenceIcons &&
            (typeof referenceIcons == "string"
              ? JSON.parse(referenceIcons)
              : referenceIcons
            ).map((item, index) => (
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
                <FontAwesomeIcon icon={["fab", item.icon]} />
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
