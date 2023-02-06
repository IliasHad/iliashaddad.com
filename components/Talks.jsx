import React from "react";
import Link from 'next/link'
import Image from 'next/image'
import YouTube from 'react-youtube';

export const Talks = () => {
    const talks = [
        {
            id: "BtPi44U6e4E",
            title: "How To Create Your First Shopify App With Node.Js by Ilias Haddad | BlaBlaConf 2022",
        }, {
           id: "0rUj_ECGQ6I",
            title: "Headless eCommerce: Shopify + NextJs = ❤️ with Ilias Haddad | BlaBlaConf 2021",
        }
    ];

    return (
        <section className="px-12 py-4">
            <div className="mx-auto max-w-7xl py-16 sm:py-24 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold">My Talks</h2>
                    <p className="mx-auto mt-5 max-w-xl text-xl text-gray-500">
                        I like to share my knowledge with others. Take a look at some of
                        technical talks
                    </p>
                </div>
            </div>



            <div className="grid  grid-cols-1 md:grid-cols-2 items-center py-12 gap-x-24 gap-y-8 overflow-hidden">
                {talks
                    .map(talk => (
                        <div key={talk.id} >
                            <YouTube videoId={talk.id} className="flex lg:block" opts={{
                               height: '500',
                               width: '800',
                            }} />
                            <p className="text-2xl py-4 font-semibold">{talk.title}</p>
                        </div>
                    ))}

            </div>


        </section >
    );
};
