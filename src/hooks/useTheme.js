import { useEffect, useState } from "react";

const useTheme = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("color-theme") === "dark"
  );

  //! toggling the dark mode
  const toggleDarkMode = () => {
    if (!darkMode) {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
      localStorage.setItem("color-theme", "dark");
      setDarkMode(true);
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
      setDarkMode(false);
    }
  };

  //! when the app mounts, checking if the user has a color-theme stored in local storage
  useEffect(() => {
    if (localStorage.getItem("color-theme")) {
      //! checking if the user has a color-theme of light
      if (localStorage.getItem("color-theme") === "light") {
        if (document.body.classList.contains("dark")) {
          document.body.classList.remove("dark");
        }
        document.body.classList.add("light");
        setDarkMode(false);
      } else if (localStorage.getItem("color-theme") === "dark") {
        //! checking if the user has a color-theme of dark
        if (document.body.classList.contains("light")) {
          document.body.classList.remove("light");
        }
        document.body.classList.add("dark");
        setDarkMode(true);
      }
    }
  }, []);

  return { darkMode, toggleDarkMode };
};
export default useTheme;
