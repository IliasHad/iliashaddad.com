import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { Hero } from "../components/hero";
import { About } from "../components/about";
import { Articles } from "../components/articles";
import { Testimonials } from "../components/testimonials";

function IndexPage() {
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
        title="Full Stack JavaScript Developer || Shopify Developer"
      />

      <Hero />
      <About />
      <Articles />
      <Testimonials />
    </Layout>
  );
}

export default IndexPage;
