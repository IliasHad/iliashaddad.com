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
            featuredPost: allMdx(
              filter: {
                fileAbsolutePath: { regex: "/(blogs)/.*\\\\.mdx$/" }
                frontmatter: { featured: { eq: true } }
              }
              limit: 1
            ) {
              nodes {
                frontmatter {
                  title
                  slug
                  category
                  description
                  featuredImage {
                    childImageSharp {
                      fluid(
                        maxHeight: 300
                        maxWidth: 600
                        quality: 100
                        cropFocus: ATTENTION
                      ) {
                        ...GatsbyImageSharpFluid_withWebp_noBase64
                      }
                    }
                  }
                }
              }
            }

            allPosts: allMdx(
              filter: { fileAbsolutePath: { regex: "/(blogs)/.*\\\\.mdx$/" } }
              sort: { fields: frontmatter___date, order: DESC }
              limit: 3
            ) {
              nodes {
                frontmatter {
                  title
                  slug
                  description
                  category
                  featuredImage {
                    childImageSharp {
                      fluid(
                        maxHeight: 250
                        maxWidth: 350
                        quality: 100
                        cropFocus: ATTENTION
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
        render={({ featuredPost, allPosts }) => (
          <>
            <div className="grid  grid-cols-1 md:grid-cols-2 py-12 gap-x-24 gap-y-12">
              <Img
                imgStyle={{ objectFit: "cover" }}
                fluid={
                  featuredPost.nodes[0].frontmatter.featuredImage
                    .childImageSharp.fluid
                }
                className="rounded"
              />

              <div>
                <h5 className="text-xl  py-4 text-gray-600">
                  {featuredPost.nodes[0].frontmatter.category}
                </h5>
                <h2 className="text-2xl font-semibold">
                  {featuredPost.nodes[0].frontmatter.title}
                </h2>
                <p className="text-lg text-gray-500 py-4">
                  {featuredPost.nodes[0].frontmatter.description}
                </p>
                <button className=" border-b-2 pt-4 pb-1 text-lg hover:border-b-2 focus:border-b-2">
                  <Link to={featuredPost.nodes[0].frontmatter.slug}>
                    Read Article
                  </Link>
                </button>
              </div>
            </div>

            <div className="grid  grid-cols-1 md:grid-cols-3 py-12 gap-x-24 gap-y-8">
              {allPosts.nodes.map((post, index) => (
                <div key={index}>
                  <Img
                    imgStyle={{ objectFit: "cover" }}
                    fluid={post.frontmatter.featuredImage.childImageSharp.fluid}
                    className="rounded"
                  />

                  <h5 className="text-xl  py-4 text-gray-600">
                    {" "}
                    {post.frontmatter.category}
                  </h5>
                  <p className="text-2xl font-semibold">
                    {post.frontmatter.title}
                  </p>
                  <p className="text-lg text-gray-500 py-4">
                    {post.frontmatter.description}
                  </p>
                  <button className="pt-4 pb-1 text-lg border-b-2">
                    <Link to={post.frontmatter.slug}>Read Article</Link>
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
