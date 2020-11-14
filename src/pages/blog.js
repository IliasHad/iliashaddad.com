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
                allPosts: allMdx(
                  filter: {
                    fileAbsolutePath: { regex: "/(blogs)/.*\\\\.mdx$/" }
                  }
                  sort: { fields: frontmatter___date, order: DESC }
                ) {
                  nodes {
                    frontmatter {
                      title
                      slug
                      featured
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
            render={({ allPosts }) => (
              <>
                {allPosts.nodes
                  .filter((post) => post.frontmatter.featured !== null)
                  .map((post, index) => (
                    <div
                      key={index}
                      className="grid  grid-cols-1 md:grid-cols-2 py-12 col-gap-24 row-gap-12"
                    >
                      <Img
                        imgStyle={{ objectFit: "cover" }}
                        fluid={
                          post.frontmatter.featuredImage.childImageSharp.fluid
                        }
                        className="rounded"
                      />

                      <div>
                        <h5 className="text-xl  py-4 text-gray-600">
                          {post.frontmatter.category}
                        </h5>
                        <h2 className="text-2xl font-semibold">
                          {post.frontmatter.title}
                        </h2>
                        <p className="text-lg text-gray-500 py-4">
                          {post.frontmatter.description}
                        </p>
                        <button className=" border-b-2 pt-4 pb-1 text-lg hover:border-b-2 focus:border-b-2">
                          <Link to={post.frontmatter.slug}>Read Article</Link>
                        </button>
                      </div>
                    </div>
                  ))}
                <div className="grid  grid-cols-1 md:grid-cols-3 py-12 col-gap-24 row-gap-8">
                  {allPosts.nodes

                    .filter((post) => post.frontmatter.featured === null)

                    .map((post, index) => (
                      <div key={index}>
                        <Img
                          imgStyle={{ objectFit: "cover" }}
                          fluid={
                            post.frontmatter.featuredImage.childImageSharp.fluid
                          }
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
        </div>
      </section>
    </Layout>
  );
}

export default BlogPage;
