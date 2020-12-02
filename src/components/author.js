import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
export const Author = ({ date, timeToRead }) => {
  return (
    <div className="grid  grid-cols-1 py-12 col-gap-24 row-gap-12">
      <StaticQuery
        query={graphql`
          query {
            site {
              siteMetadata {
                title
              }
            }
            smallImage: file(base: { eq: "hero.png" }) {
              childImageSharp {
                fluid(
                  maxHeight: 60
                  maxWidth: 60
                  quality: 100
                  cropFocus: ATTENTION
                ) {
                  ...GatsbyImageSharpFluid_withWebp_noBase64
                }
              }
            }
          }
        `}
        render={({ site, smallImage }) => (
          <div className="flex overflow-hidden max-w-full items-center relative mt-2">
            <div className="relative">
              <Img
                imgStyle={{ objectFit: "cover" }}
                fluid={smallImage.childImageSharp.fluid}
                className="inline-block w-10 h-10 md:w-16 md:h-16   mr-4 rounded-full text-white shadow-solid"
              />{" "}
            </div>
            <div>
              <p className="text-md">
                {site.siteMetadata.title} - Shopify Developer | Full Stack
                Developer | Freelancer
              </p>
              <p className="text-gray-700 block text-md">
                {date} - {timeToRead} min read
              </p>
            </div>
          </div>
        )}
      />
    </div>
  );
};
Author.propTypes = {
  date: PropTypes.node.isRequired,
  timeToRead: PropTypes.node.isRequired,
};
