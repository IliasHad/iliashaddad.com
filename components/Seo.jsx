import React from "react";
import { NextSeo } from 'next-seo';

export function SEO({
  description,
  lang,
  meta,
  keywords,
  title,
  featuredImage,
  tag,
  published_time,
}) {

  return (
    <NextSeo
      title={title}
      description={description}
      additionalLinkTags={[
        {
          rel: 'icon',
          href: '/images/hero.png',
        },
      ]}
    />

  );
}

SEO.defaultProps = {
  lang: `en`,
  keywords: [],
  meta: [],
};



