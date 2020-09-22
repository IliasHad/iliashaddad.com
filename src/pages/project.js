import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";

const ProjectPage = () => {
  return (
    <Layout>
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title="Project"
      />
      <div className=" p-12  grid grid-cols-1 items-center gap-4">
        <h1 className=" text-4xl font-bold  ">Makerlapse</h1>
        <p className="text-lg font-light w-4/5 ">
          Cross platform desktop app built with Electron JS that screenshots of
          your work and make a timelapse video of it. Cross platform desktop app
          built with Electron JS that screenshots of your work and make a
          timelapse video of it.
        </p>
      </div>
    </Layout>
  );
};

export default ProjectPage;
