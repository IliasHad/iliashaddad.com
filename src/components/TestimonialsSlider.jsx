'use client'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Transition } from '@headlessui/react'
import Aziz from '@/images/clients/aziz-tarafder.jpeg'
import Yassine from '@/images/clients/yassine.png'
import Kristen from '@/images/clients/kristen-ley.jpeg'
import Melanie from '@/images/clients/melanie.jpg'
import Othmane from '@/images/clients/othmane-taki.jpeg'
import Adrien from '@/images/clients/adrien-massonnet.jpeg'
import Omar from '@/images/clients/omar-ghanem.jpeg'
import Jonathan from '@/images/clients/harmoni.png'
import { Container } from '@/components/Container'
import { SectionIntro } from '@/components/SectionIntro'
const clients = [
  {
    fullName: 'Aziz Tarafder',
    image: Aziz,
    content:
      'Ilias is a very talented Shopify developer. I hired him to complete some enhancements of my Shopify website (www.tabtime.com). He quickly understood the requirements and then put in place a technical solution that exceeded my expectations. I found him easy to work with and I look forward to working with him in the future.',
    title: 'Director of TabTime the UK’s medication management specialist',
  },

  {
    fullName: 'Yassine',
    content:
      'Ilias is a very reliable Shopify developer which I can highly recommend to anyone looking to get problems with their store solved fast. We hired him for a very specific functionality that we wanted in our theme and he got the job done in very few hours',
    title: 'Founder of Cosmogoods.com',
    image: Yassine,
  },
  {
    fullName: 'Kristen Ley',
    image: Kristen,
    content:
      'He was very helpful in transferring everything over and making our website look just like we wanted it to!',
    title: 'Owner, Founder and  creative Director at Thimblepress®',
  },
  {
    fullName: 'Melanie Janaya',
    image: Melanie,
    content:
      'Ilias was wonderful to work with. His english is excellent. He is very efficient. I highly recommend Ilias and hope to work with him again in the future.',
    title: 'Founder of Leatherbabyco.com',
  },

  {
    fullName: 'Othmane TAKY',
    image: Othmane,
    content:
      'Ilias has is professional and executed the project in a timely and smart manner. 100% I recommend and we will work with him again',
    title:
      'Supporting HR executives growing Happiness indicators with tailor-made employee purchase programs',
  },
  {
    fullName: 'Aziz Tarafder',
    image: Aziz,
    content:
      "Ilias produced some significant improvements in my shopify site's speed, reducing load time of the home page by over 50%. A very thorough developer who I look forward to working with again in the future.",
    title: 'Director of TabTime the UK’s medication management specialist',
  },
  {
    fullName: 'Adrien Massonnet',
    image: Adrien,
    content:
      "Ilias has helped develop and improve our Shopify website (www.kandle.ch) in a very efficient way. It was great to be working with someone who's as responsive and who always makes himself available for the project. He has a broad range of technical skills that allowed us to rely on him for the entire development of the website. Thank you for your great work and I am looking forward to working with you on other ventures. Best of luck",
    title: 'Business developer at Audacia Management',
  },
  {
    fullName: 'Omar Ghanem',
    image: Omar,
    content:
      "I worked with Ilias on a Shopify store project on behalf of a client, in which he completely exceeded my expectations in terms of delivery & professionalism. Ilias understands Shopify inside & out and was able to translate our wireframes & initial plans to a beautiful, yet efficient website. Perhaps my favorite aspect of Ilias & his work, is his professionalism, timely responses & work ethic. We managed to basically create a website from scratch in a matter of days, and Ilias provided us with support post-launch to set everything up the right way. Therefore, I'm more than happy to recommend Ilias for any potential upcoming Shopify website development tasks or jobs. I'm personally going to be working with him again very soon.",
    title: 'Storyteller | Entrepreneur | Speaker',
  },
  {
    fullName: 'Jonathan',
    image: Jonathan,
    content:
      'Ilias is super intelligent and a knowledgeable Shopify developer - I found him because I saw a guide on Shopify optimization and did my best to hire the writer. He wrote the book on it! Super friendly and responsive person, I will continue to work with him',
    title: 'Harmoni® Desk ',
  },
]

