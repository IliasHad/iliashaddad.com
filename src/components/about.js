import React from "react";

export const About = () => {
  return (
    <section className="px-12 py-4">
      <div className=" w-2/4 ">
        <h5 className="text-3xl font-bold">About Me</h5>
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
