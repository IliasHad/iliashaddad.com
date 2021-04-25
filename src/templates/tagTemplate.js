/* eslint-disable react/prop-types */
import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { graphql, Link } from "gatsby";
import Img from "gatsby-image";
export default function TagPage({ data }) {
  return (
    <Layout>
      {data.ghostTag && (
        <SEO
          description={data.ghostTag.description || ""}
          title={data.ghostTag.name}
        />
      )}

      <section className="p-12 blog-page">
        <div className=" w-2/4 ">
          {data.ghostTag && (
            <h5 className="text-3xl font-bold">{data.ghostTag.name}</h5>
          )}
        </div>
        <div className="grid  grid-cols-1 md:grid-cols-2  py-4">
          <p className="w-full">{}</p>
        </div>
        <div className="py-4">
          <div className="grid  grid-cols-1 md:grid-cols-3 py-12 gap-x-24 gap-y-8">
            {data.allGhostPost.edges.map(({ node }, index) => (
              <div key={index}>
                <Img
                  imgStyle={{ objectFit: "cover" }}
                  fluid={node.featureImageSharp.childImageSharp.fluid}
                  className="rounded"
                />
                <div className="pt-4">
                  <Link
                    to={`/tag/${node.primary_tag.slug}/`}
                    className="text-xl  py-4 text-gray-600"
                  >
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                      {node.primary_tag.name}
                    </span>{" "}
                  </Link>
                </div>
                <p className="text-2xl my-0 py-4 font-semibold">{node.title}</p>{" "}
                <p className="text-lg text-gray-500 py-4">
                  {node.custom_excerpt}
                </p>
                <button className="pt-4 pb-1 text-lg border-b-2">
                  <Link to={`/blog/${node.slug}/`}>Read Article</Link>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const postQuery = graphql`
  query($slug: String!) {
    allGhostPost(
      sort: { order: ASC, fields: published_at }
      filter: { tags: { elemMatch: { slug: { eq: $slug } } } }
    ) {
      edges {
        node {
          slug
          custom_excerpt
          title
          featureImageSharp {
            childImageSharp {
              fluid(
                maxHeight: 400
                maxWidth: 550
                quality: 100
                cropFocus: CENTER
              ) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
              }
            }
          }
          primary_tag {
            name
            slug
          }
        }
      }
    }

    ghostTag(slug: { eq: $slug }) {
      description
      postCount
      slug
      name
    }
  }
`;
