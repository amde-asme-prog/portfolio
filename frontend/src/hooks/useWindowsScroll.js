import { useEffect, useState } from "react";

export default function useWindowScroll() {
  const [activeLink, setActiveLink] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const handleScroll = () => {
    setShowMenu(false);

    const scrollPosition = window.scrollY + window.innerHeight / 2;

    const sections = document.querySelectorAll("section");

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        setActiveLink(section.id);
      }
    });
  };

  useEffect(() => {
    //! Adding scroll event listener
    window.addEventListener("scroll", handleScroll);
    //! Cleaning up the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { activeLink, setActiveLink, showMenu, setShowMenu };
}
