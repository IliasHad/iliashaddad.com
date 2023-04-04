import React from "react";
import { NextSeo } from "next-seo";

export function SEO({ description, title, featuredImage, url }) {
  return (
    <NextSeo
      title={title}
      description={description}
      additionalLinkTags={[
        {
          rel: "icon",
          href: "/images/hero.png",
        },
      ]}
      openGraph={{
        type: "website",
        url: "https://iliashaddad.com/" + url,
        title,
        description,
        locale: "en_EN",
        images: [
          {
            url: featuredImage,
            width: 1200,
            height: 700,
            alt: title,
          },
        ],
        site_name: "iliashaddad.com",
      }}
      twitter={{
        handle: "@iliashaddad3",
        site: "iliashaddad.com",
        cardType: "summary",
      }}
    />
  );
}

SEO.defaultProps = {
  lang: `en`,
  keywords: [],
  meta: [],
};
