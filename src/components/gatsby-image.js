/* eslint-disable  */
import React from "react";
import Img from "gatsby-image";

export const ImgSharpInline = ({
  parentClassName,
  className,
  fluidImg,
  alt,
}) => (
  <Img
    className={className}
    fluid={fluidImg && JSON.parse(fluidImg)}
    alt={alt}
    placeholderStyle={{ filter: "blur(1.5rem)" }}
  />
);
