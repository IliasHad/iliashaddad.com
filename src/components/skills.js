import React from "react";

export const Skills = () => {
  return (
    <section className="px-12 py-4">
      <div className="w-2/4 ">
        <h5 className="text-3xl font-bold">My Skills</h5>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 py-6 gap-12">
        <p>
          I have taken a number of online courses to teach myself how to code.
          Some of these online courses I've taken include
          <a
            href="https://www.udemy.com/course/the-complete-javascript-course/"
            target="__blank"
            className="text-black font-bold"
          >
            The Complete JavaScript Course 2020: Build Real Projects!
          </a>
          <span> &amp; </span>
          <a
            href="https://www.udemy.com/course/advanced-css-and-sass/"
            target="__blank"
            className="text-black font-bold"
          >
            Advanced CSS and Sass: Flexbox, Grid, Animations and More!
          </a>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 px-12 gap-4 justify-center items-center content-center">
        <ul className="list-disc">
          <li className="py-2">Express JS</li>
          <li className="py-2">React JS</li>
          <li className="py-2">Javascript ES6</li>
        </ul>
        <ul className="list-disc">
          <li className="py-2">Shopify App Dev </li>
          <li className="py-2">Shopify Theme Dev </li>
          <li className="py-2">NodeJS</li>
        </ul>
        <ul className="list-disc">
          <li className="py-2">Git</li>
          <li className="py-2">SASS</li>
          <li className="py-2">HTML &amp; CSS</li>
        </ul>
        <ul className="list-disc">
          <li className="py-2">MongoDB</li>
          <li className="py-2">Gatsby JS</li>
          <li className="py-2">Responsive Web Design</li>
        </ul>
      </div>
    </section>
  );
};
