/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useState, useContext } from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";

import { FaTwitter } from "react-icons/fa";
import addToMailchimp from "gatsby-plugin-mailchimp";
import { Disqus } from "gatsby-plugin-disqus";
import ThemeContext from "../context/ThemeContext";
import Img from "gatsby-image";
import rehypeReact from "rehype-react";
import { ImgSharpInline } from "../components/gatsby-image";

const renderAst = new rehypeReact({
  Fragment: React.Fragment,
  createElement: React.createElement,
  components: { "img-sharp-inline": ImgSharpInline },
}).Compiler;
export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { ghostPost, allGhostPost } = data; // data.mdx holds your post data

  console.log(data);
  console.log(useContext(ThemeContext));
  const theme = useContext(ThemeContext);
  let disqusConfig = {
    url: `https://iliashaddad.com/blog/${ghostPost.slug}`,
    identifier: `/blog/${ghostPost.slug}`,
    title: ghostPost.title,
  };
  const [email, setEmail] = useState("");

  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState(
    " Subscribe below to get notified of new posts."
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    addToMailchimp(email, {
      PATHNAME: `/blog/${ghostPost.slug}`,
    })
      .then(() => {
        // I recommend setting data to React state
        // but you can do whatever you want (including ignoring this `then()` altogether)
        setSuccess(true);
        setMessage("Thank you for subscribing! ");

        window.plausible("New-Subscriber", {
          callback: () => console.info("New Subscriber event"),
        });
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
        published_time={ghostPost.created_at}
        tag={ghostPost.primary_tag.name}
        title={ghostPost.title}
        description={ghostPost.description}
      />
      <div className="relative blog-page py-16  overflow-hidden">
        <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full"></div>
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="text-lg max-w-prose mx-auto">
            <h1>
              <span
                className={
                  theme.darkMode
                    ? "mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-white sm:text-4xl"
                    : "mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl"
                }
              >
                {ghostPost.title}
              </span>
            </h1>
            <div className="py-8">
              <Img fluid={ghostPost.featureImageSharp.childImageSharp.fluid} />
            </div>
          </div>
          <div
            className={
              theme.darkMode
                ? "mt-6 prose prose-indigo prose-lg text-white mx-auto"
                : "mt-6 prose prose-indigo prose-lg text-gray-700 mx-auto"
            }
          >
            {renderAst(ghostPost.childHtmlRehype.htmlAst)}{" "}
          </div>
          <div className="mt-6 mx-auto" style={{ maxWidth: "70ch" }}>
            <div className="flex md:flex-row flex-col  gap-4  ">
              {ghostPost.tags.map((tag) => (
                <Link
                  to={`/tag/${tag.slug}/`}
                  key={tag.slug}
                  className="inline-block"
                >
                  <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                    {tag.name}
                  </span>
                </Link>
              ))}
            </div>
            <div className="my-8 prose prose-indigo">
              <a
                className="flex gap-4 "
                target="__blank"
                href={`http://www.twitter.com/share?url=iliashaddad.com/blog/${ghostPost.slug}&text=${ghostPost.title} by @iliashaddad3`}
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
            <div className="my-8">
              <Disqus config={disqusConfig} />
            </div>
            {allGhostPost.edges.length > 0 && (
              <h1>
                <h1>
                  <span
                    className={
                      theme.darkMode
                        ? "mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-white sm:text-4xl"
                        : "mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl"
                    }
                  >
                    Related Posts
                  </span>
                </h1>
                <div className="grid  grid-cols-1 md:grid-cols-2 py-12 gap-x-24 gap-y-8">
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
                        <p className="text-lg py-4 lg:text-gray-500">
                          {node.custom_excerpt}
                        </p>
                        <button className="pt-2 pb-1 border-b-2  border-indigo-100text-lg ">
                          <Link to={`/blog/${node.slug}/`}>Read Article</Link>
                        </button>
                      </div>
                    ))}
                </div>
              </h1>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const postQuery = graphql`
  query($slug: String!, $tag: String!) {
    ghostPost(slug: { eq: $slug }) {
      title
      slug
      childHtmlRehype {
        htmlAst
        html
      }
      created_at
      featureImageSharp {
        childImageSharp {
          fluid(maxWidth: 700, quality: 100) {
            ...GatsbyImageSharpFluid_withWebp_noBase64
          }
        }
      }
      primary_tag {
        name
      }
      tags {
        name
        slug
      }
      html
    }
    allGhostPost(
      filter: {
        tags: { elemMatch: { slug: { eq: $tag } } }
        slug: { ne: $slug }
      }

      sort: { fields: created_at, order: DESC }
      limit: 3
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
                maxHeight: 200
                maxWidth: 350
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
`;
