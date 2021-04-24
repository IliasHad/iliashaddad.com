import React from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import Img from "gatsby-image";

export const Articles = () => {
  return (
    <section className="px-12 py-4">
      <div className="w-2/4 ">
        <h5 className="text-3xl font-bold">My Articles</h5>
      </div>
      <div className="grid  grid-cols-1 md:grid-cols-2  py-12">
        <p className="w-full">
          I like to share my knowledge with others. Take a look at some of
          technical articles and behind the scene of my side project
        </p>
      </div>
      <StaticQuery
        query={graphql`
          {
            featuredPost: allGhostPost(
              sort: { order: ASC, fields: published_at }
              filter: { featured: { eq: true } }
              limit: 1
            ) {
              edges {
                node {
                  slug
                  title
                  custom_excerpt
                  primary_tag {
                    name
                    slug
                  }
                  featureImageSharp {
                    childImageSharp {
                      fluid(maxWidth: 800, quality: 100, cropFocus: CENTER) {
                        ...GatsbyImageSharpFluid_withWebp_noBase64
                      }
                    }
                  }
                }
              }
            }

            allGhostPost(
              sort: { order: DESC, fields: created_at }
              filter: { featured: { eq: false }, visibility: { eq: "public" } }
              limit: 3
            ) {
              edges {
                node {
                  custom_excerpt
                  slug
                  title
                  primary_tag {
                    name
                    slug
                  }
                  featureImageSharp {
                    childImageSharp {
                      fluid(
                        maxHeight: 600
                        maxWidth: 800
                        quality: 100
                        cropFocus: CENTER
                      ) {
                        ...GatsbyImageSharpFluid_withWebp_noBase64
                      }
                    }
                  }
                }
              }
            }
          }
        `}
        render={({ featuredPost, allGhostPost }) => (
          <>
            {featuredPost.edges
              .filter(({ node }) => node.featureImageSharp !== null)
              .map(({ node }, index) => (
                <div
                  key={index}
                  className="grid  grid-cols-1 md:grid-cols-2 py-12 gap-x-24 gap-y-12"
                >
                  <Img
                    imgStyle={{ objectFit: "cover" }}
                    fluid={node.featureImageSharp.childImageSharp.fluid}
                    className="rounded"
                  />

                  <div>
                    <div className="py-4">
                      <Link
                        to={`/tag/${node.primary_tag.slug}`}
                        className="text-xl  py-4 text-gray-600"
                      >
                        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                          {node.primary_tag.name}
                        </span>{" "}
                      </Link>
                    </div>
                    <h2 className="text-2xl font-semibold">{node.title}</h2>
                    <p className="text-lg text-gray-500 py-4">
                      {node.custom_excerpt}
                    </p>
                    <button className="pt-2 pb-1 text-lg border-b-2  border-indigo-100border-indigo-100">
                      <Link to={`/blog/${node.slug}`}>Read Article</Link>
                    </button>
                  </div>
                </div>
              ))}
            <div className="grid  grid-cols-1 md:grid-cols-3 py-12 gap-x-24 gap-y-8">
              {allGhostPost.edges
                .filter(({ node }) => node.featureImageSharp !== null)

                .map(({ node }, index) => (
                  <div key={index}>
                    <Img
                      imgStyle={{ objectFit: "cover" }}
                      fluid={node.featureImageSharp.childImageSharp.fluid}
                      className="rounded"
                    />
                    <div className="py-4">
                      <Link
                        to={`/tag/${node.primary_tag.slug}`}
                        className="text-xl  py-4 text-gray-600"
                      >
                        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                          {node.primary_tag.name}
                        </span>{" "}
                      </Link>
                    </div>

                    <p className="text-2xl font-semibold">{node.title}</p>
                    <p className="text-lg text-gray-500 py-4">
                      {node.custom_excerpt}
                    </p>
                    <button className="pt-2 pb-1 text-lg border-b-2  border-indigo-100border-indigo-100">
                      <Link to={`/blog/${node.slug}`}>Read Article</Link>
                    </button>
                  </div>
                ))}
            </div>
          </>
        )}
      />
    </section>
  );
};
