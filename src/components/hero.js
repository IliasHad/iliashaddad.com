import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
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
          heroImage: file(absolutePath: { regex: "//.*\\\\hero.jpeg$/" }) {
            childImageSharp {
              fixed(
                height: 350
                width: 550
                quality: 100
                cropFocus: ATTENTION
              ) {
                ...GatsbyImageSharpFixed
              }
            }
          }
          smallImage: file(absolutePath: { regex: "//.*\\\\hero.jpeg$/" }) {
            childImageSharp {
              fixed(height: 40, width: 40, quality: 100, cropFocus: ATTENTION) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      `}
      render={(data) => (
        <div className=" p-12  grid grid-cols-1 md:grid-cols-2 items-center">
          <div>
            <h1 className=" text-4xl font-bold ">
              Hi there, I&apos;m Ilias. Full Stack Developer, Indie Maker, and
              Freelancer.
            </h1>

            <div className="flex overflow-hidden items-center relative mt-2">
              <div className="relative">
                <Img
                  imgStyle={{ objectFit: "cover" }}
                  fixed={data.smallImage.childImageSharp.fixed}
                  className="inline-block h-10 w-10  mr-4 rounded-full text-white shadow-solid"
                />{" "}
                <span className="h-4 w-4 bg-green-400 mx-4 -mt-1 border-gray-100 border-2   rounded-full right-0 top-0  absolute"></span>
              </div>{" "}
              <p className="py-4 text-gray-700 text-md">
                Reply time: within 1-2 working days
              </p>
            </div>
          </div>

          <div>
            <Img
              imgStyle={{ objectFit: "cover" }}
              fixed={data.heroImage.childImageSharp.fixed}
              className="rounded"
            />{" "}
          </div>
        </div>
      )}
    />
  );
};
