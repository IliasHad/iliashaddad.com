import React from "react";

export const Footer = () => {
  return (
    <footer className="px-12 py-12">
      <div className=" w-full  ">
        <p className="text-md text-center text-gray-600 dark:text-gray-200 ">
          © Ilias Haddad {new Date().getFullYear()}. All rights reserved.
        </p>
        <p className="text-md text-center text-gray-600 py-2 dark:text-gray-200">
          Made with ❤️ in Morocco 🇲🇦
        </p>
      </div>
    </footer>
  );
};
