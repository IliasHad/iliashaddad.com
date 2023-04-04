import { Layout } from "../components/Layout";
import { SEO } from "../components/Seo";
import Link from 'next/link'
import Image from "next/legacy/image";
import Img from "../public/images/IMG_7434.jpg"
export default function About({ posts, featuredPost, sideProjects, clientProjects }) {
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
                title="About Me"
                description="About Ilias Haddad"
                featuredImage={"/images/IMG_7434.jpg"}
                url={""}
            />
            <div className=" p-12 gap-12  grid grid-cols-1 md:grid-cols-2 items-center">
                <div>
                    <div className=" w-2/4 ">
                        <h5 className="text-3xl font-bold">About Me</h5>
                    </div>
                    <div className="py-12">
                        <p className="py-4">
                            I&apos;m an experienced and self-taught software engineer with
                            more than 3 years of experience in full-stack dev. I&apos;ve been
                            working with the most popular front-end frameworks(Vue and React),
                            and NodeJs on the backend.
                        </p>
                        <p className="py-4">
                            I&apos;m also a Shopify developer. I help Shopify store owners and
                            clients with their technical needs (custom Shopify theme dev,
                            custom Shopify app dev and speed optimization).
                        </p>
                        <p className="py-4">
                            I love mountain biking, especially long trips where I can visit
                            new places!
                        </p>
                        <p className="py-4">
                            If you need a new custom-made website, a unique Shopify store or
                            app, have an idea of an engaging web application: Please feel free
                            to{" "}
                            <Link
                                style={{ borderBottom: "1px solid #000" }}
                                href="/contact/"
                                legacyBehavior>
                              
                                <span className="font-bold underline cursor-pointer"> contact me</span>
                            </Link>{" "}
                            and we&apos;ll talk about the details!
                        </p>
                     
                    </div>
                </div>
                <div>

                        <Image
                            src={Img}
                            alt={"Ilias Haddad"}
                            placeholder="blur"
                            objectFit="cover"
                            quality={100}
                            layout="responsive"
                            height={600}
                            width={800}
                            className="rounded"
                        />

                </div>
            </div>
        </Layout>
    );
}

