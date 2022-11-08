/* eslint-disable react/prop-types */
import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { graphql, Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

export default function TagPage({ data, pageContext }) {
  console.log(pageContext)
  return (
    <Layout>
      {pageContext && (
        <SEO
          description={pageContext.description || ""}
          title={pageContext.name}
        />
      )}

      <section className="p-12 blog-page">
        <div className=" w-2/4 ">
          {pageContext && (
            <h5 className="text-3xl font-bold">{pageContext.name}</h5>
          )}
        </div>
        <div className="grid  grid-cols-1 md:grid-cols-2  py-4">
          <p className="w-full">{}</p>
        </div>
        <div className="py-4">
          <div className="grid  grid-cols-1 md:grid-cols-3 py-12 gap-x-24 gap-y-8">
            {data && data.allBlogPost && data.allBlogPost.edges
              .filter(({ node }) => node.featureImageSharp !== null)

              .map(({ node }, index) => (
                <div key={index}>
                  <GatsbyImage
                    image={node.featuredImage?.childImageSharp?.gatsbyImageData}
                    alt="Ilias"
                    className="rounded"
                    imgStyle={{ objectFit: "cover" }}
                  />

                  <div className="pt-4">
                    <Link
                      to={`/tag/${node.tags.filter(el => el.slug === pageContext.slug)[0].slug}`}
                      className="text-xl  py-4 text-gray-600"
                    >
                      <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-stone text-stone-light">
                        {node.tags.filter(el => el.slug === pageContext.slug)[0].name}
                      </span>{" "}
                    </Link>
                  </div>

                  <p className="text-2xl my-0 py-4 font-semibold">
                    {node.title}
                  </p>
                  <p
                    className="text-lg py-4 lg:text-gray-500"
                    dangerouslySetInnerHTML={{ __html: node.excerpt }}
                  ></p>
                  <button className="pt-2 pb-1 border-b-2  border-indigo-100text-lg ">
                    <Link to={`/blog/${node.slug}`}>Read Article</Link>
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
  query ($slug: String!) {
    allBlogPost(
      sort: { order: ASC, fields: published_at }
      filter: { tags: { elemMatch: { slug: { eq: $slug } } } }
    ) {
      totalCount
      edges {
        node {
          slug
          excerpt
          title
         featuredImage {
            childImageSharp {
              gatsbyImageData(
                height: 300
                width: 500
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
    }
  }
`;
