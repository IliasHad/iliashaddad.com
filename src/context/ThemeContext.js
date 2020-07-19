import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const defaultState = {
  dark: false,
  toggleDark: () => {},
};

const ThemeContext = createContext(defaultState);

// Getting dark mode information from OS!
// You need macOS Mojave + Safari Technology Preview Release 68 to test this currently.
const supportsDarkMode = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches === true;

const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDark = () => {
    console.log(darkMode);
    let dark = !darkMode;
    localStorage.setItem("dark", JSON.stringify(dark));
    setDarkMode(dark);
  };

  useEffect(() => {
    // Getting dark mode value from localStorage!
    const lsDark = JSON.parse(localStorage.getItem("dark"));

    console.log(lsDark);
    if (lsDark) {
      setDarkMode(false);
    } else if (supportsDarkMode()) {
      setDarkMode(true);
    }
  }, []);

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
