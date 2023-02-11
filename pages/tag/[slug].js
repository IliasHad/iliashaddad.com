import { getAllPublished, getBlogPostsByTag} from "../../lib/notion";
import Image from 'next/image'
import { Layout } from "../../components/Layout";
import ThemeContext from "../../context/ThemeContext";
import { useContext } from "react";
import { SEO } from "../../components/Seo";
import Link from 'next/link'

const Tag = ({ posts, title }) => {
    const { toggleDark, darkMode } = useContext(ThemeContext);


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
                description="Developer Blog"
                title="Blog"
            />
            <section className="p-12 blog-page">
                <div className="mx-auto max-w-7xl py-16 sm:py-24 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">{ title}</h2>
                        <p className="mx-auto mt-5 max-w-xl text-xl text-gray-500">
                            I like to share my knowledge with others. Take a look at some of
                            technical articles and behind the scene of my side project
                        </p>
                    </div>
                </div>
                <div className="py-4">

                    <div className="grid  grid-cols-1 md:grid-cols-3 py-12 gap-x-24 gap-y-8">
                        {posts.map((post, index) => (
                            <div key={index}>
                                <Image
                                    src={post.featuredImage}
                                    alt={post.title}
                                    objectFit="cover"
                                    quality={100}
                                    layout="responsive"
                                    height={400}
                                    width={500}
                                    className="rounded"
                                />
                                <div className="py-4">
                                    <Link
                                        href={`/tag/${post.tags[0]}`}
                                        className="text-xl  py-4 text-gray-600"
                                    >
                                        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-stone text-stone-light">
                                            {post.tags[0]}
                                        </span>
                                    </Link>
                                </div>

                                <p className="text-2xl font-semibold">{post.title}</p>
                                <p className="text-md my-2 text-gray-500 ">  {post.date}</p>


                                <p
                                    className="text-lg text-gray-500 py-4 dark:text-white"
                                    dangerouslySetInnerHTML={{
                                        __html: post.description,
                                    }}
                                ></p>
                                <button className="pt-2 pb-1 text-lg border-b-2">
                                    <Link href={`/blog/${post.slug}`}>Read Article</Link>
                                </button>
                            </div>
                        ))}
                    </div>

                </div>
            </section>
        </Layout>
    );
};

export const getStaticProps = async ({ params }) => {
    const posts = await getBlogPostsByTag(params.slug)
    return {
        props: {
            posts,
            title: params.slug
        },
        revalidate: 60
    };
};

export const getStaticPaths = async () => {
    const posts = await getAllPublished()
    const paths = posts.map(({ slug }) => ({ params: { slug } }));
    return {
        paths,
        fallback: "blocking",
    };
};

export default Tag;

