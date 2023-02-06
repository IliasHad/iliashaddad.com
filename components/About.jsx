import React from "react";

export const About = () => {
  return (
    <section className="px-12 py-4 ">

      <div className="mx-auto max-w-7xl py-16 sm:py-24 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">About Me
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-xl text-gray-500">
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 py-12 gap-12">
        <p>
          I&apos;m an experienced and self-taught software engineer with more
          than 3 years of experience in full-stack dev. I&apos;ve been working
          with the most popular front-end frameworks(Vue and React), and NodeJs
          on the backend.
        </p>
        <p>
          I&apos;m also a Shopify developer. I help Shopify store owners with
          their technical issues and needs (custom Shopify theme, add features
          to their store, optimize their store performance ,...)
        </p>
      </div>
    </section>
  );
};
