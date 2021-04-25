/* eslint-disable no-unused-vars */
import React, { useRef, useEffect } from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import Img from "gatsby-image";
import Layout from "../components/layout";
import SEO from "../components/seo";
import {
  CalendlyEventListener,
  openPopupWidget,
  closePopupWidget,
} from "react-calendly";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaMedium,
  FaGithub,
  FaProductHunt,
  FaLinkedin,
  FaYoutube,
  FaCalendar,
} from "react-icons/fa";
function InstagramPage() {
  const ref = useRef(null);

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        closePopupWidget();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
  return (
    <Layout>
      <SEO title="Instagram" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaticQuery
          query={graphql`
            query {
              heroImage: file(base: { eq: "hero.png" }) {
                childImageSharp {
                  fluid(
                    maxHeight: 100
                    maxWidth: 100
                    quality: 100
                    cropFocus: ATTENTION
                  ) {
                    ...GatsbyImageSharpFluid_withWebp_noBase64
                  }
                }
              }
            }
          `}
          render={(data) => (
            <div className="max-w-xl mx-auto">
              {console.log(data)}
              <div className="flex-shrink-0 group block py-6">
                <div className="flex flex-col items-center">
                  <div>
                    <Img
                      className="inline-block h-24 w-24 rounded-full"
                      fluid={data.heroImage.childImageSharp.fluid}
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-md font-medium  group-hover:text-gray-900">
                      Ilias Haddad
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4  justify-items-center items-center">
                <div className="w-full bg-white px-4 py-4 shadow-sm">
                  <a
                    target="__blank"
                    href="https://www.linkedin.com/in/ilias-haddad/"
                    className="flex gap-4 justify-center"
                  >
                    <FaLinkedin className="h-6 w-6" />
                    Let&apos;s connect On LinkedIn
                  </a>
                </div>
                <div className="w-full bg-white px-4 py-4 shadow-sm">
                  <a
                    target="__blank"
                    href="https://medium.com/@iliashaddad"
                    className="flex gap-4 justify-center"
                  >
                    <FaMedium className="h-6 w-6" />
                    Check out my articles on Medium
                  </a>
                </div>
                <div className="w-full bg-white px-4 py-4 shadow-sm">
                  <a
                    target="__blank"
                    href="https://github.com/IliasHad/"
                    className="flex justify-center gap-4"
                  >
                    <FaGithub className="h-6 w-6" />
                    Check out my Github profile
                  </a>
                </div>
                <div className="w-full bg-white px-4 py-4 shadow-sm">
                  <a
                    target="__blank"
                    href="https://twitter.com/IliasHaddad3"
                    className="flex gap-4 justify-center"
                  >
                    <FaTwitter className="h-6 w-6" />
                    Follow Me On Twitter
                  </a>
                </div>
                <div className="w-full bg-white px-4 py-4 shadow-sm">
                  <a
                    target="__blank"
                    href="https://www.youtube.com/channel/UCxv_k9zRHdz5L1av2xgEAMA"
                    className="flex gap-4 justify-center "
                  >
                    <FaYoutube className="h-6 w-6" />
                    Subscribe to my Youtube Channel
                  </a>
                </div>

                <div ref={ref} className="w-full bg-white px-4 py-4 shadow-sm">
                  <button
                    onClick={() =>
                      openPopupWidget({
                        url: "https://calendly.com/iliashaddad/discovery-call",
                      })
                    }
                    className="flex w-full gap-4 justify-center"
                  >
                    <FaCalendar className="h-6 w-6" />
                    Book a discovery call
                  </button>
                </div>
              </div>
            </div>
          )}
        />
      </div>
      <CalendlyEventListener
        onDateAndTimeSelected={function noRefCheck() {
          if (typeof window !== "undefined" && window !== undefined) {
            // browser code
            window.plausible("Meeting-Date-Selected", {
              callback: () => console.info(""),
            });
          }
        }}
        onEventScheduled={function noRefCheck() {
          if (typeof window !== "undefined" && window !== undefined) {
            // browser code
            window.plausible("Meeting-Event-Scheduled", {
              callback: () => console.info(""),
            });
          }
        }}
        onEventTypeViewed={function noRefCheck() {
          if (typeof window !== "undefined" && window !== undefined) {
            // browser code
            window.plausible("Meeting-Event-Viewed", {
              callback: () => console.info(""),
            });
          }
        }}
      ></CalendlyEventListener>
    </Layout>
  );
}

export default InstagramPage;
