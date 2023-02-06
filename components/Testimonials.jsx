import React from "react";
import Image from "next/legacy/image";

export const Testimonials = () => {
  const clients = [
    {
      fullName: "Aziz Tarafder",
      imagePath: "/images/clients/aziz-tarafder.jpeg",
      content:
        "Ilias is a very talented Shopify developer. I hired him to complete some enhancements of my Shopify website (www.tabtime.com). He quickly understood the requirements and then put in place a technical solution that exceeded my expectations. I found him easy to work with and I look forward to working with him in the future.",
      title: "Director of TabTime the UK’s medication management specialist",
    },

    {
      fullName: "Yassine",
      content:
        "Ilias is a very reliable Shopify developer which I can highly recommend to anyone looking to get problems with their store solved fast. We hired him for a very specific functionality that we wanted in our theme and he got the job done in very few hours",
      title: "Founder of Cosmogoods.com",
      imagePath: "/images/clients/yassine.png",
    },
    {
      fullName: "Kristen Ley",
      imagePath: "/images/clients/kristen-ley.jpeg",
      content:
        "He was very helpful in transferring everything over and making our website look just like we wanted it to!",
      title: "Owner, Founder &amp; Creative Director at Thimblepress®",
    },
    {
      fullName: "Melanie Janaya",
      imagePath: "/images/clients/melanie.jpg",
      content:
        "Ilias was wonderful to work with. His english is excellent. He is very efficient. I highly recommend Ilias and hope to work with him again in the future.",
      title: "Founder of Leatherbabyco.com",
    },

    {
      fullName: "Othmane TAKY",
      imagePath: "/images/clients/othmane-taki.jpeg",
      content:
        "Ilias has is professional and executed the project in a timely and smart manner. 100% I recommend and we will work with him again",
      title:
        "Supporting HR executives growing Happiness indicators with tailor-made employee purchase programs",
    },
    {
      fullName: "Aziz Tarafder",
      imagePath: "/images/clients/aziz-tarafder.jpeg",
      content:
        "Ilias produced some significant improvements in my shopify site's speed, reducing load time of the home page by over 50%. A very thorough developer who I look forward to working with again in the future.",
      title: "Director of TabTime the UK’s medication management specialist",
    },
    {
      fullName: "Adrien Massonnet",
      imagePath: "/images/clients/adrien-massonnet.jpeg",
      content:
        "Ilias has helped develop and improve our Shopify website (www.kandle.ch) in a very efficient way. It was great to be working with someone who's as responsive and who always makes himself available for the project. He has a broad range of technical skills that allowed us to rely on him for the entire development of the website. Thank you for your great work and I am looking forward to working with you on other ventures. Best of luck",
      title: "Business developer at Audacia Management",
    },
    {
      fullName: "Omar Ghanem",
      imagePath: "/images/clients/omar-ghanem.jpeg",
      content:
        "I worked with Ilias on a Shopify store project on behalf of a client, in which he completely exceeded my expectations in terms of delivery & professionalism. Ilias understands Shopify inside & out and was able to translate our wireframes & initial plans to a beautiful, yet efficient website. Perhaps my favorite aspect of Ilias & his work, is his professionalism, timely responses & work ethic. We managed to basically create a website from scratch in a matter of days, and Ilias provided us with support post-launch to set everything up the right way. Therefore, I'm more than happy to recommend Ilias for any potential upcoming Shopify website development tasks or jobs. I'm personally going to be working with him again very soon.",
      title: "Storyteller | Entrepreneur | Speaker",
    },
    {
      fullName: "Jonathan",
      imagePath: "/images/clients/harmoni.png",
      content:
        "Ilias is super intelligent and a knowledgeable Shopify developer - I found him because I saw a guide on Shopify optimization and did my best to hire the writer. He wrote the book on it! Super friendly and responsive person, I will continue to work with him",
      title: "Harmoni® Desk ",
    },
  ];

  return (

    <section className="px-12 py-4 testimonials">
      <div className="mx-auto max-w-7xl py-16 sm:py-24 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Testimonials
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-xl text-gray-500">
          I&apos;ve had the chance to work with some really great people,
          here’s some of the super nice things they&apos;ve said about me
          and my work.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap  py-4">
        {clients.map((client, index) => (
          <div key={index} className="p-4 md:w-1/2 w-full">
            <div className="h-full bg-stone testimonials-item p-8 rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="block w-5 h-5 text-gray-200 mb-4"
                viewBox="0 0 975.036 975.036"
              >
                <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
              </svg>
              <p className="leading-relaxed mb-6 text-white">{client.content}</p>
              <a className="inline-flex items-center flex-col md:flex-row w-full mx-auto ">
                <Image
                  src={client.imagePath}
                  alt={client.fullName}
                  placeholder="blurred"
                  objectFit="cover"
                  quality={100}
                  layout="responsive"
                  height={20}
                  width={60}
                  imgStyle={{ objectFit: "contain" }}
                  className="w-12 h-12 rounded-full flex-shrink-0 p-1 object-center bg-white"

                />


                <span className="flex-grow flex flex-col md:pl-4 justify-center items-center md:items-stretch">
                  <span className="title-font font-medium text-white">
                    {client.fullName}
                  </span>
                  <span className="text-gray-200 text-sm text-center md:text-left">
                    {client.title}
                  </span>
                </span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
