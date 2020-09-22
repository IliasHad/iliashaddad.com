import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";

function AboutPage() {
  return (
    <Layout>
      <SEO
        keywords={[
          `Shopify Developer`,
          `Freelancer`,
          `Shopify App Developer`,
          `Shopify Theme Developer`,
          `Web App Developer`,
          `Shopify Blog`,
          `Developer Blog`,
          `Developer Portfolio`,
          `Web App Developer Portfolio`,
          `Full Stack Developer Portfolio`,
          `Shopify Developer Portfolio`,
        ]}
        title="About Me"
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
    </Layout>
  );
}

export default AboutPage;
