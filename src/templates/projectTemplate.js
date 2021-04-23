/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useState, useContext } from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Author } from "../components/author";
import { MDXProvider } from "@mdx-js/react";
import { components } from "../layouts/post-layout";
import { FaTwitter } from "react-icons/fa";
import addToMailchimp from "gatsby-plugin-mailchimp";
import { Disqus } from "gatsby-plugin-disqus";
import ThemeContext from "../context/ThemeContext";
import Img from "gatsby-image";
import rehypeReact from "rehype-react";
import { ImgSharpInline } from "../components/gatsby-image";

const renderAst = new rehypeReact({
  Fragment: React.Fragment,
  createElement: React.createElement,
  components: { "img-sharp-inline": ImgSharpInline },
}).Compiler;
export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { ghostPage } = data; // data.mdx holds your post data

  const theme = useContext(ThemeContext);

  return (
    <Layout>
      <SEO title={ghostPage.title} description={ghostPage.custom_excerpt} />
      <div className="relative blog-page py-16  overflow-hidden">
        <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full"></div>
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="text-lg max-w-prose mx-auto">
            <h1>
              <span
                className={
                  theme.darkMode
                    ? "mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-white sm:text-4xl"
                    : "mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl"
                }
              >
                {ghostPage.title}
              </span>
            </h1>
            <div className="py-8">
              <Img fluid={ghostPage.featureImageSharp.childImageSharp.fluid} />
            </div>
          </div>
          <div
            className={
              theme.darkMode
                ? "mt-6 prose prose-indigo prose-lg text-white mx-auto"
                : "mt-6 prose prose-indigo prose-lg text-gray-700 mx-auto"
            }
          >
            {renderAst(ghostPage.childHtmlRehype.htmlAst)}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const postQuery = graphql`
  query($slug: String!) {
    ghostPage(slug: { eq: $slug }) {
      title
      slug
      custom_excerpt
      childHtmlRehype {
        htmlAst
        html
      }
      featureImageSharp {
        childImageSharp {
          fluid(maxWidth: 700, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      tags {
        name
        slug
      }
      html
    }
  }
`;
