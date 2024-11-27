import Footer from "./portfolio/Footer";
import Home from "./portfolio/Home";
import Contact from "./portfolio/Contact";
import Services from "./portfolio/Services";
import Projects from "./portfolio/Projects";
import About from "./portfolio/About";
import Skills from "./portfolio/Skills";
import Header from "./portfolio/Header";
import { Toaster } from "sonner";

const Portfolio = () => {
  return (
    <div className="h-full scroll-smooth bg-white dark:bg-black transition-all duration-700 ">
      <Toaster position="top-center" invert richColors />

      <Header />
      <main className="flex flex-col justify-center items-center w-full transition-colors duration-300">
        <Home />
        <About />
        <Skills />
        <Projects />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};
export default Portfolio;
