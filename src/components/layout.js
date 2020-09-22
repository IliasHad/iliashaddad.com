import PropTypes from "prop-types";
import React from "react";
import Header from "../components/header";
import ThemeContext from "../context/ThemeContext";
import { Footer } from "./footer";
import { Contact } from "./contact";

function Layout({ children }) {
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <div
          className={theme.darkMode ? "text-white  bg-black  dark-theme" : ""}
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
