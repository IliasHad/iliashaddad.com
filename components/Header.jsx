import React, { useState, useContext } from "react";
import Link from 'next/link'
import ThemeContext from "../context/ThemeContext";

function Header() {
  const [isExpanded, toggleExpansion] = useState(false);
  const { toggleDark, darkMode } = useContext(ThemeContext);
  return (
    <header>
      <div className="flex flex-wrap  justify-between p-4 mx-auto md:p-8">
        <Link href="/"  className="cursor-pointer">
          <h1 className="flex  no-underline text-xl  tracking-tight cursor-pointer">
              Ilias Haddad
          </h1>
        </Link>

        <button
          className="items-center block px-3 py-2   border border-white rounded md:hidden"
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
          className={`${isExpanded ? `flex` : `hidden`
            } md:flex md:items-center gap-4  w-full md:w-auto`}
        >
          {[
            {
              route: `/about/`,
              title: `About`,
            },

            {
              route: `/blog/`,
              title: `Blog`,
            },
            {
              route: `/contact/`,
              title: `Contact`,
            },
          ].map((link) => (
            <Link
              className="block mt-4  no-underline md:inline-block md:mt-0 md:ml-6 cursor-pointer"
              href={link.route}
              key={link.title}
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
