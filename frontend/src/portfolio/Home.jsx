import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useDownloadCv, useLandingContent } from "../hooks/landingContentQuery";
import { Fragment, useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";

import {
  ErrorMessage,
  LoadingSpinner,
  OfflineMessage,
} from "./reusables/ErrorResponses";

const Home = () => {
  const { data: content, isLoading, error, fetchStatus } = useLandingContent();
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
    if (content) {
      setIntroText({
        greeting: content.greeting || "",
        introduction: content.introduction || "",
        name: content.name || "",
        additional_text: content.additional_text || "",
      });
      setTypewriterTexts(JSON.parse(content.typewriter_texts) || []);
      setReferenceIcons(JSON.parse(content.reference_icons) || []);
      setImage(content.image_path || null);
      setCv(content.cv_path || null);
    }
  }, [content]);

  if (isLoading) return <LoadingSpinner />;
  if (fetchStatus === "paused") return <OfflineMessage />;
  if (error) return <ErrorMessage status={error.response?.status} />;

  return (
    <section
      id="home"
      className=" flex flex-col lg:flex-row w-full pt-28  bg-stone-800 pb-20 mb-5"
    >
      <motion.div
        className="flex flex-col gap-y-6 w-full lg:w-2/3 px-3 sm:px-4 md:px-8 lg:px-10 py-5 lg:py-6 overflow-visible"
        initial={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, scale: 1 }}
      >
        <div className="flex flex-col gap-y-8">
          <div className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-stone-300">
            {introText.greeting},
          </div>
          <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-stone-300">
            {introText.introduction}{" "}
            <span className="text-blue-600 dark:text-blue-400 font-roboto font-bold">
              {introText.name},
            </span>{" "}
            {introText.additional_text}
          </div>
          <TypeWriter typewriterTexts={typewriterTexts} />
        </div>
        <SocialIcons referenceIcons={referenceIcons} />
        <ActionButtons cv={cv} downloadCv={downloadCv} />
      </motion.div>
      <motion.div
        className="flex w-full lg:w-1/2 items-center justify-center  overflow-hidden"
        initial={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, scale: 1 }}
      >
        <img src={image} alt="coding" className="max-w-full h-auto" />
      </motion.div>
    </section>
  );
};

const ActionButtons = ({ cv, downloadCv }) => (
  <div className="flex flex-row justify-start gap-x-4 max-md:justify-center max-md:w-full items-center pt-6">
    <motion.a
      href={cv}
      download="amdebirhan asmamaw cv.pdf"
      onClick={downloadCv}
      target="_blank"
      className="flex flex-row items-center gap-3 uppercase text-stone-900  bg-gray-300 text-lg rounded-xl px-5 py-3 shadow-md hover:shadow-blue-300"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      Resume
      <FontAwesomeIcon
        icon={["fas", "download"]}
        className="inline-flex text-sm sm:text-base lg:text-lg"
      />
    </motion.a>
    <motion.a
      href="#contact"
      className="uppercase rounded-xl text-lg px-5 py-3 bg-blue-500 text-stone-200 flex gap-4 items-center "
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      Hire Me
      <FontAwesomeIcon
        icon={["fas", "handshake"]}
        size="lg"
        className="inline-flex text-sm sm:text-base lg:text-lg"
      />
    </motion.a>
  </div>
);

const SocialIcons = ({ referenceIcons }) => (
  <div className="relative flex flex-row items-center justify-left text-center gap-x-2 text-3xl sm:text-4xl md:text-5xl">
    {referenceIcons.map((item, index) => (
      <Fragment key={index}>
        {index > 0 && (
          <div className="h-px w-4 bg-gray-400 dark:bg-gray-600"></div>
        )}
        <motion.a
          href={item.href}
          target="_blank"
          rel="noreferrer"
          aria-label={item.label}
          whileHover={{ scale: 1.15, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
        >
          <FontAwesomeIcon icon={["fab", item.icon]} />
        </motion.a>
      </Fragment>
    ))}
  </div>
);

const TypeWriter = ({ typewriterTexts }) => {
  if (!typewriterTexts?.length) return null;

  return (
    <TypeAnimation
      sequence={typewriterTexts.flatMap((text) => [text, 2000])}
      wrapper="span"
      speed={70}
      repeat={Infinity}
      className="text-3xl md:text-4xl lg:text-5xl font-roboto text-red-700 font-bold mb-3"
    />
  );
};

export default Home;
