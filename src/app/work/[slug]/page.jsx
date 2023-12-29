import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { GrayscaleTransitionImage } from '@/components/GrayscaleTransitionImage'
import { MDXComponents } from '@/components/MDXComponents'
import { PageIntro } from '@/components/PageIntro'
import { getProjectBySlug } from '../../../../lib/notion';
import { TagList, TagListItem } from '@/components/TagList'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import rehypeRaw from 'rehype-raw'
export default async function Page({ params }) {
  const project = await getProjectBySlug(params.slug, 'sideProject')
  return (
    <>
      <article className="mt-24 sm:mt-32 lg:mt-40">
        <header>
          <PageIntro
            eyebrow="Side Project"
            title={project.metadata.title}
            centered
          >
            <p>{project.metadata.description}</p>
          </PageIntro>

          <FadeIn>
            <div className="mt-24 border-t border-neutral-200 bg-white/50 sm:mt-32 lg:mt-40">
              <Container>
                <div className="mx-auto max-w-5xl">
                  <dl className="-mx-6 grid grid-cols-1 text-sm text-neutral-950 sm:mx-0 sm:grid-cols-2">
                    <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0">
                      <dt className="font-semibold">Date</dt>
                      <dd>
                        <time dateTime={project.metadata.date.split('-')[0]}>
                          {project.metadata.date.split('-')[0]}
                        </time>
                      </dd>
                    </div>
                    <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0">
                      <dt className="font-semibold">Service</dt>
                      <dd>{project.metadata.service}</dd>
                    </div>
                  </dl>
                </div>
              </Container>
            </div>

            <div className="border-y border-neutral-200 bg-neutral-100">
              <div className="-my-px mx-auto w-full max-w-[76rem] bg-neutral-200">
                <GrayscaleTransitionImage
                  quality={90}
                  className="w-full object-cover"
                  sizes="(min-width: 1216px) 76rem, 100vw"
                  priority
                  src={project.metadata.featuredImage}
                  width={500}
                  height={400}
                />
              </div>
            </div>
          </FadeIn>
        </header>

        <Container className="mt-24 sm:mt-32 lg:mt-40">
          <FadeIn>
            <div className='[&>*]:mx-auto [&>*]:max-w-3xl [&>:first-child]:!mt-0 [&>:last-child]:!mb-0'>
              <div className='typography'>
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              components={MDXComponents}
            >
              {project.content}
            </ReactMarkdown>
            <TagList className="mt-4">
              {project.metadata.tags.map((tag, index) => (
                <TagListItem className="list-none" key={index}>{tag}</TagListItem>
              ))}
              </TagList>
              </div>
              </div>
          </FadeIn>
        </Container>
      </article>

      <ContactSection />
    </>
  )
}
