import React from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import Img from "gatsby-image";

export const Articles = () => {
  return (
    <section className="p-12">
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
            featuredPost: allMarkdownRemark(
              filter: {
                frontmatter: { featured: { eq: true } }
                fileAbsolutePath: { regex: "/(blogs)/.*\\\\.md$/" }
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
                      fixed(
                        height: 300
                        width: 600
                        quality: 100
                        cropFocus: ATTENTION
                      ) {
                        ...GatsbyImageSharpFixed
                      }
                    }
                  }
                }
              }
            }

            allPosts: allMarkdownRemark(
              filter: {
                frontmatter: { featured: { ne: true } }
                fileAbsolutePath: { regex: "/(blogs)/.*\\\\.md$/" }
              }
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
                      fixed(
                        height: 250
                        width: 350
                        quality: 100
                        cropFocus: ATTENTION
                      ) {
                        ...GatsbyImageSharpFixed
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
            <div className="grid  grid-cols-1 md:grid-cols-2 py-12 col-gap-24 row-gap-12">
              <Img
                imgStyle={{ objectFit: "cover" }}
                fixed={
                  featuredPost.nodes[0].frontmatter.featuredImage
                    .childImageSharp.fixed
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

            <div className="grid  grid-cols-1 md:grid-cols-3 py-12 col-gap-24 row-gap-8">
              {allPosts.nodes.map((post, index) => (
                <div key={index}>
                  <Img
                    imgStyle={{ objectFit: "cover" }}
                    fixed={post.frontmatter.featuredImage.childImageSharp.fixed}
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
