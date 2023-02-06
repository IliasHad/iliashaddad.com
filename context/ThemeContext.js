import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const defaultState = {
  dark: true,
  toggleDark: () => { },
};

const ThemeContext = createContext(defaultState);

// Getting dark mode information from OS!
// You need macOS Mojave + Safari Technology Preview Release 68 to test this currently.
const supportsDarkMode = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches === true;

const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDark = () => {
    let dark = !darkMode;
    localStorage.setItem("dark", JSON.stringify(dark));
    setDarkMode(dark);
  };

  useEffect(() => {
    // Getting dark mode value from localStorage!
    const lsDark = JSON.parse(localStorage.getItem("dark")) || true;

    if (lsDark) {
      setDarkMode(lsDark);
    } else if (supportsDarkMode()) {
      var root = document.getElementsByTagName("html")[0]; // '0' to assign the first (and only `HTML` tag)
      root.setAttribute("class", "dark");
      setDarkMode(lsDark);
    }
  }, []);
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

  }, [darkMode]);
  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        toggleDark: toggleDark,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;

export { ThemeProvider };
ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
