import React from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import Img from "gatsby-image";
export const Work = () => {
  return (
    <section className="px-12 py-4 ">
      <div className="w-2/4 ">
        <h5 className="text-3xl font-bold">What I&apos;ve been working on</h5>
      </div>
      <div className="grid  grid-cols-1 md:grid-cols-2 py-12">
        <p className="w-full text-lg">
          I like to stay busy and always have a project in the works. Take a
          look at some of the applications, articles, and companies I&apos;ve
          dedicated my time to.
        </p>
      </div>

      <div className="grid  grid-cols-1 md:grid-cols-2 py-12 col-gap-24 row-gap-12">
        <StaticQuery
          query={graphql`
            {
              allProjects: allMdx(
                filter: {
                  fileAbsolutePath: { regex: "/(projects)/.*\\\\.mdx$/" }
                }
                sort: { fields: frontmatter___date, order: ASC }
              ) {
                nodes {
                  frontmatter {
                    title
                    slug
                    description
                    featuredImage {
                      childImageSharp {
                        fluid(
                          maxHeight: 200
                          maxWidth: 450
                          quality: 100
                          fit: COVER
                          cropFocus: CENTER
                        ) {
                          ...GatsbyImageSharpFluid
                        }
                      }
                    }
                  }
                }
              }
            }
          `}
          render={({ allProjects }) => (
            <>
              {allProjects.nodes.map((project, index) => (
                <div key={index}>
                  <Img
                    imgStyle={{ objectFit: "cover" }}
                    fluid={
                      project.frontmatter.featuredImage.childImageSharp.fluid
                    }
                    className="rounded h-f"
                  />
                  <h5 className="text-xl  py-4 text-gray-600">
                    {project.frontmatter.title}
                  </h5>
                  <p className="text-2xl font-semibold">
                    {project.frontmatter.description}
                  </p>
                  <button className="pt-4 pb-1 text-lg border-b-2">
                    <Link to={project.frontmatter.slug}>
                      View Project Details
                    </Link>
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
