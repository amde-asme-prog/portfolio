/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import {
  useDownloadCv,
  useLandingContent,
} from "../../hooks/landingContentQuery";
import { Fragment, useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { ErrorMessage } from "../reusables/ErrorResponses";
import LandingSkeleton from "../loadingPlaceholder/landingSkeleton";

const Home = () => {
  const {
    data: contentData,
    isLoading: isContentLoading,
    error: contentError,
  } = useLandingContent();

  const { refetch: downloadCv } = useDownloadCv();
  const [introText, setIntroText] = useState({
    greeting: "",
    introduction: "",
    name: "",
    additional_text: "",
  });
  const [typewriterTexts, setTypewriterTexts] = useState([]);
  const [referenceIcons, setReferenceIcons] = useState([]);
  const [image, setImage] = useState(null);
  const [cv, setCv] = useState(null);

  useEffect(() => {
    if (contentData) {
      setIntroText({
        greeting: contentData.greeting || "",
        introduction: contentData.introduction || "",
        name: contentData.name || "",
        additional_text: contentData.additional_text || "",
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
      setImage(import.meta.env.VITE_API_URL + contentData.image_path || null);
      setCv(contentData.cv_path || null);
    }
  }, [contentData]);

  // Show skeleton loading instead of spinner
  if (isContentLoading) {
    return <LandingSkeleton />;
  } else if (contentError) {
    return <LandingSkeleton />;

    // return <ErrorMessage status={contentError.response?.status} />;
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col lg:flex-row w-full pt-28 pb-20"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-100 via-white to-gray-200 dark:from-blue-950 dark:via-gray-900 dark:to-stone-950">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-300/10 via-transparent to-purple-300/10 dark:from-blue-500/10" />
        <div className="absolute inset-0 backdrop-blur-[1px]" />
      </div>

      <div className="relative container mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center">
        <motion.div
          className="flex flex-col gap-12 w-full lg:w-2/3 z-10"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="space-y-8">
            <motion.div
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent 
       bg-gradient-to-r from-gray-800 via-gray-600 to-gray-400 dark:from-blue-100 dark:to-blue-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {introText.greeting}
            </motion.div>

            <motion.div
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {introText.introduction}{" "}
              <span className="text-blue-600 dark:text-blue-400 font-roboto">
                {introText.name}
              </span>
              {introText.additional_text}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <TypeWriter typewriterTexts={typewriterTexts} />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <SocialIcons referenceIcons={referenceIcons} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <ActionButtons cv={cv} downloadCv={downloadCv} />
          </motion.div>
        </motion.div>

        <motion.div
          className="relative w-full lg:w-1/2 mt-12 lg:mt-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="relative z-10 overflow-hidden rounded-2xl">
            <img
              src={image}
              alt="coding"
              className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-200/60 via-transparent to-transparent dark:from-gray-900/60" />
          </div>

          {/* Decorative elements */}
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-200/20 to-purple-200/20 blur-xl opacity-40 dark:opacity-50 -z-10" />
        </motion.div>
      </div>
    </section>
  );
};

const ActionButtons = ({ cv, downloadCv }) => (
  <div className="flex  gap-4 sm:gap-6 max-sm:pb-10">
    <motion.a
      href={cv}
      download="amdebirhan_asmamaw_cv.pdf"
      onClick={downloadCv}
      target="_blank"
      className="group relative inline-flex items-center justify-center 
        px-6 sm:px-8 py-3 text-base sm:text-lg font-medium
        text-gray-900 dark:text-white overflow-hidden rounded-xl
        border-2 border-blue-500 hover:text-white transition-colors duration-300
        transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/25"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span
        className="absolute inset-0 w-full h-full bg-gradient-to-r 
        from-blue-600 to-blue-500 transform translate-x-full 
        group-hover:translate-x-0 transition-transform duration-300"
      />
      <span className="relative flex items-center gap-3">
        Download CV
        <FontAwesomeIcon icon={["fas", "download"]} />
      </span>
    </motion.a>

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
      <span className="flex items-center gap-3">
        Hire Me
        <FontAwesomeIcon icon={["fas", "handshake"]} />
      </span>
    </motion.a>
  </div>
);

const SocialIcons = ({ referenceIcons }) => {
  return (
    <div className="flex items-center gap-6">
      {referenceIcons &&
        referenceIcons.map((item, index) => (
          <Fragment key={index}>
            <motion.a
              href={item.href}
              target="_blank"
              rel="noreferrer"
              aria-label={item.label}
              className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
              whileHover={{ scale: 1.15, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <FontAwesomeIcon
                icon={["fab", item.icon]}
                className="text-3xl md:text-4xl"
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
    <TypeAnimation
      sequence={typewriterTexts.flatMap((text) => [text, 2000])}
      wrapper="span"
      speed={70}
      repeat={Infinity}
      className="block text-2xl md:text-3xl lg:text-4xl font-roboto text-red-400 font-bold"
    />
  );
};

export default Home;
