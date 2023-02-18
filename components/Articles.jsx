import React from "react";
import Link from 'next/link'
import Image from "next/image";

export const Articles = ({ posts, featuredPost }) => {
  return (
    <section className="px-12 py-4">
      <div className="mx-auto max-w-7xl py-16 sm:py-24 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">My Articles</h2>
          <p className="mx-auto mt-5 max-w-xl text-xl text-gray-500">
            I like to share my knowledge with others. Take a look at some of
            technical articles and behind the scene of my side project
          </p>
        </div>
      </div>

      <div
        className="grid  grid-cols-1 md:grid-cols-2 py-12 gap-x-24 gap-y-12"
      >

        <Image
          src={featuredPost.featuredImage}
          alt={featuredPost.title}
          objectFit="cover"
          quality={100}
          layout="responsive"
          height={500}
          width={800}
          className="rounded"
          priority={true}
        />

        <div>
          <div className="py-4">
            <Link
              href={`/tag/${featuredPost.tags[0]}`}
              className="text-xl  py-4 text-gray-600"
            >
              <span
                style={{
                  backgroundColor: "#5F5E5C",
                  color: "#fff"
                }}
                className="inline-flex dark:text-white items-center px-3 py-0.5 rounded-full text-sm font-medium bg-stone text-stone-light"
              >
                {featuredPost.tags[0]}
              </span>
            </Link>
          </div>
          <h2 className="text-2xl font-semibold">{featuredPost.title}</h2>
          <p className="text-md my-2 text-gray-500 ">{featuredPost.date}</p>

          <p
              className="text-lg text-gray-500 py-2 dark:text-gray-300"
              dangerouslySetInnerHTML={{
              __html: featuredPost.description,
            }}
          ></p>
          <button className="pt-2 pb-1 text-lg border-b-2  text-gray-500 border-gray-700">
            <Link href={`/blog/${featuredPost.slug}`}>Read Article</Link>
          </button>
        </div>
      </div>


      <div className="grid  grid-cols-1 md:grid-cols-3 py-12 gap-x-24 gap-y-8">
        {posts
          .filter(post => post.slug !== featuredPost.slug)
          .map(post => (
            <div key={post.id}>

              <Image
                src={post.featuredImage}
                alt={post.title}
                objectFit="cover"
                quality={100}
                layout="responsive"
                height={400}
                width={500}
                className="rounded"
              />
              <div className="py-4">
                <Link
                  href={`/tag/${featuredPost.tags[0]}`}
                  className="text-xl  py-4 text-gray-600"
                >
                  <span
                    style={{
                      backgroundColor: "#5F5E5C",
                      color: "#fff"
                    }}
                    className="inline-flex dark:text-white items-center px-3 py-0.5 rounded-full text-sm font-medium bg-stone text-stone-light"
                  >
                    {featuredPost.tags[0]}
                  </span>
                </Link>
              </div>

              <p className="text-2xl font-semibold">{post.title}</p>
              <p className="text-md my-2 text-gray-500 ">  {post.date}</p>


              <p
              className="text-lg text-gray-500 py-2 dark:text-gray-300"
              dangerouslySetInnerHTML={{
                  __html: post.description,
                }}
              ></p>
              <button className="pt-2 pb-1 text-lg border-b-2  text-gray-500 border-gray-700">
                <Link href={`/blog/${post.slug}`}>Read Article</Link>
              </button>
            </div>
          ))}
      </div>


    </section >
  );
};
