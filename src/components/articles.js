import React from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

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
            featuredPost: allBlogPost(
              sort: { order: ASC, fields: published_at }
              filter: { featured: { eq: true } }
              limit: 1
            ) {
              edges {
                node {
                  slug
                  title
                  tags {
                    name
                    slug
                  }
                  excerpt
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
                }
              }
            }
            allBlogPost(
              sort: { order: DESC, fields: created_at }
              filter: { featured: { eq: false }, published: { eq: true } }
              limit: 3
            ) {
              edges {
                node {
                  slug
                  title
                  excerpt
                  tags {
                    name
                    slug
                  }
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
                }
              }
            }
          }
        `}
        render={({ featuredPost, allBlogPost }) => (
          <>
            {featuredPost.edges
              .filter(({ node }) => node.featuredImage !== null)
              .map(({ node }, index) => (
                <div
                  key={index}
                  className="grid  grid-cols-1 md:grid-cols-2 py-12 gap-x-24 gap-y-12"
                >
                  <GatsbyImage
                    image={node.featuredImage?.childImageSharp?.gatsbyImageData}
                    alt="Ilias"
                    className="rounded"
                    imgStyle={{ objectFit: "cover" }}
                  />

                  <div>
                    <div className="py-4">
                      <Link
                        to={`/tag/${node.tags[0].slug}`}
                        className="text-xl  py-4 text-gray-600"
                      >
                        <span
                          style={{
                            backgroundColor: "#5F5E5C",
                            color:"#fff"
                          }} 
                          className="inline-flex dark:text-white items-center px-3 py-0.5 rounded-full text-sm font-medium bg-stone text-stone-light"
                        >
                          {node.tags[0].name}
                        </span>
                      </Link>
                    </div>
                    <h2 className="text-2xl font-semibold">{node.title}</h2>
                    <p
                      className="text-lg text-gray-500 py-4 dark:text-gray-200"
                      dangerouslySetInnerHTML={{
                        __html: node.excerpt,
                      }}
                    ></p>
                    <button className="pt-2 pb-1 text-lg border-b-2 text-gray-700 border-gray-700">
                      <Link to={`/blog/${node.slug}`}>Read Article</Link>
                    </button>
                  </div>
                </div>
              ))}
            <div className="grid  grid-cols-1 md:grid-cols-3 py-12 gap-x-24 gap-y-8">
              {allBlogPost.edges
                .filter(({ node }) => node.featuredImage && node.tags[0].slug)

                .map(({ node }, index) => (
                  <div key={index}>
                    <GatsbyImage
                      image={
                        node.featuredImage?.childImageSharp?.gatsbyImageData
                      }
                      alt={node.title}
                      className="rounded"
                      imgStyle={{ objectFit: "cover" }}
                    />
                    <div className="py-4">
                      <Link
                        to={`/tag/${node.tags[0].slug}`}
                        className="text-xl  py-4 text-gray-600"
                      >
                        <span
                          style={{
                            backgroundColor: "#5F5E5C",
                            color: "#fff",
                          }}
                          className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-stone text-stone-light"
                        >
                          {node.tags[0].name}
                        </span>{" "}
                      </Link>
                    </div>

                    <p className="text-2xl font-semibold">{node.title}</p>
                    <p
                      className="text-lg text-gray-500 py-4 dark:text-gray-200"
                      dangerouslySetInnerHTML={{
                        __html: node.excerpt,
                      }}
                    ></p>
                    <button className="pt-2 pb-1 text-lg border-b-2  text-gray-700 border-gray-700">
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
