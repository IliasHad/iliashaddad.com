import React, { useRef, useState } from "react";
import { Layout } from "../components/Layout";
import { SEO } from "../components/Seo";
import axios from "axios";
import { Calendar } from "../components/Calendar";
import { usePlausible } from 'next-plausible'

import {
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaMedium,
    FaGithub,
    FaLinkedin,
    FaYoutube,
} from "react-icons/fa";

export default function Contact({ posts, featuredPost, sideProjects, clientProjects }) {
    const projectType = useRef();
    const budget = useRef();
    const name = useRef();
    const email = useRef();
    const message = useRef();
    const [success, setSuccess] = useState(false);
    const plausible = usePlausible()

    const handleSubmit = (e) => {
        e.preventDefault();
        plausible("Project-Details-Sent");
        const data = {
            projectType: projectType.current.value,
            budget: budget.current.value,
            name: name.current.value,
            email: email.current.value,
            message: message.current.value,
        };
        axios.post(`/api/contact`, { data }).then((res) => {
            console.log(res);
            console.log(res.data);

            setSuccess(JSON.parse(res.data.success));
        });
    };
    return (
        <Layout>
            <SEO
                keywords={[
                    `Shopify Developer`,
                    `Freelancer`,
                    `Shopify App Developer`,
                    `Shopify Theme Developer`,
                    `Web App Developer`,
                    `Shopify Blog`,
                    `Developer Blog`,
                    `Developer Portfolio`,
                    `Web App Developer Portfolio`,
                    `Full Stack Developer Portfolio`,
                    `Shopify Developer Portfolio`,
                ]}
                title="Contact"
                description="Feel free to reach out if you're looking for a developer, have a question, or just want to connect."
            />
            <section
                style={{ gridTemplateColumns: "30% 1fr" }}
                className="p-12 contact-page grid sm:grid-cols-1 grid-cols-1 justify-center gap-row-10 gap-col-6 "
            >
                <div className="">
                    <h5 className="text-3xl font-bold">
                        I’m excited to learn about your project. Ready to get started?
                    </h5>
                    <div className="py-4">
                        <p className="py-2">
                            Email:
                            <a
                                href="mailto:contact@iliashaddad.com"
                                className="pl-2"
                                target="__blank"
                            >
                                contact [at] iliashaddad.com
                            </a>
                        </p>

                        <div
                            className="grid grid-cols-6 py-6"
                            style={{
                                columnGap: "2rem",
                                gridTemplateColumns: "repeat(7, minmax(0, max-content))",
                                justifyItems: "start",
                            }}
                        >
                            <a
                                href="https://www.linkedin.com/in/ilias-haddad/"
                                target="__blank"
                            >
                                <FaLinkedin className="h-6 w-6" />
                            </a>
                            <a href="https://web.facebook.com/iliasshaddad99/" target="__blank">
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
                            <a
                                href="https://www.youtube.com/channel/UCxv_k9zRHdz5L1av2xgEAMA"
                                target="__blank"
                            >
                                <FaYoutube className="h-6 w-6" />
                            </a>
                        </div>

                        <div className="my-4">
                            <Calendar
                                utm={{
                                    utmCampaign: "Footer Section",
                                    utmMedium: "Personal Blog",
                                    utmSource: "iliashaddad.com",
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <form
                        onSubmit={handleSubmit}
                        name="contact"
                        className="grid md:grid-cols-2 grid-cols-1 "
                    >
                        {success && (
                            <div
                                style={{
                                    gridColumn: "1/-1",
                                }}
                                className="bg-teal-100 my-2 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
                                role="alert"
                            >
                                <div className="flex">
                                    <div className="py-1">
                                        <svg
                                            className="fill-current h-6 w-6 text-teal-500 mr-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-bold">Your project details have sent</p>
                                        <p className="text-sm">
                                            Reply time: within 1-2 working days
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="p-2 ">
                            <label htmlFor="name" className="text-base ">
                                Name
                            </label>
                            <input
                                ref={name}
                                className="w-full rounded border my-2  focus:outline-none focus:border-indigo-500 text-base px-4 py-2  dark:text-black"
                                placeholder="Name"
                                type="text"
                                name="Name"
                                required
                                id="name"
                            />
                        </div>

                        <div className="p-2 ">
                            <label htmlFor="email" className="text-base ">
                                Email
                            </label>
                            <input
                                className="w-full  rounded border my-2  focus:outline-none focus:border-indigo-500 text-base px-4 py-2  dark:text-black"
                                placeholder="Email"
                                type="email"
                                name="Email"
                                id="email"
                                required
                                ref={email}
                            />
                        </div>
                        <div className="p-2 ">
                            <label htmlFor="project-type" className="text-base ">
                                Type of project
                            </label>
                            <select
                                ref={projectType}
                                id="project-type"
                                name="Project Type"
                                required
                                className="w-full my-2  rounded border focus:outline-none focus:border-indigo-500 text-base px-4 py-2 dark:text-black"
                            >
                                <option>Web app</option>
                                <option>Custom Shopify App</option>
                                <option>Custom Shopify Theme</option>
                                <option>Custom Shopify Work</option>
                            </select>
                        </div>
                        <div className="p-2 ">
                            <label htmlFor="budget" className="text-base ">
                                Budget
                            </label>
                            <select
                                ref={budget}
                                id="budget"
                                name="Budget"
                                required
                                className="w-full  my-2 rounded border focus:outline-none focus:border-indigo-500 text-base px-4 py-2  dark:text-black"
                            >
                                <option>100$ - $500</option>
                                <option>500$ - $1000</option>
                                <option>$1000 - $5000</option>
                                <option>More than $5000</option>
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
                                ref={message}
                                id="project-details"
                                className="w-full my-2   dark:text-black rounded border focus:outline-none h-48 focus:border-indigo-500 text-base px-4 py-2 resize-none block"
                                placeholder="Project Details"
                                required
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
        </Layout>
    )
}

