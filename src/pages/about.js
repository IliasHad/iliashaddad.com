import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { Contact } from "../components/contact";

function AboutPage() {
  return (
    <Layout>
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title="Home"
      />
      <section className="p-12">
        <div className=" w-2/4 ">
          <h5 className="text-3xl font-bold">About</h5>
        </div>
        <div className="py-12">
          <p className="py-4">
            I&apos;m a 21-year-old student at Ibn Tofail University currently
            studying marketing and commerce.
          </p>

          <p className="py-4">
            As I&apos;ve grown as a developer, I&apos;ve worked on multiple side
            projects to improve my coding skills
          </p>
        </div>
      </section>
      <Contact />
    </Layout>
  );
}

export default AboutPage;
