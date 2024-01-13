import Image from 'next/image'
import Link from 'next/link'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { getAllSideProjects } from '../../../lib/notion';

function Projects({ projects }) {
  return (
    <Container className="mt-20">
      <FadeIn>
        <h2 className="font-display text-2xl font-semibold text-neutral-950">
          Side projects
        </h2>
      </FadeIn>
      <div className="mt-10 space-y-20 sm:space-y-24 lg:space-y-32">
        <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {projects.map((project) => (
            <FadeIn key={`/side-projects/${project.slug}`} className="flex">
              <article className="relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-neutral-950/5 transition hover:bg-neutral-50 sm:p-8">
                <h3>
                  <Link href={`/side-projects/${project.slug}`}>
                    <span className="absolute inset-0 rounded-3xl" />
                    <Image
                    src={project.featuredImage}
                    alt={project.title}
                    objectFit="cover"
                    quality={100}
                    layout="responsive"
                    height={400}
                    width={500}
                    className="rounded"
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
                  <span>Side project</span>
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
      </div>
    </Container>
  )
}

export const metadata = {
  title: 'Side projects',
  description:
    ' I like to stay busy and always have a project in the works. Take a look at some of the my side projects.',
}

export default async function Work() {
  const projects = await getAllSideProjects()

  return (
    <>
      <PageIntro
        eyebrow="Side projects"
        title="What I've been working on my free time  "
      >
        <p>
        I like to stay busy and always have a project in the works. Take a look at some of the my side projects.

        </p>
      </PageIntro>

      <Projects projects={projects} />
      <ContactSection />
    </>
  )
}
