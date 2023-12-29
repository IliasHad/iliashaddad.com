import {
  getAllPublished,
  getSingleBlogPostBySlug,
} from '../../../../lib/notion'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { MDXComponents } from '@/components/MDXComponents'
import { PageLinks } from '@/components/PageLinks'
import { formatDate } from '@/lib/formatDate'
import rehypeRaw from 'rehype-raw'
import ReactMarkdown from 'react-markdown'
import { TagList, TagListItem } from '@/components/TagList'
import { GrayscaleTransitionImage } from '@/components/GrayscaleTransitionImage'

export default async function Page({ params, searchParams }) {
  const article = await getSingleBlogPostBySlug(params.slug)
  return (
    <>
      <Container as="article" className="mt-24 sm:mt-32 lg:mt-40 mb-12">
        <FadeIn>
          <header className="mx-auto flex max-w-5xl flex-col text-center">
            <h1 className="mt-6 font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-6xl">
              {article.metadata.title}
            </h1>
            <time
              dateTime={article.metadata.date}
              className="order-first text-sm text-neutral-950"
            >
              {formatDate(article.metadata.date)}
            </time>
            <p className="mt-6 text-sm font-semibold text-neutral-950">
              by Ilias Haddad
            </p>
          </header>
          <div className="border-y my-4 border-neutral-200 bg-neutral-100">
              <div className="-my-px mx-auto w-full max-w-[76rem] bg-neutral-200">
                <GrayscaleTransitionImage
                  quality={90}
                  className="w-full object-cover"
                  sizes="(min-width: 1216px) 76rem, 100vw"
                  priority
                  src={article.metadata.featuredImage}
                  width={500}
                  height={400}
                />
              </div>
            </div>
        </FadeIn>

        <FadeIn>
          
          <div className="[&>*]:mx-auto [&>*]:max-w-3xl [&>:first-child]:!mt-0 [&>:last-child]:!mb-0">
            <div className="typography">
              <ReactMarkdown
                rehypePlugins={[rehypeRaw]}
                components={MDXComponents}
              >
                {article.content}
              </ReactMarkdown>
              <TagList className="mt-4">
                {article.metadata.tags.map((tag, index) => (
                  <TagListItem className="list-none" key={index}>
                    {tag}
                  </TagListItem>
                ))}
              </TagList>
            </div>
          </div>
        </FadeIn>
      </Container>

      {article.relatedPosts > 0 && (
        <PageLinks
          className="mt-24 sm:mt-32 lg:mt-40"
          title="More articles"
          pages={article.relatedPosts}
        />
      )}

      <ContactSection />
    </>
  )
}

// This function can statically allow nextjs to find all the posts that you
// have made, and statically generate them
export async function generateStaticParams() {
  const posts = await getAllPublished()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// Set the title of the page to be the post title, note that we no longer use
// e.g. next/head in app dir, and this can be async just like the server
// component
export async function generateMetadata({ params: { slug} }) {
  const {
    metadata: { title },
  } = await getSingleBlogPostBySlug(slug)
  return {
    title,
  }
}
