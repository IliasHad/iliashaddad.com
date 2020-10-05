import React from "react";

const paragraph = (props) => (
  <p
    className="my-6"
    style={{
      letterSpacing: "-0.003em",
      lineHeight: "32px",
      marginTop: "2em",
      wordBreak: "break-word",
    }}
    {...props}
  />
);

const h3 = (props) => (
  <h3
    className="my-8 md:text-2xl text-xl tracking-tighter"
    style={{
      lineHeight: "40px",
    }}
    {...props}
  />
);

const h1 = (props) => (
  <h1
    className="my-8 md:text-2xl text-xl tracking-tighter"
    style={{
      lineHeight: "40px",
      marginTop: "1.95em",
      marginBottom: "-0.28em",
      letterSpacing: "-0.022em",
    }}
    {...props}
  />
);

const blockquote = (props) => (
  <blockquote
    style={{
      background: "rgb(242, 242, 242)",
      marginTop: "56px",
      padding: "5px 20px",
      borderRadius: "5px",
    }}
    {...props}
  />
);
const h2 = (props) => (
  <h2
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
      marginTop: "1rem",
      marginBottom: "1rem",
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
  h2,
  h1,
  blockquote,
};
