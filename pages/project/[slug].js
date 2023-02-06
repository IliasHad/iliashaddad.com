import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { getAllSideProjects, getAllClientsProjects, getProjectBySlug } from "../../lib/notion";
import Image from "next/legacy/image";
import { Layout } from "../../components/Layout";
import ThemeContext from "../../context/ThemeContext";
import { useContext } from "react";
import { SEO } from "../../components/Seo";

const CodeBlock = ({ language, codestring }) => {
    return (
        <SyntaxHighlighter language={language} style={vscDarkPlus} PreTag="div">
            {codestring}
        </SyntaxHighlighter>
    )
}
const Project = ({ project }) => {
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
                title={project.metadata.title}
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
                                {project.metadata.title}
                            </span>
                        </h1>
                        <div className="py-8">
                            <Image
                                src={project.metadata.featuredImage}
                                alt={project.metadata.title}
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
                            }}>{project.markdown}</ReactMarkdown>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export async function getServerSideProps(context) {
    const project = await getProjectBySlug(context.params.slug, context.query.type)
    return {
        props: {
            project,
        },
    };
};



export default Project;

