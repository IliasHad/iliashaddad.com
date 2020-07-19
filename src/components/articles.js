import React from "react";
import { Link } from "gatsby";
export const Articles = () => {
  return (
    <section className="p-12">
      <div className=" w-full w-2/4 ">
        <h5 className="text-3xl font-bold">My Articles</h5>
      </div>
      <div className="grid  grid-cols-1 md:grid-cols-2  py-12">
        <p className="w-full">
          I like to share my knowledge with others. Take a look at some of
          technical articles and behind the scene of my side project
        </p>
      </div>
      <div className="grid  grid-cols-1 md:grid-cols-2 py-12 col-gap-24 row-gap-8">
        <img src={"/shopify-blog.jpeg"} className="rounded" alt="Logo" />
        <div>
          <h5 className="text-xl  py-4 text-gray-600">Shopify Development</h5>
          <h2 className="text-2xl font-semibold">
            Best Shopify Development tools and articles to improve your workflow
          </h2>
          <p className="text-lg text-gray-500 py-4">
            Shopify has bee growing so fast in the last couple of years. “We
            made history in 2018: no other SaaS company has crossed the $1
            billion-dollar revenue mark at a faster growth rate than Shopify
            has,” said Tobi Lütke
          </p>
          <button className="pt-4 pb-1 text-lg hover:border-b-2 focus:border-b-2">
            <Link to="/">Read Article</Link>
          </button>
        </div>
      </div>

      <div className="grid  grid-cols-1 md:grid-cols-3 py-12 col-gap-24 row-gap-8">
        <div>
          <img src={"/developer-guy.jpeg"} className="rounded" alt="Logo" />

          <h5 className="text-xl  py-4 text-gray-600">Shopify</h5>
          <p className="text-2xl font-semibold">
            Shopify Speed Optimization — Step-by-Step Guide
          </p>
          <p className="text-lg text-gray-500 py-4">
            Speed plays a major role in the success of any online store. The
            faster your store loads, the lower the bounce rate. If your store is
            fast, you have a better chance of ranking on Google over slow sites
            that drive high bounce rates.
          </p>
        </div>

        <div>
          <img src={"/indie-making.jpeg"} className="rounded" alt="Logo" />

          <h5 className="text-xl  py-4 text-gray-600">Indie Making</h5>
          <p className="text-2xl font-semibold">
            Lessons learned as an Indie Maker in 2019
          </p>
          <p className="text-lg text-gray-500 py-4">
            2019, it was my best year ever because I learned how to code and I
            can build anything I want with code and I make my first dollar from
            the thing I built with my coding skills
          </p>
        </div>

        <div>
          <img src={"/makerlapse.jpeg"} className="rounded" alt="Logo" />

          <h5 className="text-xl  py-4 text-gray-600">SaaS</h5>
          <p className="text-2xl font-semibold">
            What I learned while building a desktop app to document my journey
            in a timelapse video
          </p>
          <p className="text-lg text-gray-500 py-4">
            After launching the beta version of Habitscript and getting great
            feedback about the idea and I’m still working on launching the v1
            soon this month.
          </p>
        </div>
      </div>
    </section>
  );
};
