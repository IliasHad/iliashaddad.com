/* eslint-disable react/prop-types */

import React, { useState } from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Author } from "../components/author";
import { MDXProvider } from "@mdx-js/react";
import { components } from "../layouts/post-layout";
import { FaTwitter } from "react-icons/fa";
import addToMailchimp from "gatsby-plugin-mailchimp";

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { mdx } = data; // data.mdx holds your post data
  const { frontmatter, body, timeToRead } = mdx;

  const [email, setEmail] = useState("");

  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState(
    " Subscribe below to get notified of new posts."
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    addToMailchimp(email, {
      PATHNAME: frontmatter.slug,
    })
      .then(() => {
        // I recommend setting data to React state
        // but you can do whatever you want (including ignoring this `then()` altogether)
        setSuccess(true);
        setMessage("Thank you for subscribing! ");
      })
      .catch(() => {
        // unnecessary because Mailchimp only ever
        // returns a 200 status code
        // see below for how to handle errors
      });
  };
  return (
    <Layout>
      <SEO
        title={frontmatter.title}
        description={frontmatter.description}
        featuredImage={`https://iliashaddad.com${frontmatter.featuredImage.childImageSharp.original.src}`}
      />
      <div>
        <article
          className="my-12  px-12 md:flex "
          style={{
            width: "100%",

            justifyContent: "center",
          }}
        >
          <div className="blog-post md:max-w-2xl max-w-3xl ">
            <h1 className="md:text-4xl text-2xl  tracking-tighter">
              {frontmatter.title}
            </h1>
            <Author date={frontmatter.date} timeToRead={timeToRead} />
            <MDXProvider components={components}>
              <MDXRenderer>{body}</MDXRenderer>
            </MDXProvider>
            <div className="my-4">
              <a
                className="flex gap-4 "
                target="__blank"
                href={`http://www.twitter.com/share?url=iliashaddad.com/${frontmatter.slug}&text=${frontmatter.title} by @iliashaddad3`}
              >
                {" "}
                Let&apos;s discuss it on Twitter
                <FaTwitter className="h-6 w-6" />
              </a>
            </div>
            <h5 className="mt-8 text-xl">{message}</h5>
            <div className="mt-4">
              <form
                onSubmit={handleSubmit}
                className={success ? "hidden" : "sm:flex"}
                aria-labelledby="newsletter-headline"
              >
                <input
                  aria-label="Email address"
                  id="list_email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required=""
                  className="appearance-none w-full px-5 py-3 border border-gray-300 text-base leading-6 rounded-md text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:shadow-outline focus:border-primary-300 transition duration-150 ease-in-out sm:max-w-xs"
                  placeholder="Enter your email"
                />
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                  <button
                    type="submit"
                    className="font-sans w-full flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md  bg-black text-white focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </article>
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      body
      timeToRead
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        description
        title
        featuredImage {
          childImageSharp {
            original {
              src
            }
          }
        }
      }
    }
  }
`;
