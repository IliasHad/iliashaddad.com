import Image from 'next/image'
import Link from 'next/link'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { List, ListItem } from '@/components/List'
import { SectionIntro } from '@/components/SectionIntro'
import imageMe from '@/images/ilias-image.jpg'
import { getAllPublished } from '../../lib/notion'
import TestimonialsSlider from '@/components/TestimonialsSlider'

function Clients() {
  return (
    <div className="mt-24 rounded-4xl bg-neutral-950 py-20 sm:mt-32 sm:py-32 lg:mt-56">
      <Container>

      </Container>
    </div>
  )
}

async function Articles() {
  const articles = await getAllPublished(4)
  return (
    <>
      <SectionIntro title="My articles" className="mt-24 sm:mt-32 lg:mt-40">
        <p>
          I like to share my knowledge with others. Take a look at some of
          technical articles and behind the scene of my side project
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {articles.map((article) => (
            <FadeIn key={article.slug} className="flex">
              <article className="relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-neutral-950/5 transition hover:bg-neutral-50 sm:p-8">
                <Link href={`/blog/${article.slug}`}>
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
                </Link>
                <p className="mt-6 flex gap-x-2 text-sm text-neutral-950">
                  <time dateTime={article.year} className="font-semibold">
                    {article.date.split('-')[0]}
                  </time>
                  <span className="text-neutral-300" aria-hidden="true">
                    /
                  </span>
                  <span>Article</span>
                </p>
                <p className="mt-6 font-display text-2xl font-semibold text-neutral-950">
                  {article.title}
                </p>
                <p className="mt-4 text-base text-neutral-600">
                  {article.description}
                </p>
              </article>
            </FadeIn>
          ))}
          <FadeIn className="flex">
            <article className="relative flex w-full flex-col justify-center rounded-3xl p-6 ring-1 ring-neutral-950/5 transition hover:bg-neutral-50 sm:p-8">
              <h3 className="flex items-center justify-center">
                <Link href={`/blog/`}>
                  <span className="absolute inset-0 rounded-3xl" />
                  <>
                    See all articles <span aria-hidden="true">&rarr;</span>
                  </>
                </Link>
              </h3>
            </article>
          </FadeIn>
        </FadeInStagger>
      </Container>
    </>
  )
}

function Services() {
  return (
    <>
      <SectionIntro
        eyebrow="Services"
        title="What I can help you with."
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          As long as those opportunities involve giving us money to re-purpose
          old projects — we can come up with an endless number of those.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <div className="lg:flex lg:items-center lg:justify-end">
          <div className="flex justify-center lg:w-1/2 lg:justify-end lg:pr-12">
            <FadeIn className="w-[33.75rem] flex-none lg:w-[45rem]">
              <Image
                src={imageMe}
                sizes="(min-width: 1024px) 41rem, 31rem"
                className="justify-center rounded-2xl lg:justify-end"
                alt="Laptop"
              />
            </FadeIn>
          </div>
          <List className="mt-16 lg:mt-0 lg:w-1/2 lg:min-w-[33rem] lg:pl-4">
            <ListItem title="Store Setup & Theme Development">
              Creating a stunning, responsive, and performant eCommerce Shopify
              store with the latest technologies and make it fully customizable,
              so you can play with it without a coding background.
            </ListItem>
            <ListItem title="Shopify Custom Development">
              Building a custom Shopify storefront using SSG (Static Site
              Generators) or adding a custom integration to your Shopify store
            </ListItem>
            <ListItem title="Web App Development">
              Turning your idea into life using a modern tech stack (MERN Stack:
              Mongo, Express, React, and Node js) and help you achieve your
              business goals.
            </ListItem>
          </List>
        </div>
      </Container>
    </>
  )
}

export const metadata = {
  description:
    'We are a development studio working at the intersection of design and technology.',
}

export default async function Home() {
  return (
    <>
      <Container className="mt-24 sm:mt-32 md:mt-56">
        <FadeIn className="max-w-3xl">
          <h1 className="font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl">
            Hi 👋, I&apos;m Ilias Haddad a Software Engineer.
          </h1>
          <p className="mt-6 text-xl text-neutral-600">
            We are a development studio working at the intersection of design
            and technology. It’s a really busy intersection though — a lot of
            our staff have been involved in hit and runs.
          </p>
        </FadeIn>
      </Container>

      <Clients />

      <Articles />

      <TestimonialsSlider />

      <Services />

      <ContactSection />
    </>
  )
}
