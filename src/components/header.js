import { graphql, useStaticQuery, Link } from "gatsby";
import React, { useState, useContext } from "react";
import ThemeContext from "../context/ThemeContext";

function Header() {
  const [isExpanded, toggleExpansion] = useState(false);
  const { toggleDark, darkMode } = useContext(ThemeContext);
  const { site } = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <header>
      <div className="flex flex-wrap  justify-between p-4 mx-auto md:p-8">
        <Link to="/">
          <h1 className="flex  no-underline">
            <span className="text-xl  tracking-tight">
              {site.siteMetadata.title}
            </span>
          </h1>
        </Link>

        <button
          className="flex items-center block px-3 py-2   border border-white rounded md:hidden"
          onClick={() => toggleExpansion(!isExpanded)}
        >
          <svg
            className="w-3 h-3 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>

        <nav
          className={`${
            isExpanded ? `block` : `hidden`
          } md:block md:flex md:items-center  w-full md:w-auto`}
        >
          {[
            {
              route: `/about`,
              title: `About`,
            },

            {
              route: `/blog`,
              title: `Blog`,
            },
            {
              route: `/contact`,
              title: `Contact`,
            },
          ].map((link) => (
            <Link
              className="block mt-4  no-underline md:inline-block md:mt-0 md:ml-6"
              key={link.title}
              to={link.route}
            >
              {link.title}
            </Link>
          ))}
          <button className="dark-switcher px-6" onClick={toggleDark}>
            {darkMode ? <span> ☀</span> : <span> ☾</span>}
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
