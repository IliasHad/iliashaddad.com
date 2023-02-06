import React from "react";

export const Footer = () => {
  return (
    <footer className="px-12 py-12">
      <div className=" w-full  ">
        <p className="text-md text-center light:text-gray-900 dark:text-gray-500 ">
          © Ilias Haddad {new Date().getFullYear()}. All rights reserved.
        </p>
        <p className="text-md text-center light:text-gray-900 py-2 dark:text-gray-500">
          Made with ❤️ in Morocco 🇲🇦
        </p>
      </div>
    </footer>
  );
};
