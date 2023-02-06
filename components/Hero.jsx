import React from "react";
import Image from 'next/image'
import Img from "../public/images/ilias-image.jpg"


export const Hero = () => {
  
  return (
    <div className=" p-12  grid grid-cols-1 md:grid-cols-2 items-center">
      <div>
        <h1 className="lg:text-4xl text-2xl font-bold">
          Hi <span>👋</span>, I&apos;m Ilias Haddad. Full Stack Developer
        </h1>

        <div className="flex overflow-hidden max-w-full items-center relative my-4">
          <div className="relative">
            <span className="h-4 w-4 bg-green-400 mx-4 -mt-1 border-gray-100 border-2   rounded-full right-0 top-0  absolute"></span>
          </div>{" "}
          <p className="py-4  text-gray-700 dark:text-white text-md">
            Reply time: within 1-2 working days
          </p>
        </div>
      </div>

      <div>

<Image
    src={Img}
    alt={"Ilias Haddad"}
    placeholder="blur"
    objectFit="cover"
    quality={100}
    layout="responsive"
    height={600}
    width={800}
    className="rounded"
/>

</div>
    </div>
  );
};
