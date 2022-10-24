import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { getAllPublished, getSingleBlogPostBySlug } from "../../lib/notion";
import styles from '../../styles/Home.module.css'

const CodeBlock = ({ language, codestring }) => {
return (
    <SyntaxHighlighter language={language} style={vscDarkPlus} PreTag="div">
        {codestring}
    </SyntaxHighlighter>
)
}
const Post = ({ post }) => {
  return (
      <section className={styles.container}> 
        <h2>{post.metadata.title}</h2>
        <span>{post.metadata.date}</span>
        <p style={{color: "gray"}}>{post.metadata.tags.join(', ')}</p>
        <ReactMarkdown
        components={{
            code({node, inline, className, children, ...props}) {
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
            )
            }
        }}>{post.markdown}</ReactMarkdown>
      </section>
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