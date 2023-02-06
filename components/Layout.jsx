import PropTypes from "prop-types";
import React from "react";
import Header from "./Header";
import ThemeContext from "../context/ThemeContext";
import { Footer } from "./Footer";
import { Contact } from "./Contact";

export function Layout({ children }) {
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <div
          className={
            theme.darkMode ? "text-white  bg-black  dark-theme" : "light-theme"
          }
        >
          <Header />

          <div className="flex flex-col min-h-screen font-sans ">
            <main>{children}</main>
          </div>
          <Contact />
          <Footer />
        </div>
      )}
    </ThemeContext.Consumer>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
