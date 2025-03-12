/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, AnimatePresence } from "framer-motion";
import {
  useDownloadCv,
  useLandingContent,
} from "../../hooks/landingContentQuery";
import { Fragment, useEffect, useState, useRef } from "react";
import { TypeAnimation } from "react-type-animation";
import { ErrorMessage } from "../reusables/ErrorResponses";
import LandingSkeleton from "../loadingPlaceholder/landingSkeleton";

const Home = () => {
  const {
    data: contentData,
    isLoading: isContentLoading,
    error: contentError,
  } = useLandingContent();

  const { mutate: downloadCv, isLoading } = useDownloadCv();
  const [introText, setIntroText] = useState({
    introduction: "",
    name: "",
  });
  const [typewriterTexts, setTypewriterTexts] = useState([]);
  const [referenceIcons, setReferenceIcons] = useState([]);
  const [image, setImage] = useState(null);
  const [cv, setCv] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (contentData) {
      setIntroText({
        name: contentData.name || "",
        introduction: contentData.introduction || "",
      });
      setTypewriterTexts(
        contentData.typewriter_texts &&
          (Array.isArray(contentData.typewriter_texts)
            ? contentData.typewriter_texts
            : JSON.parse(contentData.typewriter_texts) || [])
      );
      setReferenceIcons(
        contentData.reference_icons &&
          (Array.isArray(contentData.reference_icons)
            ? contentData.reference_icons
            : JSON.parse(contentData.reference_icons) || [])
      );
      setImage(
        `${
          import.meta.env.VITE_SUPABASE_URL
        }/storage/v1/object/public/portfolio_files/${contentData.image_path}`
      );
      setCv(contentData.cv_path || null);
    }
  }, [contentData]);

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const scrollY = window.scrollY;
      const section = sectionRef.current;
      const parallaxElements = section.querySelectorAll(".parallax");

      parallaxElements.forEach((el, index) => {
        const speed = index % 2 === 0 ? 0.05 : 0.08;
        el.style.transform = `translateY(${scrollY * speed}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Show skeleton loading instead of spinner
  if (isContentLoading) {
    return <LandingSkeleton />;
  } else if (contentError) {
    return <LandingSkeleton />;
  }

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col lg:flex-row w-full pt-20 md:pt-24 pb-16 md:pb-20 overflow-hidden bg-gradient-to-b from-gray-50 via-gray-50 to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-950"
    >
      {/* Animated particles */}
      <ParticleBackground />

      <div className="relative container mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-x-24 lg:gap-0 z-10">
        <motion.div
          className="flex flex-col gap-8 md:gap-12 w-full lg:w-3/5 mt-4 md:mt-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="space-y-2 md:space-y-2 pt-8">
            {/* Typewriter with enhanced styling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="h-10 md:h-16"
            >
              <TypeWriter typewriterTexts={typewriterTexts} />
            </motion.div>

            {/* intro text with Name with highlight */}
            <motion.div
              className="relative text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Hello I&apos;m{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-blue-600 dark:text-blue-400 font-roboto">
                  {introText.name}
                </span>
              </span>
            </motion.div>

            <motion.div className="text-gray-600 dark:text-gray-400 text-base md:text-lg lg:text-xl font-serif">
              <p className="font-mono">{introText.introduction}</p>
            </motion.div>
          </div>

          {/* Social icons with enhanced animations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="py-2"
          >
            <SocialIcons referenceIcons={referenceIcons} />
          </motion.div>

          {/* Action buttons with improved styling */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <ActionButtons
              cv={cv}
              downloadCv={downloadCv}
              isLoading={isLoading}
            />
          </motion.div>
        </motion.div>

        {/* Image container with enhanced effects */}
        <motion.div
          className="relative w-full lg:w-2/5 mt-8 lg:mt-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: imageLoaded ? 1 : 0,
            scale: imageLoaded ? 1 : 0.8,
          }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl bg-gray-100 dark:bg-gray-800 transform perspective-1000">
            {/* Shimmer effect while loading */}
            <AnimatePresence>
              {!imageLoaded && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              className="relative overflow-hidden"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <img
                src={image}
                alt="Developer portrait"
                className="w-full h-auto object-cover transition-transform duration-700"
                onLoad={() => setImageLoaded(true)}
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/800x600?text=Developer+Image";
                  setImageLoaded(true);
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Decorative floating elements */}
      <div className="hidden lg:block">
        <motion.div
          className="absolute top-40 left-20 w-8 h-8 bg-blue-500/30 dark:bg-blue-500/20 rounded-full parallax"
          animate={{
            y: [0, -15, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />

        <motion.div
          className="absolute bottom-40 right-60 w-6 h-6 bg-purple-500/30 dark:bg-purple-500/20 rounded-full parallax"
          animate={{
            y: [0, -10, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "mirror",
            delay: 1,
          }}
        />

        <motion.div
          className="absolute top-1/4 right-1/4 w-4 h-4 bg-yellow-500/30 dark:bg-yellow-500/20 rounded-full parallax"
          animate={{
            y: [0, -8, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatType: "mirror",
            delay: 0.5,
          }}
        />

        {/* Additional floating elements */}
        <motion.div
          className="absolute top-2/3 left-1/3 w-5 h-5 bg-green-500/30 dark:bg-green-500/20 rounded-full parallax"
          animate={{
            y: [0, -12, 0],
            x: [0, 8, 0],
            opacity: [0.5, 0.9, 0.5],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "mirror",
            delay: 2,
          }}
        />

        <motion.div
          className="absolute bottom-1/4 left-1/5 w-3 h-3 bg-red-500/30 dark:bg-red-500/20 rounded-full parallax"
          animate={{
            y: [0, -6, 0],
            x: [0, -4, 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            repeatType: "mirror",
            delay: 1.5,
          }}
        />
      </div>
    </section>
  );
};

// New Particle Background Component
const ParticleBackground = () => {
  const particleCount = 20;
  const particles = Array.from({ length: particleCount });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, index) => {
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 20 + 10;
        const initialX = Math.random() * 100;
        const initialY = Math.random() * 100;

        return (
          <motion.div
            key={index}
            className="absolute rounded-full bg-blue-400/30 dark:bg-blue-400/20"
            style={{
              width: size,
              height: size,
              left: `${initialX}%`,
              top: `${initialY}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay: Math.random() * 20,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
};

const ActionButtons = ({ downloadCv, isLoading }) => (
  <div className="flex flex-row  gap-4 sm:gap-6 max-w-md">
    <motion.button
      disabled={isLoading}
      onClick={() => downloadCv()}
      className="group relative inline-flex items-center justify-center 
      px-6 sm:px-8 py-3 text-base sm:text-lg font-medium
      text-gray-900 dark:text-white overflow-hidden rounded-xl
      border-2 border-blue-500 transition-all duration-300
      transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/25
      disabled:opacity-70 disabled:cursor-not-allowed"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span
        className="absolute inset-0 w-full h-full bg-gradient-to-r 
      from-blue-600 to-blue-500 transform translate-x-full 
      group-hover:translate-x-0 transition-transform duration-300"
      />
      <span className="relative flex items-center justify-center gap-3 w-full text-gray-900 dark:text-white group-hover:text-white transition-colors duration-300">
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Downloading...
          </>
        ) : (
          <>
            Download CV
            <FontAwesomeIcon icon={["fas", "download"]} className="text-lg" />
          </>
        )}
      </span>
    </motion.button>

    <motion.a
      href="#contact"
      className="inline-flex items-center justify-center 
      px-6 sm:px-8 py-3 text-base sm:text-lg font-medium text-white
      bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl
      hover:from-blue-500 hover:to-blue-400 
      transform hover:-translate-y-1 transition-all duration-300
      shadow-lg hover:shadow-xl hover:shadow-blue-500/25"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="flex items-center justify-center gap-3 w-full">
        Hire Me
        <FontAwesomeIcon icon={["fas", "handshake"]} className="text-lg" />
      </span>
    </motion.a>
  </div>
);

