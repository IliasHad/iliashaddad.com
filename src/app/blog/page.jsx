import Image from 'next/image'
import Link from 'next/link'
import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { formatDate } from '@/lib/formatDate'
import { getAllPublished, getRecentFeaturedPost } from '../../../lib/notion'

export const metadata = {
  title: 'Blog',
  description:
    'Stay up-to-date with the latest industry news as our marketing teams finds new ways to re-purpose old CSS tricks articles.',
}

export default async function Blog() {
  const articles = await  getAllPublished()
  const featuredArticle = await getRecentFeaturedPost()

  return (
    <>
      <PageIntro eyebrow="Blog" title="My Articles">
        <p>
          a aaa I like to share my knowledge with others. Take a look at some of
          technical articles and behind the scene of my side project
        </p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="space-y-24 lg:space-y-32">
          <FadeIn key={featuredArticle.href}>
            <article>
              <Border className="pt-16">
                <div className="grid grid-cols-2">
                  <div className="relative lg:-mx-4 lg:flex lg:justify-end">
                    <div className="pt-10 lg:w-2/3 lg:flex-none lg:px-4 lg:pt-0">
                      <dl className="lg:absolute lg:left-0 lg:top-0 lg:w-1/3 lg:px-4">
                        <dt className="sr-only">Published</dt>
                        <dd className="absolute left-0 top-0 text-sm text-neutral-950 lg:static">
                          <time dateTime={featuredArticle.date}>
                            {formatDate(featuredArticle.date)}
                          </time>
                        </dd>
                        <dt className="sr-only">Author</dt>
                        <dd className="mt-6 flex gap-x-4"></dd>
                        <h2 className="font-display text-2xl font-semibold text-neutral-950">
                          <Link href={`/blog/${featuredArticle.slug}`}>
                            {featuredArticle.title}
                          </Link>
                        </h2>
                        <p
                          className="mt-6 max-w-2xl text-base text-neutral-600"
                          dangerouslySetInnerHTML={{
                            __html: featuredArticle.description,
                          }}
                        ></p>
                        <Button
                          href={`/blog/${featuredArticle.slug}`}
                          aria-label={`Read more: ${featuredArticle.title}`}
                          className="mt-8"
                        >
                          Read more
                        </Button>
                      </dl>
                    </div>
                  </div>
                  <div className="h-72 w-full overflow-hidden rounded-xl bg-neutral-100">
                    <Image
                      src={featuredArticle.featuredImage}
                      alt={featuredArticle.title}
                      objectFit="cover"
                      quality={100}
                      layout="responsive"
                      height={400}
                      width={500}
                      className="rounded"
                    />
                  </div>
                </div>
              </Border>
            </article>
          </FadeIn>
          {articles
            .filter((article) => article.slug !== featuredArticle.slug)
            .map((article) => (
              <FadeIn key={article.href}>
                <article className='h-full'>
                  <Border className="pt-16">
                    <div className="relative lg:-mx-4 lg:flex lg:justify-end">
                      <div className="pt-10 lg:w-2/3 lg:flex-none lg:px-4 lg:pt-0">
                        <h2 className="font-display text-2xl font-semibold text-neutral-950">
                          <Link href={`/blog/${article.slug}`}>
                            {article.title}
                          </Link>
                        </h2>
                        <dl className="lg:absolute lg:left-0 lg:top-0 lg:w-1/3 lg:px-4">
                          <dt className="sr-only">Published</dt>
                          <dd className="absolute left-0 top-0 text-sm text-neutral-950 lg:static">
                            <time dateTime={article.date}>
                              {formatDate(article.date)}
                            </time>
                          </dd>
                          <dt className="sr-only">Author</dt>
                          <dd className="mt-6 flex gap-x-4">
                            <div className="h-full overflow-hidden w-full  rounded-xl bg-neutral-100">
                              <Image
                                src={article.featuredImage}
                                alt={article.title}
                                objectFit="cover"
                                quality={100}
                                layout="responsive"
                                height={400}
                                width={500}
                                className="rounded"
                              />
                            </div>
                          </dd>
                        </dl>
                        <p
                          className="mt-6 max-w-2xl text-base text-neutral-600"
                          dangerouslySetInnerHTML={{
                            __html: article.description,
                          }}
                        ></p>
                        <Button
                          href={article.href}
                          aria-label={`Read more: ${article.title}`}
                          className="mt-8"
                        >
                          Read more
                        </Button>
                      </div>
                    </div>
                  </Border>
                </article>
              </FadeIn>
            ))}
        </div>
      </Container>

      <ContactSection />
    </>
  )
}
