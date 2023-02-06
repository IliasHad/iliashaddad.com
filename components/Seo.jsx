import PropTypes from "prop-types";
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
    />

  );
}

SEO.defaultProps = {
  lang: `en`,
  keywords: [],
  meta: [],
};



