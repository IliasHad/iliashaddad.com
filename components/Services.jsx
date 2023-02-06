/* This example requires Tailwind CSS v2.0+ */
import {
  TerminalIcon,
  CodeIcon,
  AdjustmentsIcon,
} from "@heroicons/react/outline";
import React from "react";
import { Calendar } from "../components/Calendar";

const supportLinks = [
  {
    name: "Store Setup & Theme Development",
    href: "#",
    description:
      "Creating a stunning, responsive, and performant eCommerce Shopify store with the latest technologies and make it fully customizable, so you can play with it without a coding background.",
    icon: CodeIcon,
  },
  {
    name: "Shopify Custom Development",
    href: "#",
    description:
      "Building a custom Shopify storefront using SSG (Static Site Generators) or adding a custom integration to your Shopify store ",
    icon: AdjustmentsIcon,
  },
  {
    name: "Web App Development",
    href: "#",
    description:
      "Turning your idea into life using a modern tech stack (MERN Stack: Mongo, Express, React, and Node js) and help you achieve your business goals. ",
    icon: TerminalIcon,
  },
];

export const Services = () => {
  return (
    <div className="px-12 py-4 ">
      <div className="mx-auto max-w-7xl py-16 sm:py-24 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold"> What I can help you with.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-xl text-gray-500">
          </p>
        </div>
      </div>
      
      {/* Header */}

      {/* Overlapping cards */}
      <section
        className="mx-auto relative  py-20"
        aria-labelledby="contact-heading"
      >
        <h2 className="sr-only" id="contact-heading">
          Contact us
        </h2>
        <div className="grid grid-cols-1 gap-col-20 gap-10 lg:grid-cols-3 lg:gap-col-0 lg:gap-row-8">
          {supportLinks.map((link) => (
            <div key={link.name} className="bg-stone text-center rounded-2xl shadow-sm">
              <div className="relative pt-16 px-6 pb-8 md:px-8">
                <div className="absolute top-0 left-1/2 p-5 rounded-full inline-block bg-black shadow-lg transform -translate-y-1/2 -translate-x-1/2">
                  <link.icon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-xl  font-medium text-white">
                  {link.name}
                </h3>
                <p className="mt-4 text-base text-white">
                  {link.description}
                </p>
              </div>
              <div className="p-6 rounded-bl-2xl rounded-br-2xl md:px-8">
                <Calendar
                  utm={{
                    utmCampaign: "Services Section",
                    utmContent: link.name,
                    utmMedium: "Personal Blog",
                    utmSource: "iliashaddad.com",
                  }}
                  textColor="text-white"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
