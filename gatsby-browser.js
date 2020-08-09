import "./src/css/style.css";
import PropTypes from "prop-types";
import { MDXProvider } from "@mdx-js/react";
import { components } from "./src/layouts/post-layout";
import React from "react";

import { ThemeProvider } from "./src/context/ThemeContext";

export const wrapRootElement = ({ element }) => (
  <MDXProvider components={components}>
    <ThemeProvider>{element}</ThemeProvider>
  </MDXProvider>
);

wrapRootElement.propTypes = {
  element: PropTypes.node.isRequired,
};
