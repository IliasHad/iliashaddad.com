import React, { useContext } from "react";
import { StaticImage } from "gatsby-plugin-image";
import ThemeContext from "../context/ThemeContext";
export const Logos = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <section className="px-12 py-4">
      <div>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <p className="text-center text-base font-semibold uppercase  tracking-wider">
            Featured in
          </p>
          <div className="flex items-center justify-center md:flex-row flex-col">
            <a
              href="https://www.storetasker.com/experts/ilias-haddad"
              className="flex justify-center md:py-4 px-8 md:w-1/5  w-8/12 mx-auto md:mx-0"
              target="__blank"
            >
              {darkMode ?
                <StaticImage
                  src={"../images/storetasker-dark.png"}
                  placeholder="blurred"
                  quality={100}
                  layout="fullWidth"
                  className="w-full"

                /> : <StaticImage
                  src={"../images/storetasker.png"}
                  placeholder="blurred"
                  quality={100}
                  layout="fullWidth"
                  className="w-full"

                />
              }
            </a>
            <a
              href="https://www.builtinafrica.io/blog-post/ilias-haddad-morocco"
              className="flex justify-center md:py-4 px-8 md:w-1/5  w-8/12 mx-auto  md:mx-0"
              target="__blank"
            >
            
        
                <StaticImage
                  src={"../images/builtinafrica.png"}
                  placeholder="blurred"
                  quality={100}
                  layout="fullWidth"
                  className="w-full"

                  />
        
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
