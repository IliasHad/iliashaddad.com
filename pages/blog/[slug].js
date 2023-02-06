import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { getAllPublished, getSingleBlogPostBySlug } from "../../lib/notion";
import Image from "next/legacy/image";
import { Layout } from "../../components/Layout";
import ThemeContext from "../../context/ThemeContext";
import { useContext } from "react";
import { SEO } from "../../components/Seo";
import Link from 'next/link'
import { FaTwitter } from "react-icons/fa";
import { DiscussionEmbed } from "disqus-react"

const CodeBlock = ({ language, codestring }) => {
  return (
    <SyntaxHighlighter language={language} style={vscDarkPlus} PreTag="div">
      {codestring}
    </SyntaxHighlighter>
  )
}
const Post = ({ post }) => {
  const { toggleDark, darkMode } = useContext(ThemeContext);
  const disqusShortname = "iliashaddad"
  const disqusConfig = {
    url: `https://iliashaddad.com/blog/${post.metadata.slug}`,
    identifier: `/blog/${post.metadata.slug}`, // Single post id
    title: post.metadata.title // Single post title
  }

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
        title={post.metadata.title}
      />
      <div className="relative blog-page py-16  overflow-hidden">
        <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full"></div>
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="text-lg max-w-prose mx-auto">
            <h1>
              <span
                className={

                  "mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-white sm:text-4xl"
                }
              >
                {post.metadata.title}
              </span>
            </h1>
            <div className="py-8">
              <Image
                src={post.metadata.featuredImage}
                alt={post.metadata.title}
                placeholder="blurred"
                objectFit="cover"
                quality={100}
                layout="responsive"
                height={400}
                width={500}
                className="rounded"
              />
            </div>
          </div>

          <div
            className={
              darkMode
                ? "mt-6 prose prose-indigo prose-lg text-white mx-auto dark:prose-invert"
                : "mt-6 prose prose-indigo prose-lg text-gray-700 mx-auto"
            }
          >
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '')
                  return !inline && match ? (
                    <CodeBlock
                      codestring={String(children).replace(/\n$/, '')}
                      language={match[1]}
                    />
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                }
              }}>{post.markdown}</ReactMarkdown>
          </div>
          <div className="mt-6 mx-auto" style={{ maxWidth: "70ch" }}>
            <div className="flex md:flex-row flex-col  gap-4  ">
              {post.metadata.tags.map((tag, index) => (
                <Link
                  href={`/tag/${encodeURIComponent(tag)}`}
                  className="text-xl  py-4 text-gray-600 cursor-pointer"
                  key={index}
                  legacyBehavior>
                  <span
                    style={{
                      backgroundColor: "#5F5E5C",
                      color: "#fff"
                    }}
                    className="inline-flex  cursor-pointer dark:text-white items-center px-3 py-0.5 rounded-full text-sm font-medium bg-stone text-stone-light"
                  >
                    {tag}
                  </span>
                </Link>
              ))}
            </div>
            <div className="my-8 prose prose-indigo">
              <a
                className="flex gap-4 "
                target="__blank"
                href={`http://www.twitter.com/share?url=iliashaddad.com/blog/${post.metadata.slug}&text=${post.metadata.title} by @iliashaddad3`}
              >
                {" "}
                Let&apos;s discuss it on Twitter
                <FaTwitter className="h-6 w-6" />
              </a>
            </div>


            <div className="my-8">
              <DiscussionEmbed
                config={disqusConfig}
                shortname={disqusShortname}
              />
            </div>
            {post.relatedPosts.length > 0 && (
              <h1>
                <h1>
                  <span
                    className={
                      darkMode
                        ? "mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-white sm:text-4xl"
                        : "mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl"
                    }
                  >
                    Related Posts
                  </span>
                </h1>
                <div className="grid  grid-cols-1 md:grid-cols-2 py-12 gap-x-24 gap-y-8">
                  {post.relatedPosts
                    .map((relatedPost, index) => (
                      <div key={relatedPost.id}>
                        <Image
                          src={relatedPost.featuredImage}
                          alt={relatedPost.title}
                          placeholder="blurred"
                          objectFit="cover"
                          quality={100}
                          layout="responsive"
                          height={400}
                          width={500}
                          className="rounded"
                        />
                        <div className="py-4">
                          <Link
                            href={`/tag/${encodeURIComponent(relatedPost.tags[0])}`}
                            className="text-xl  py-4 text-gray-600"
                            key={index}
                            legacyBehavior>
                            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-stone text-stone-light">
                              {relatedPost.tags[0]}
                            </span>
                          </Link>
                        </div>

                        <p className="text-2xl font-semibold">{relatedPost.title}</p>
                        <p className="text-md my-2 text-gray-500 ">  {relatedPost.date}</p>


                        <p
                          className="text-lg text-gray-500 py-4 dark:text-gray-700"
                          dangerouslySetInnerHTML={{
                            __html: relatedPost.description,
                          }}
                        ></p>
                        <button className="pt-2 pb-1 text-lg border-b-2  text-gray-500 border-gray-700">
                          <Link href={`/blog/${relatedPost.slug}`}>Read Article</Link>
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
};

export const getStaticProps = async ({ params }) => {
  const post = await getSingleBlogPostBySlug(params.slug)
  return {
    props: {
      post,
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

export default Post;

