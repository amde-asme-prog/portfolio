import { Toaster } from "sonner";
import Header from "./sections/Header";
import Home from "./sections/Home";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Services from "./sections/Services";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import { useProjectsQuery } from "../hooks/projectsQuery";
import { useServicesQuery } from "../hooks/servicesQuery";
import { useEffect, useState } from "react";
import { ErrorMessage, LoadingSpinner } from "./reusables/ErrorResponses";
import { useLandingContent } from "../hooks/landingContentQuery";

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);

  const {
    data: contentData,
    isLoading: isContentLoading,
    error: contentError,
  } = useLandingContent();

  // if (
  //   isServicesLoading ||
  //
  //   isProjectLoading
  // )
  //   return <LoadingSpinner />;
  //
  //
  //
  return (
    <div className="h-full scroll-smooth bg-white dark:bg-black transition-all duration-700 ">
      <Toaster position="top-center" invert richColors />

      <Header />
      {/* <main className="flex flex-col justify-center items-center w-full transition-colors duration-300"> */}
      <Home />
      <About />
      <Skills />
      <Projects />
      <Services />
      <Contact />
      {/* </main> */}
      <Footer referenceIcons={contentData?.reference_icons} />
    </div>
  );
};

export default Portfolio;
