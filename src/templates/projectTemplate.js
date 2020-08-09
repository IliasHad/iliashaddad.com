/* eslint-disable react/prop-types */

import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";

import { Contact } from "../components/contact";
import { Footer } from "../components/footer";
export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { mdx } = data; // data.mdx holds your post data
  const { frontmatter, html } = mdx;
  return (
    <Layout>
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title={frontmatter.title}
      />
      <div className=" p-12  grid grid-cols-1 items-center gap-4">
        <div className="blog-post">
          <h1 className="text-3xl">{frontmatter.title}</h1>

          <h2>{frontmatter.date}</h2>
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
      <Contact />
      <Footer />
    </Layout>
  );
}

export const pageQuery = graphql`
  query($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
    }
  }
`;
