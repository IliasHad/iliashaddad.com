import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { Contact } from "../components/contact";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaMedium,
  FaGithub,
  FaProductHunt,
} from "react-icons/fa";
function ContactPage() {
  return (
    <Layout>
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title="Home"
      />
      <section
        style={{ gridTemplateColumns: "30% 1fr" }}
        className="p-12 contact-page grid sm:grid-cols-1 grid-cols-1 justify-center col-gap-10 row-gap-6 "
      >
        <div className="">
          <h5 className="text-3xl font-bold">
            I’m excited to learn about your project. Ready to get started?
          </h5>
          <div className="py-4">
            <p className="py-2">
              Email:
              <a
                href="mailto:iliasshaddaddev@gmail.com"
                className="pl-2"
                target="__blank"
              >
                iliashaddaddev@gmail.com
              </a>
            </p>

            <div className="grid md:col-gap-4 col-gap-8 grid-cols-6  py-3">
              <a
                href="https://web.facebook.com/iliasshaddad99/"
                target="__blank"
              >
                <FaFacebook className="h-6 w-6" />
              </a>
              <a href="https://www.instagram.com/iliashaddad3" target="__blank">
                <FaInstagram className="h-6 w-6" />
              </a>
              <a href="https://medium.com/@iliashaddad" target="__blank">
                <FaMedium className="h-6 w-6" />
              </a>
              <a href="https://twitter.com/IliasHaddad3" target="__blank">
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="https://github.com/IliasHad" target="__blank">
                <FaGithub className="h-6 w-6" />
              </a>
              <a href="https://producthunt.com/@IliasHaddad3" target="__blank">
                <FaProductHunt className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div>
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            className="grid md:grid-cols-2 grid-cols-1 "
          >
            <div className="p-2 ">
              <label htmlFor="name" className="text-base ">
                Name
              </label>
              <input
                className="w-full rounded border my-2  focus:outline-none focus:border-indigo-500 text-base px-4 py-2"
                placeholder="Name"
                type="text"
                name="Name"
                id="name"
              />
            </div>

            <div className="p-2 ">
              <label htmlFor="email" className="text-base ">
                Email
              </label>
              <input
                className="w-full  rounded border my-2  focus:outline-none focus:border-indigo-500 text-base px-4 py-2"
                placeholder="Email"
                type="email"
                name="Email"
                id="email"
              />
            </div>
            <div className="p-2 ">
              <label htmlFor="project-type" className="text-base ">
                Type of project
              </label>
              <select
                id="project-type"
                name="Project Type"
                required
                className="w-full my-2  rounded border focus:outline-none focus:border-indigo-500 text-base px-4 py-2"
              >
                <option>Web app</option>
                <option>Custom Shopify App</option>
                <option>Custom Shopify Theme</option>
                <option>Other</option>
              </select>
            </div>
            <div className="p-2 ">
              <label htmlFor="budget" className="text-base ">
                Budget
              </label>
              <select
                id="budget"
                name="Budget"
                required
                className="w-full  my-2 rounded border focus:outline-none focus:border-indigo-500 text-base px-4 py-2"
              >
                <option>Less than $1000</option>
                <option>$1000 - $5000</option>
                <option>More than$5000</option>
              </select>
            </div>

            <div
              className="p-2 "
              style={{
                gridColumn: "1/-1",
              }}
            >
              <label htmlFor="project-details" className="text-base ">
                Project Details
              </label>

              <textarea
                id="project-details"
                className="w-full my-2  rounded border focus:outline-none h-48 focus:border-indigo-500 text-base px-4 py-2 resize-none block"
                placeholder="Project Details"
              ></textarea>
            </div>
            <div
              className="p-2 "
              style={{
                justifySelf: "start",
              }}
            >
              <button className="flex mx-auto text-white bg-black border-0 py-2 px-8 focus:outline-none hover:bg-gray-600 rounded text-lg">
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>

      <Contact />
    </Layout>
  );
}

export default ContactPage;
