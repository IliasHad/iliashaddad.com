import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { StaticQuery, graphql, Link } from "gatsby";
import Img from "gatsby-image";
function BlogPage() {
  return (
    <Layout>
      <SEO
        keywords={[
          `Shopify Developer`,
          `Freelancer`,
          `Shopify App Developer`,
          `Shopify Theme Developer`,
          `Web App Developer`,
          `Shopify Blog`,
          `Developer Blog`,
          `Developer Portfolio`,
          `Web App Developer Portfolio`,
          `Full Stack Developer Portfolio`,
          `Shopify Developer Portfolio`,
        ]}
        description="Developer Blog"
        title="Blog"
      />
      <section className="p-12 blog-page">
        <div className=" w-2/4 ">
          <h5 className="text-3xl font-bold">Blog</h5>
        </div>
        <div className="grid  grid-cols-1 md:grid-cols-2  py-4">
          <p className="w-full">
            I like to share my knowledge with others. Take a look at some of
            technical articles and behind the scene of my side project
          </p>
        </div>
        <div className="py-4">
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
                          fluid(
                            maxHeight: 450
                            maxWidth: 850
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

                allGhostPost(
                  sort: { order: DESC, fields: created_at }
                  filter: {
                    featured: { eq: false }
                    visibility: { eq: "public" }
                  }
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
                            maxHeight: 400
                            maxWidth: 550
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

                        <p className="text-2xl my-0 py-4 font-semibold">
                          {node.title}
                        </p>
                        <p className="text-lg text-gray-500 py-4">
                          {node.custom_excerpt}
                        </p>
                        <button className=" border-b-2  border-indigo-100pt-4 pb-1 text-lg hover:border-b-2  border-indigo-100focus:border-b-2">
                          <Link to={`/blog/${node.slug}/`}>Read Article</Link>
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

                        <p className="text-2xl my-0 py-4 font-semibold">
                          {node.title}
                        </p>
                        <p className="text-lg text-gray-500 py-4">
                          {node.custom_excerpt}
                        </p>
                        <button className="pt-2 pb-1 text-lg border-b-2">
                          <Link to={`/blog/${node.slug}/`}>Read Article</Link>
                        </button>
                      </div>
                    ))}
                </div>
              </>
            )}
          />
        </div>
      </section>
    </Layout>
  );
}

export default BlogPage;
