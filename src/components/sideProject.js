import React from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

export const SideProject = () => {
  return (
    <section className="px-12 py-4">
      <div className="w-2/4 ">
        <h5 className="text-3xl font-bold">
          What I&apos;ve been working on the side
        </h5>
      </div>
      <div className="grid  grid-cols-1 md:grid-cols-2 py-12">
        <p className="w-full text-lg">
          I like to stay busy and always have a project in the works. Take a
          look at some of the my side projects.
        </p>
      </div>

      <div className="grid  grid-cols-1 md:grid-cols-2 py-12 gap-x-24 gap-y-12">
        <StaticQuery
          query={graphql`
            query {
              allSideProject(
                sort: { order: DESC, fields: created_at }
                filter: { featured: { eq: true }, published: { eq: true } }
                limit: 3
              ) {
                edges {
                  node {
                    slug
                    title
                    description
                    tags {
                      name
                      slug
                    }
                    featuredImage {
                      childImageSharp {
                        gatsbyImageData(
                          transformOptions: { cropFocus: CENTER }
                          width: 850
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
          render={({ allSideProject }) => (
            <>
              {allSideProject.edges.map(({ node }, index) => (
                <div key={index}>
                  <GatsbyImage
                    image={node.featuredImage?.childImageSharp?.gatsbyImageData}
                    alt="Ilias"
                    className="rounded"
                    imgStyle={{ objectFit: "cover" }}
                  />
                  <p className="text-2xl font-semibold pt-4">{node.title}</p>
                  <div className="my-4">
                    <span
                      style={{
                        backgroundColor: "#5F5E5C",
                        color: "#fff",
                      }}
                      className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-stone text-stone-light"
                    >
                      {node.tags[0].name}
                    </span>
                  </div>
                  <p className="text-lg text-gray-500 pb-2 dark:text-white">
                    {node.description}
                  </p>

                  <button className=" pb-1  text-lg border-b-2  border-indigo-100border-indigo-100">
                    <Link to={`/project/${node.slug}`}>Read the story</Link>
                  </button>
                </div>
              ))}
            </>
          )}
        />
      </div>
    </section>
  );
};
