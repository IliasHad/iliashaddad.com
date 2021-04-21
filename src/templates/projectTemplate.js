/* eslint-disable react/prop-types */

import React, { useContext } from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";
import { components } from "../layouts/post-layout";

import ThemeContext from "../context/ThemeContext";
export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const theme = useContext(ThemeContext);

  const { mdx } = data; // data.mdx holds your post data
  const { frontmatter, body } = mdx;
  return (
    <Layout>
      <SEO title={frontmatter.title} description={frontmatter.description} />

      <div className="relative blog-page py-16  overflow-hidden">
        <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full"></div>
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div
            className={
              theme.darkMode
                ? "mt-6 prose prose-indigo prose-lg text-white mx-auto"
                : "mt-6 prose prose-indigo prose-lg text-gray-700 mx-auto"
            }
          >
            <div className="blog-post md:max-w-2xl max-w-3xl ">
              <MDXProvider components={components}>
                <MDXRenderer>{body}</MDXRenderer>
              </MDXProvider>
            </div>
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
        description
      }
    }
  }
`;
