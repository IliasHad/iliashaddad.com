import React from "react";

const paragraph = (props) => (
  <p
    className="my-6"
    style={{
      marginBottom: "0.8125rem",
    }}
    {...props}
  />
);
const h3 = (props) => (
  <h3
    className="my-8 md:text-4xl text-2xl tracking-tighter"
    style={{
      lineHeight: "40px",
    }}
    {...props}
  />
);
const span = (props) => (
  <span
    style={{
      color: "inherit",
      fontWeight: "inherit",
      lineHeight: "inherit",
      fontSize: "inherit",
      textAlign: "inherit",
    }}
    className="my-6"
    {...props}
  />
);

const a = (props) => (
  <a
    style={{
      borderBottom: "1px solid",
      color: "rgb(41, 41, 41)",
    }}
    className="border-b-1 border-black"
    {...props}
  />
);

const li = (props) => (
  <li
    style={{
      listStyleType: "disc",
      marginTop: "0.86em",
    }}
    {...props}
  />
);

const h4 = (props) => (
  <h4
    className="my-8"
    style={{
      fontSize: "26px",
      fontWeight: "600",
    }}
    {...props}
  />
);

export const components = {
  h3,
  p: paragraph,
  span,
  a,
  li,
  h4,
};
