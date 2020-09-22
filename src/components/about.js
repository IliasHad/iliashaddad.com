import React from "react";

export const About = () => {
  return (
    <section className="px-12 py-4">
      <div className=" w-2/4 ">
        <h5 className="text-3xl font-bold">About Me</h5>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 py-12 gap-12">
        <p>
          I&apos;m a 21-year-old student at Ibn Tofail University currently
          studying marketing and commerce.
        </p>
        <p>
          As I&apos;ve grown as a developer, I&apos;ve worked on multiple side
          projects to improve my coding skills
        </p>
      </div>
    </section>
  );
};
