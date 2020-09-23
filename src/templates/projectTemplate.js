/* eslint-disable react/prop-types */

import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MdxEmbedProvider } from "@pauliescanlon/gatsby-mdx-embed";

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { mdx } = data; // data.mdx holds your post data
  const { frontmatter, body } = mdx;
  return (
    <Layout>
      <SEO title={frontmatter.title} description={frontmatter.description} />

      <div>
        <div
          className="my-12  px-12 md:flex "
          style={{
            width: "100%",

            justifyContent: "center",
          }}
        >
          <div className="blog-post md:max-w-2xl max-w-3xl ">
            <MdxEmbedProvider>
              <MDXRenderer>{body}</MDXRenderer>
            </MdxEmbedProvider>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      body
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
    }
  }
`;