export default function TestimonialsSlider() {
  const testimonialsRef = useRef(null)
  const [active, setActive] = useState(0)
  const [autorotate, setAutorotate] = useState(true)
  const autorotateTiming = 7000
  useEffect(() => {
    if (!autorotate) return
    const interval = setInterval(() => {
      setActive(active + 1 === clients.length ? 0 : (active) => active + 1)
    }, autorotateTiming)
    return () => clearInterval(interval)
  }, [active, autorotate])
  const heightFix = () => {
    if (testimonialsRef.current && testimonialsRef.current.parentElement)
      testimonialsRef.current.parentElement.style.height = `${testimonialsRef.current.clientHeight}px`
  }
  useEffect(() => {
    heightFix()
  }, [])
  return (
    <>
      <SectionIntro title="Testimonials" className="mt-24 sm:mt-32 lg:mt-40">
        <p>
          I&apos;ve had the chance to work with some really great people, here’s
          some of the super nice things they&apos;ve said about me and my work.{' '}
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <div className="mx-auto w-full max-w-3xl py-24 text-center">
          <div className="relative h-32">
            <div className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[480px] -translate-x-1/2 before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-gradient-to-b before:from-neutral-500/25 before:via-neutral-500/5 before:via-25% before:to-neutral-500/0 before:to-75%">
              <div className="h-32 [mask-image:_linear-gradient(0deg,transparent,theme(colors.white)_20%,theme(colors.white))]">
                {clients.map((testimonial, index) => (
                  <Transition
                    key={index}
                    show={active === index}
                    className="absolute inset-0 -z-10 h-full"
                    enter="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700 order-first"
                    enterFrom="opacity-0"
                    enterTo="opacity-100 rotate-0"
                    leave="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700"
                    leaveFrom="opacity-100 rotate-0"
                    leaveTo="opacity-0"
                  >
                    <div className="flex flex-col gap-5">
                      <Image
                        className="top[0] relative left-1/2 -translate-x-1/2 rounded-full"
                        src={testimonial.image}
                        width={56}
                        height={56}
                        alt={testimonial.fullName}
                      />
                      <h5
                        key={index}
                        className={` bg-white px-3 py-1.5 text-xs text-slate-900 shadow-sm transition-colors duration-150 hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring focus-visible:ring-neutral-300 dark:focus-visible:ring-slate-600`}
                        onClick={() => {
                          setActive(index)
                          setAutorotate(false)
                        }}
                      >
                        <span>{testimonial.title}</span>{' '}
                      </h5>
                    </div>
                  </Transition>
                ))}
              </div>
            </div>
          </div>
          <div className="mb-9 transition-all delay-300 duration-150 ease-in-out">
            <div className="relative flex flex-col" ref={testimonialsRef}>
              {clients.map((testimonial, index) => (
                <Transition
                  key={index}
                  show={active === index}
                  enter="transition ease-in-out duration-500 delay-200 order-first"
                  enterFrom="opacity-0 -translate-x-4"
                  enterTo="opacity-100 translate-x-0"
                  leave="transition ease-out duration-300 delay-300 absolute"
                  leaveFrom="opacity-100 translate-x-0"
                  leaveTo="opacity-0 translate-x-4"
                  beforeEnter={() => heightFix()}
                >
                  <div className="text-2xl font-bold text-slate-900 before:content-['\201C'] after:content-['\201D']">
                    {testimonial.content}
                  </div>
                </Transition>
              ))}
            </div>
          </div>
          {/* Buttons */}
          <div className="-m-1.5 flex flex-wrap justify-center">
            {clients.map((testimonial, index) => (
              <button
                key={index}
                className={`m-1.5 inline-flex justify-center whitespace-nowrap rounded-full px-3 py-1.5 text-xs shadow-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring focus-visible:ring-neutral-300 dark:focus-visible:ring-slate-600 ${
                  active === index
                    ? 'bg-neutral-950 text-white shadow-neutral-950/10'
                    : 'bg-white text-slate-900 hover:bg-neutral-100'
                }`}
                onClick={() => {
                  setActive(index)
                  setAutorotate(false)
                }}
              >
                <span>{testimonial.fullName}</span>
              </button>
            ))}
          </div>
        </div>
      </Container>
    </>
  )
}
