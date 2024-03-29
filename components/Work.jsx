import React from "react";
import Link from 'next/link'
import Image from "next/legacy/image";

export const Work = ({ clientProjects = [] }) => {
  return (

    <section className="px-12 py-4 ">

      <div className="mx-auto max-w-7xl py-16 sm:py-24 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold"> What I&apos;ve been working on with my freelance clients.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-xl text-gray-500">
            I like to share what I worked on with my clients. Take a look
            at some of the my work.
          </p>
        </div>
      </div>
      <div className="grid  grid-cols-1 md:grid-cols-2 py-12 gap-x-24 gap-y-12">
        { clientProjects.map((clientProject, index) => (
          <div key={index}>
            <Image
              src={clientProject.featuredImage}
              alt={clientProject.title}
              objectFit="cover"
              quality={100}
              layout="responsive"
              height={600}
              width={800}
              className="rounded"
            />
            <p className="text-2xl font-semibold pt-4">{clientProject.title}</p>
            <p className="text-md my-2 text-gray-500 ">  {clientProject.date}</p>
            <div className="my-4">
              <span
                style={{
                  backgroundColor: "#5F5E5C",
                  color: "#fff",
                }}
                className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-stone text-stone-light"
              >
                {clientProject.tags[0]}
              </span>
            </div>
            <p
              className="text-lg text-gray-500 py-2 dark:text-gray-300"
              dangerouslySetInnerHTML={{
                __html: clientProject.description,
              }}
            ></p>
            <button className="pt-2 pb-1 text-lg border-b-2  text-gray-500 border-gray-700">
              <Link href={`/project/${clientProject.slug}`}>Read Story</Link>
            </button>
          </div>
        ))}
      </div>

    </section>

  );
};
