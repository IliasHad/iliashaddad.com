import Image from 'next/image'
import Link from 'next/link'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { Testimonial } from '@/components/Testimonial'
import KandleCHLogo from '@/images/clients/kandle-ch/logo.png'
import { getAllClientsProjects } from '../../../lib/notion';

function Projects({ projects }) {
  return (
    <Container className="mt-20">
      <FadeIn>
        <h2 className="font-display text-2xl font-semibold text-neutral-950">
          Case studies
        </h2>
      </FadeIn>
      <div className="mt-10 space-y-20 sm:space-y-24 lg:space-y-32">
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
      </div>
    </Container>
  )
}

export const metadata = {
  title: 'My Work',
  description:
    'I like to share what I worked on with my clients. Take a look at some of the my work.',
}

export default async function Work() {
  const projects = await getAllClientsProjects()

  return (
    <>
      <PageIntro
        eyebrow="My work"
        title="Proven solutions for real-world problems."
      >
        <p>
          I like to share what I worked on with my clients. Take a look at some
          of the my work.
        </p>
      </PageIntro>

      <Projects projects={projects} />

      <Testimonial
        className="mt-24 sm:mt-32 lg:mt-40"
        client={{ name: 'Kandle CH', logo: KandleCHLogo }}
      >
        Ilias has helped develop and improve our Shopify website (www.kandle.ch)
        in a very efficient way. It was great to be working with someone
        who&apos;s as responsive and who always makes himself available for the
        project. He has a broad range of technical skills that allowed us to
        rely on him for the entire development of the website. Thank you for
        your great work and I am looking forward to working with you on other
        ventures. Best of luck
      </Testimonial>

      <ContactSection />
    </>
  )
}
