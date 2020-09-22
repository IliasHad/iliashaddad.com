/* eslint-disable react/prop-types */

import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Contact } from "../components/contact";
import { Footer } from "../components/footer";
import Img from "gatsby-image";
import { Author } from "../components/author";
import { MdxEmbedProvider } from "@pauliescanlon/gatsby-mdx-embed";

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { mdx } = data; // data.mdx holds your post data
  const { frontmatter, body, timeToRead } = mdx;
  return (
    <Layout>
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title={frontmatter.title}
      />
      <div>
        <div className="py-10 ">
          <Img fluid={frontmatter.featuredImage.childImageSharp.fluid} />
        </div>
        <article
          className="my-12  px-12 md:flex "
          style={{
            width: "100%",

            justifyContent: "center",
          }}
        >
          <div className="blog-post md:max-w-2xl max-w-3xl ">
            <h1 className="md:text-4xl text-2xl  tracking-tighter">
              {frontmatter.title}
            </h1>
            <Author date={frontmatter.date} timeToRead={timeToRead} />
            <MdxEmbedProvider>
              <MDXRenderer>{body}</MDXRenderer>
            </MdxEmbedProvider>
          </div>
        </article>
      </div>
      <Contact />
      <Footer />
    </Layout>
  );
}

export const pageQuery = graphql`
  query($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      body
      timeToRead
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title

        featuredImage {
          childImageSharp {
            fluid(
              quality: 100
              pngQuality: 100
              maxHeight: 400
              maxWidth: 1000
            ) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
