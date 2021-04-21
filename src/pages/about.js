import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { StaticQuery, graphql, Link } from "gatsby";
import Img from "gatsby-image";
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
        description="About Ilias Haddad"
      />
      <div className=" p-12 gap-12  grid grid-cols-1 md:grid-cols-2 items-center">
        <div>
          <div className=" w-2/4 ">
            <h5 className="text-3xl font-bold">About Me</h5>
          </div>
          <div className="py-12">
            <p className="py-4">
              I&apos;m a Full stack developer and mainly with the MERN stack
              (MongoDB, Express JS, React JS and Node JS)
            </p>
            <p className="py-4">
              I&apos;m also a Shopify developer. I help Shopify store owners
              with their technical issues and needs (custom Shopify theme, add
              features to their store, optimize their store performance ,...)
            </p>
            <p className="py-4">
              As I&apos;ve grown as a developer, I&apos;ve worked on multiple
              side projects to improve my coding skills and keep myself busy.
            </p>
            <p className="py-4">
              If you need a new custom-made website, a unique Shopify store or
              have an idea of an engaging web application: Please feel free to
              <Link style={{ borderBottom: "1px solid #000" }} to="/contact">
                {" "}
                contact me{" "}
              </Link>
              and we&apos;ll talk about the details!
            </p>
          </div>
        </div>
        <div>
          <StaticQuery
            query={graphql`
              query {
                heroImage: file(base: { eq: "ilias-image.jpg" }) {
                  childImageSharp {
                    fluid(maxWidth: 550, quality: 100, cropFocus: ATTENTION) {
                      ...GatsbyImageSharpFluid_withWebp_noBase64
                    }
                  }
                }
              }
            `}
            render={(data) => (
              <div>
                <Img
                  imgStyle={{ objectFit: "cover" }}
                  fluid={data.heroImage.childImageSharp.fluid}
                  className="rounded"
                />{" "}
              </div>
            )}
          />
        </div>
      </div>
    </Layout>
  );
}

export default AboutPage;
