import { Toaster } from "sonner";
import Header from "./sections/Header";
import Home from "./sections/Home";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Services from "./sections/Services";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import { useLandingContent } from "../hooks/landingContentQuery";
import { useSkillsQuery } from "../hooks/skillsQuery";
import { useProjectsQuery } from "../hooks/projectsQuery";
import { useServicesQuery } from "../hooks/servicesQuery";
import { useEffect, useState } from "react";
import { ErrorMessage, LoadingSpinner } from "./reusables/ErrorResponses";

const Portfolio = () => {
  const [content, setContent] = useState({});
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);

  const {
    data: skillsData,
    isLoading: isSkillsLoading,
    error: skillsError,
  } = useSkillsQuery();
  const {
    data: servicesData,
    isLoading: isServicesLoading,
    error: servicesError,
  } = useServicesQuery();

  const {
    data: projectsData,
    isLoading: isProjectLoading,
    error: projectsError,
  } = useProjectsQuery();

  useEffect(() => {
    if (servicesData) {
      setServices(servicesData);
    }

    if (skillsData) {
      setSkills(skillsData);
    }
    if (projectsData) {
      setProjects(projectsData);
    }
  }, [skillsData, projectsData, servicesData]);

  // if (
  //   isServicesLoading ||
  //   isSkillsLoading ||
  //   isProjectLoading
  // )
  //   return <LoadingSpinner />;
  //
  // } else if (skillsError) {
  //   return <ErrorMessage status={skillsError.response?.status} />;
  // } else if (projectsError) {
  //   return <ErrorMessage status={projectsError.response?.status} />;
  // } else if (servicesError) {
  //   return <ErrorMessage status={servicesError.response?.status} />;
  // }

  return (
    <div className="h-full scroll-smooth bg-white dark:bg-black transition-all duration-700 ">
      <Toaster position="top-center" invert richColors />

      <Header />
      {/* <main className="flex flex-col justify-center items-center w-full transition-colors duration-300"> */}
      <Home />
      <About />
      {/* <Skills skills={skills} />
      <Projects projects={projects} />
      <Services services={services} />
      <Contact /> */}
      {/* </main> */}
      {/* <Footer referenceIcons={content?.reference_icons} /> */}
    </div>
  );
};

export default Portfolio;
