import React from "react";
import { Link } from "gatsby";
export const Work = () => {
  return (
    <section className="p-12">
      <div className=" w-full w-2/4 ">
        <h5 className="text-3xl font-bold">What I&apos;ve been working on</h5>
      </div>
      <div className="grid  grid-cols-1 md:grid-cols-2 py-12">
        <p className="w-full text-lg">
          I like to stay busy and always have a project in the works. Take a
          look at some of the applications, articles, and companies I&apos;ve
          dedicated my time to.
        </p>
      </div>

      <div className="grid  grid-cols-1 md:grid-cols-2 py-12 col-gap-24 row-gap-8">
        <div>
          <img src={"/work-demo.jpg"} className="rounded" alt="Logo" />

          <h5 className="text-xl  py-4 text-gray-600">HabitScript</h5>
          <p className="text-2xl font-semibold">
            Track your coding time from visual studio code, display coding
            metrics on web app.
          </p>
          <button className="pt-4 pb-1 text-lg border-b-2">
            <Link to="/">View Project Details</Link>
          </button>
        </div>

        <div>
          <img src={"/work-website.png"} className="rounded" alt="Logo" />
          <h5 className="text-xl  py-4 text-gray-600">Makerlapse</h5>
          <p className="text-2xl font-semibold">
            Cross platform desktop app built with Electron JS that screenshots
            of your work and make a timelapse video of it.
          </p>
          <button className="pt-4 pb-1 text-lg border-b-2">
            <Link to="/">View Project Details</Link>
          </button>
        </div>

        <div>
          <img src={"/work-shopify.jpg"} className="rounded" alt="Logo" />
          <h5 className="text-xl  py-4 text-gray-600">Shopify Store</h5>
          <p className="text-2xl font-semibold">
            eCommerce website built with Gatsby JS and Shopify
          </p>
          <button className="pt-4 pb-1 text-lg border-b-2">
            <Link to="/">View Project Details</Link>
          </button>
        </div>
      </div>
    </section>
  );
};
