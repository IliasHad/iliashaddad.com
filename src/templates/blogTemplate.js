/* eslint-disable react/prop-types */

import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Author } from "../components/author";
import { MDXProvider } from "@mdx-js/react";
import { components } from "../layouts/post-layout";
import { FaTwitter } from "react-icons/fa";
export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { mdx } = data; // data.mdx holds your post data
  const { frontmatter, body, timeToRead } = mdx;

  return (
    <Layout>
      <SEO title={frontmatter.title} description={frontmatter.description} />
      <div>
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
            <MDXProvider components={components}>
              <MDXRenderer>{body}</MDXRenderer>
            </MDXProvider>
            <div className="my-4">
              <a
                className="flex gap-4 "
                target="__blank"
                href={`http://www.twitter.com/share?url=iliashaddad.com/${frontmatter.slug}&text=${frontmatter.title} by @iliashaddad3`}
              >
                {" "}
                Let&apos;s discuss it on Twitter
                <FaTwitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </article>
      </div>
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
        description
        title
        featuredImage {
          childImageSharp {
            fluid(
              quality: 100
              pngQuality: 100
              maxHeight: 400
              maxWidth: 1000
              cropFocus: CENTER
            ) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }
      }
    }
  }
`;
