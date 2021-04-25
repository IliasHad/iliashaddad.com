import React from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import Img from "gatsby-image";
export const Work = () => {
  return (
    <StaticQuery
      query={graphql`
        query {
          allGhostPage(
            filter: { tags: { elemMatch: { slug: { eq: "client-project" } } } }
          ) {
            edges {
              node {
                title
                custom_excerpt
                slug

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
        }
      `}
      render={({ allGhostPage }) => (
        <section className="px-12 py-4 ">
          {allGhostPage.edges.length > 0 && (
            <>
              <div className="w-2/4 ">
                <h5 className="text-3xl font-bold">
                  What I&apos;ve been working on with my freelance clients.
                </h5>
              </div>
              <div className="grid  grid-cols-1 md:grid-cols-2 py-12">
                <p className="w-full text-lg">
                  I like to share what I worked on with my clients. Take a look
                  at some of the my work.
                </p>
              </div>

              <div className="grid  grid-cols-1 md:grid-cols-2 py-12 gap-x-24 gap-y-12">
                {allGhostPage.edges.map(({ node }, index) => (
                  <div key={index}>
                    <Img
                      imgStyle={{ objectFit: "cover" }}
                      fluid={node.featureImageSharp.childImageSharp.fluid}
                      className="rounded"
                    />

                    <p className="text-2xl font-semibold pt-4">{node.title}</p>
                    <p className="text-lg text-gray-500 py-2">
                      {node.custom_excerpt}
                    </p>
                    <button className=" pb-1 pt-2 text-lg border-b-2  border-indigo-100border-indigo-100">
                      <Link to={`/project/${node.slug}/`}>Read the story</Link>
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      )}
    />
  );
};
