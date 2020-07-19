import React from "react";
import { StaticQuery, graphql } from "gatsby";
export const Hero = () => {
  return (
    <StaticQuery
      query={graphql`
        query HeadingQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={() => (
        <div className=" p-12  grid grid-cols-1 md:grid-cols-2 items-center">
          <div>
            <h1 className=" text-4xl font-bold ">
              Hi there, I&apos;m Ilias. Full Stack Developer, Indie Maker, and
              Freelancer.
            </h1>

            <p className="py-4 text-gray-700 text-md">
              Reply time: within 1-2 working days
            </p>
          </div>

          <div>
            <img src={"/hero-image.jpg"} className="rounded" alt="Logo" />
          </div>
        </div>
      )}
    />
  );
};