const SocialIcons = ({ referenceIcons }) => {
  return (
    <div className="flex items-center gap-5 sm:gap-6">
      {referenceIcons &&
        referenceIcons.map((item, index) => (
          <Fragment key={index}>
            <motion.a
              href={item.href}
              target="_blank"
              rel="noreferrer"
              aria-label={item.label}
              className="relative group"
              whileHover={{ scale: 1.15, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.span
                className="absolute -inset-2 rounded-full bg-blue-400/10 dark:bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={{ scale: [0.9, 1.1, 0.9] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <FontAwesomeIcon
                icon={["fab", item.icon]}
                className="text-2xl sm:text-3xl md:text-4xl text-blue-500 dark:text-blue-400 hover:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300 relative z-10"
              />
            </motion.a>
          </Fragment>
        ))}
    </div>
  );
};

const TypeWriter = ({ typewriterTexts }) => {
  if (!typewriterTexts?.length) return null;

  return (
    <div className="relative inline-block">
      <div className="absolute -inset-1 bg-red-500/10 dark:bg-red-400/10 rounded-lg blur-md" />
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <TypeAnimation
          sequence={typewriterTexts.flatMap((text) => [text, 2000])}
          wrapper="span"
          speed={70}
          repeat={Infinity}
          className="relative block text-2xl md:text-3xl lg:text-4xl font-roboto text-red-500 dark:text-red-400 font-bold"
        />
      </motion.div>

      {/* Typing cursor effect */}
      <motion.div
        className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0.5 h-6 md:h-8 lg:h-10 bg-red-500 dark:bg-red-400 ml-1"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
    </div>
  );
};

// Add custom CSS to your global styles
const globalStyles = `
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

.bg-grid-pattern {
  background-image: 
    linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
  background-size: 20px 20px;
}

.perspective-1000 {
  perspective: 1000px;
}

@media (prefers-reduced-motion) {
  .parallax {
    transform: none !important;
  }
}
`;

export default Home;
