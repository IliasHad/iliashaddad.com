import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { Hero } from "../components/hero";
import { About } from "../components/about";
import { Contact } from "../components/contact";
import { Articles } from "../components/articles";
import { Testimonials } from "../components/testimonials";

function IndexPage() {
  return (
    <Layout>
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title="Home"
      />

      <Hero />
      <About />
      <Articles />
      <Testimonials />
      <Contact />
    </Layout>
  );
}

export default IndexPage;
