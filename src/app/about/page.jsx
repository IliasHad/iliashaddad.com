import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { GridList, GridListItem } from '@/components/GridList'
import { PageIntro } from '@/components/PageIntro'
import { SectionIntro } from '@/components/SectionIntro'

function Culture() {
  return (
    <div className="mt-24 rounded-4xl bg-neutral-950 py-24 sm:mt-32 lg:mt-40 lg:py-32">
      <SectionIntro
        eyebrow="Our culture"
        title="Balance your passion with your passion for life."
        invert
      >
        <p>
          We are a group of like-minded people who share the same core values.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <GridList>
          <GridListItem title="Loyalty" invert>
            Our team has been with us since the beginning because none of them
            are allowed to have LinkedIn profiles.
          </GridListItem>
          <GridListItem title="Trust" invert>
            We don’t care when our team works just as long as they are working
            every waking second.
          </GridListItem>
          <GridListItem title="Compassion" invert>
            You never know what someone is going through at home and we make
            sure to never find out.
          </GridListItem>
        </GridList>
      </Container>
    </div>
  )
}

export const metadata = {
  title: 'About Us',
  description:
    'We believe that our strength lies in our collaborative approach, which puts our clients at the center of everything we do.',
}

export default async function About() {
  return (
    <>
      <PageIntro eyebrow="About me" title="A Problem solver">
        <p>
          I&apos;m an experienced and self-taught software engineer with more
          than 3 years of experience in full-stack dev. I&apos;ve been working with
          the most popular front-end frameworks(Vue and React), and NodeJs on
          the backend.
        </p>
        <div className="mt-10 max-w-2xl space-y-6 text-base">
          <p>
            I&apos;m also a Shopify developer. I help Shopify store owners and
            clients with their technical needs (custom Shopify theme dev, custom
            Shopify app dev and speed optimization).
          </p>
          <p>
            I love mountain biking, especially long trips where I can visit new
            places! If you need a new custom-made website, a unique Shopify
            store or app, have an idea of an engaging web application: Please
            feel free to contact me and we&apos;ll talk about the details!
          </p>
        </div>
      </PageIntro>

      <ContactSection />
    </>
  )
}
