import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

export const Testimonials = () => {
  const clients = [
    {
      fullName: "Aziz Tarafder",
      imagePath: "aziz-tarafder.jpeg",
      content:
        "Ilias is a very talented Shopify developer. I hired him to complete some enhancements of my Shopify website (www.tabtime.com). He quickly understood the requirements and then put in place a technical solution that exceeded my expectations. I found him easy to work with and I look forward to working with him in the future.",
      title: "Director of TabTime the UK’s medication management specialist",
    },

    {
      fullName: "Yassine",
      content:
        "Ilias is a very reliable Shopify developer which I can highly recommend to anyone looking to get problems with their store solved fast. We hired him for a very specific functionality that we wanted in our theme and he got the job done in very few hours",
      title: "Founder of Cosmogoods.com",
      imagePath: "yassine.png",
    },
    {
      fullName: "Kristen Ley",
      imagePath: "kristen-ley.jpeg",
      content:
        "He was very helpful in transferring everything over and making our website look just like we wanted it to!",
      title: "Owner, Founder &amp; Creative Director at Thimblepress®",
    },
    {
      fullName: "Melanie Janaya",
      imagePath: "melanie.jpg",
      content:
        "Ilias was wonderful to work with. His english is excellent. He is very efficient. I highly recommend Ilias and hope to work with him again in the future.",
      title: "Founder of Leatherbabyco.com",
    },

    {
      fullName: "Othmane TAKY",
      imagePath: "othmane-taki.jpeg",
      content:
        "Ilias has is professional and executed the project in a timely and smart manner. 100% I recommend and we will work with him again",
      title:
        "Supporting HR executives growing Happiness indicators with tailor-made employee purchase programs",
    },
    {
      fullName: "Aziz Tarafder",
      imagePath: "aziz-tarafder.jpeg",
      content:
        "Ilias produced some significant improvements in my shopify site's speed, reducing load time of the home page by over 50%. A very thorough developer who I look forward to working with again in the future.",
      title: "Director of TabTime the UK’s medication management specialist",
    },
  ];

  return (
    <StaticQuery
      query={graphql`
        {
          images: allFile(filter: { relativeDirectory: { eq: "clients" } }) {
            nodes {
              base
              childImageSharp {
                fixed(
                  height: 50
                  width: 50
                  quality: 100
                  cropFocus: ATTENTION
                ) {
                  ...GatsbyImageSharpFixed_withWebp_noBase64
                }
              }
            }
          }
        }
      `}
      render={(data) => (
        <section className="px-12 py-4 testimonials">
          <div className="w-2/4 ">
            <h5 className="text-3xl font-bold">Testimonials</h5>
          </div>
          <div className="grid  grid-cols-1 md:grid-cols-2  py-12">
            <p className="w-full">What my clients are saying:</p>
          </div>
          <div className="flex flex-wrap  py-4">
            {clients.map((client, index) => (
              <div key={index} className="p-4 md:w-1/2 w-full">
                <div className="h-full bg-gray-200  testimonials-item p-8 rounded">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="block w-5 h-5 text-gray-400 mb-4"
                    viewBox="0 0 975.036 975.036"
                  >
                    <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                  </svg>
                  <p className="leading-relaxed mb-6">{client.content}</p>
                  <a className="inline-flex items-center">
                    <Img
                      imgStyle={{ objectFit: "cover" }}
                      alt={client.fullName}
                      fixed={
                        data.images.nodes.filter(
                          (image) => image.base === client.imagePath
                        )[0].childImageSharp.fixed
                      }
                      className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
                    />

                    <span className="flex-grow flex flex-col pl-4">
                      <span className="title-font font-medium text-gray-900">
                        {client.fullName}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {client.title}
                      </span>
                    </span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    />
  );
};
