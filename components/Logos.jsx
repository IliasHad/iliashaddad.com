import React, { useContext } from "react";
import Image from "next/legacy/image";
import ThemeContext from "../context/ThemeContext";

export const Logos = () => {

  const {  darkMode } = useContext(ThemeContext);

  return (
    <section className="px-12 py-4">
      <div className="mx-auto max-w-7xl sm:py-4 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Featured in
          </h2>
        </div>
      </div>
      <div>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="flex items-center justify-center md:flex-row flex-col">
            <a
              href="https://www.storetasker.com/experts/ilias-haddad"
              className="flex justify-center md:py-4 px-8 md:w-1/5  w-8/12 mx-auto md:mx-0"
              target="__blank"
            >
              <div className="w-full">

                <Image
                  src={darkMode ? "/images/storetasker-dark.png" : "/images/storetasker.png"}
                  quality={100}
                  layout="responsive"
                  className="w-full"
                  width={100}
                  height={70}
                  alt="StoreTasker"
                />
              </div>
            </a>
            <a
              href="https://www.builtinafrica.io/blog-post/ilias-haddad-morocco"
              className="flex justify-center md:py-4 px-8 md:w-1/5  w-8/12 mx-auto  md:mx-0"
              target="__blank"
            >
              <div className="w-full">

                <Image
                  src={"/images/builtinafrica.png"}
                  quality={100}
                  layout="responsive"
                  width={100}
                  height={50}
                  className="rounded px-4 object-center dark:bg-white"
                  alt="Built in africa"
                />
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
