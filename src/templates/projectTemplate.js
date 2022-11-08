/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useState, useContext } from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import ThemeContext from "../context/ThemeContext";
import Img from "gatsby-image";
import { GatsbyImage } from "gatsby-plugin-image";
import Block from "../components/block";


export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { clientProject, sideProject } = data; // data.mdx holds your post data
  let page = clientProject || sideProject;

  const theme = useContext(ThemeContext);

  return (
    <Layout>
      <SEO title={page.title} description={page.excerpt} />
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
                {page.title}
              </span>
            </h1>
            <div className="py-8">
              <GatsbyImage
                image={page.featuredImage?.childImageSharp?.gatsbyImageData}
                alt="Ilias"
                className="rounded"
                imgStyle={{ objectFit: "cover" }}
              />
            </div>
          </div>
          <div
            className={
              theme.darkMode
                ? "mt-6 prose prose-indigo prose-lg text-white mx-auto"
                : "mt-6 prose prose-indigo prose-lg text-gray-700 mx-auto"
            }
          >
            {JSON.parse(page.blocks).map((block) => (
              <Block key={block.id} block={block} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const postQuery = graphql`
  query ($slug: String!) {
    clientProject: clientProject(slug: { eq: $slug }) {
      title
      slug
      excerpt
      blocks
      featuredImage {
        childImageSharp {
          gatsbyImageData(
            height: 600
            width: 800
            quality: 100
            transformOptions: { cropFocus: CENTER }
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
      tags {
        name
        slug
      }
    }
    sideProject: sideProject(slug: { eq: $slug }) {
      title
      slug
      excerpt
      blocks
      featuredImage {
        childImageSharp {
          gatsbyImageData(
            height: 600
            width: 800
            quality: 100
            transformOptions: { cropFocus: CENTER }
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
      tags {
        name
        slug
      }
    }
  }
`;
