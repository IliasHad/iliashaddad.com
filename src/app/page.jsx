import Image from 'next/image'
import Link from 'next/link'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { List, ListItem } from '@/components/List'
import { SectionIntro } from '@/components/SectionIntro'
import imageMe from '@/images/ilias-image.jpg'
import { getAllClientsProjects, getAllPublished, getAllSideProjects } from '../../lib/notion'
import TestimonialsSlider from '@/components/TestimonialsSlider'
import BuiltInAfricaImage from '@/images/built-in-africa.jpg'
import StoreTaskerImage from '@/images/storetasker.png'

const featured = [
  ['Built in Africa', BuiltInAfricaImage],
  ['StoreTasker', StoreTaskerImage],
]

function Featured() {
  return (
    <div className="mt-24 rounded-4xl bg-neutral-950 py-20 sm:mt-32 sm:py-32 lg:mt-56">
      <Container>
        <FadeIn className="flex items-center gap-x-8">
          <h2 className="text-center font-display text-sm font-semibold tracking-wider text-white sm:text-left">
            We’ve worked with hundreds of amazing people
          </h2>
          <div className="h-px flex-auto bg-neutral-800" />
        </FadeIn>
        <FadeInStagger faster>
          <ul
            role="list"
            className="mt-10 grid grid-cols-2 items-center justify-center gap-x-2 gap-y-4 lg:grid-cols-2"
          >
            {featured.map(([client, logo]) => (
              <li key={client}>
                <FadeIn>
                  <Image src={logo} alt={client} unoptimized width={200} />
                </FadeIn>
              </li>
            ))}
          </ul>
        </FadeInStagger>
      </Container>
    </div>
  )
}
function Projects({ projects }) {
  return (
    <>
      <SectionIntro
        title="What I've been working on with my freelance clients "
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          I like to share what I worked on with my clients. Take a look at some
          of the my work.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {projects.map((project) => (
            <FadeIn key={`/work/${project.slug}`} className="flex">
              <article className="relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-neutral-950/5 transition hover:bg-neutral-50 sm:p-8">
                <h3>
                  <Link href={`/work/${project.slug}`}>
                    <span className="absolute inset-0 rounded-3xl" />
                    <Image
                      src={project.logo}
                      alt={project.client}
                      className="h-12 w-16"
                      width={50}
                      height={100}
                    />
                  </Link>
                </h3>
                <p className="mt-6 flex gap-x-2 text-sm text-neutral-950">
                  <time
                    dateTime={new Date(project.date).getFullYear()}
                    className="font-semibold"
                  >
                    {new Date(project.date).getFullYear()}
                  </time>
                  <span className="text-neutral-300" aria-hidden="true">
                    /
                  </span>
                  <span>Case study</span>
                </p>
                <p className="mt-6 font-display text-2xl font-semibold text-neutral-950">
                  {project.title}
                </p>
                <p className="mt-4 text-base text-neutral-600">
                  {project.description}
                </p>
              </article>
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>
    </>
  )
}
function SideProjects({ sideProjects }) {
  return (
    <>
      <SectionIntro
        title="What I've been working on my free time "
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
        I like to stay busy and always have a project in the works. Take a look at some of the my side projects.

        </p>
      </SectionIntro>
      <Container className="mt-16">
        <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {sideProjects.map((project) => (
            <FadeIn key={`/work/${project.slug}`} className="flex">
              <article className="relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-neutral-950/5 transition hover:bg-neutral-50 sm:p-8">
                <h3>
                  <Link href={`/work/${project.slug}`}>
                    <span className="absolute inset-0 rounded-3xl" />
                    <Image
                      src={project.logo}
                      alt={project.client}
                      className="h-12 w-16"
                      width={50}
                      height={100}
                    />
                  </Link>
                </h3>
                <p className="mt-6 flex gap-x-2 text-sm text-neutral-950">
                  <time
                    dateTime={new Date(project.date).getFullYear()}
                    className="font-semibold"
                  >
                    {new Date(project.date).getFullYear()}
                  </time>
                  <span className="text-neutral-300" aria-hidden="true">
                    /
                  </span>
                  <span>Case study</span>
                </p>
                <p className="mt-6 font-display text-2xl font-semibold text-neutral-950">
                  {project.title}
                </p>
                <p className="mt-4 text-base text-neutral-600">
                  {project.description}
                </p>
              </article>
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>
    </>
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
      ></SectionIntro>
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
              Turning your idea into life using a modern tech stack and help you
              achieve your business goals.
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
  const projects = await getAllClientsProjects()
  const sideProjects = await getAllSideProjects();
  return (
    <>
      <Container className="mt-24 sm:mt-32 md:mt-56">
        <div className="lg:flex lg:items-center lg:justify-end">
          <div className="max-w-3xl">
            <h1 className="font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl">
              Hi 👋, I&apos;m Ilias Haddad a Software Engineer.
            </h1>
            <p className="mt-6 text-xl text-neutral-600">
              Experienced full-stack developer (4+ years). Shopify specialist.
              Passionate about mountain biking and exploration.
            </p>
          </div>
          <FadeIn className="w-[33.75rem] flex-none lg:w-[35rem]">
            <Image
              src={imageMe}
              sizes="(min-width: 1024px) 41rem, 31rem"
              className="justify-center rounded-2xl lg:justify-end"
              alt="Laptop"
            />
          </FadeIn>
        </div>
      </Container>

      <Featured />
      <Projects projects={projects} />

      <Articles />

      <TestimonialsSlider />

      <Services />

      <SideProjects sideProjects={sideProjects } />

      <ContactSection />
    </>
  )
}
