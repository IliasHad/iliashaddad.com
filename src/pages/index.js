import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { Hero } from "../components/hero";
import { About } from "../components/about";
import { Articles } from "../components/articles";
import { Testimonials } from "../components/testimonials";
import { Work } from "../components/work";
import { Skills } from "../components/skills";
import { StaticQuery, graphql } from "gatsby";
function IndexPage() {
  return (
    <StaticQuery
      query={graphql`
        {
          heroImage: file(base: { eq: "setup.jpg" }) {
            childImageSharp {
              original {
                src
              }
            }
          }
        }
      `}
      render={({ heroImage }) => (
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
            title="Full Stack Developer, Shopify Developer, and Freelancer"
            featuredImage={`https://iliashaddad.com${heroImage.childImageSharp.original.src}`}
          />

          <Hero />
          <About />
          <Skills />
          <Work />
          <Articles />
          <Testimonials />
        </Layout>
      )}
    />
  );
}

export default IndexPage;
