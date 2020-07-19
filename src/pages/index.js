import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { Hero } from "../components/hero";
import { About } from "../components/about";
import { Work } from "../components/work";
import { Contact } from "../components/contact";
import { Articles } from "../components/articles";
import { Footer } from "../components/footer";

function IndexPage() {
  return (
    <Layout>
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title="Home"
      />

      <Hero />
      <About />
      <Work />
      <Articles />
      <Contact />
      <Footer />
    </Layout>
  );
}

export default IndexPage;
