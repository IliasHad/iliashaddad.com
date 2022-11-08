import React from "react";
import { StaticImage } from "gatsby-plugin-image";


export const Hero = () => {
  
  return (
    <div className=" p-12  grid grid-cols-1 md:grid-cols-2 items-center">
      <div>
        <h1 className="lg:text-4xl text-2xl font-bold">
          Hi <span>👋</span>, I&apos;m Ilias Haddad. Full Stack Developer
        </h1>

        <div className="flex overflow-hidden max-w-full items-center relative my-4">
          <div className="relative">
            <StaticImage
              src="../images/hero.png"
              alt="A dinosaur"
              placeholder="blurred"
              layout="fixed"
              width={40}
              height={40}
              quality={100}
              objectPosition={"60% 40%"}
              className="inline-block mr-4 rounded-full text-white shadow-solid"
            />

            <span className="h-4 w-4 bg-green-400 mx-4 -mt-1 border-gray-100 border-2   rounded-full right-0 top-0  absolute"></span>
          </div>{" "}
          <p className="py-4  text-gray-700 dark:text-white text-md">
            Reply time: within 1-2 working days
          </p>
        </div>
      </div>

      <div className="mx-auto md:px-12 my-8 md:my-0">
        <StaticImage
          src="../images/ilias-image.jpg"
          alt="A dinosaur"
          placeholder="blurred"
          objectFit="cover"
          quality={100}
          layout="constrained"
          height={500}
          width={500}
          transformOptions={{
            fit: "cover",
            cropFocus: "entropy",
          }}
        />
      </div>
    </div>
  );
};
