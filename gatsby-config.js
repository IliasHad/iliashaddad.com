// gatsby-config.js
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});
const tailwindConfig = require("./tailwind.config.js");

module.exports = {
  siteMetadata: {
    title: `Ilias Haddad`,
    description: `I'm a 21-year-old self taught developer. As I've grown as a developer, I've worked on multiple side projects to improve my coding skills `,
    siteUrl: `https://iliashaddad.com/`,
    author: `@iliashaddad`,
  },
  plugins: [
    `@pauliescanlon/gatsby-mdx-embed`,
    `gatsby-plugin-advanced-sitemap`,
    `gatsby-plugin-robots-txt`,

    {
      resolve: `gatsby-plugin-mdx`,

      options: {
        defaultLayouts: {
          default: require.resolve("./src/templates/blogTemplate.js"),
        },
        extensions: [`.md`, `.mdx`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-figure-caption`,
            options: { imageClassName: "w-full rounded-lg" },
          },
          {
            // Using gatsby-remark-embed-video before gatsby-remark-images & gatsby-remark-responsive-iframe plugins.
            resolve: `gatsby-remark-embed-video`,
            options: {
              maxWidth: 800,
              ratio: 1.77,
              height: 400,
              related: false,
              noIframerder: true,
            },
          },

          {
            resolve: `gatsby-remark-vscode`,
            options: {
              theme: `Tokyo Night`, // From package.json: contributes.themes[0].label
              extensions: ["tokyo-night"], // From package.json: name
            },
          },
          {
            resolve: `gatsby-transformer-remark`,
            options: {
              plugins: [],
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 1000,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
        ],
      },
    },
    `gatsby-plugin-eslint`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-tailwind`,
        short_name: `Ilias Haddad`,
        start_url: `/`,

        display: `minimal-ui`,
        icon: `src/images/hero.png`,
      },
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require(`tailwindcss`)(tailwindConfig),
          require(`autoprefixer`),
          ...(process.env.NODE_ENV === `production`
            ? [require(`cssnano`)]
            : []),
        ],
      },
    },

    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaultQuality: 100,
      },
    },
    `gatsby-transformer-sharp`,

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/content/blogs`,
        name: `blogs`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/content/projects`,
        name: `projects`,
      },
    },
    // The only required option is the domain
    {
      resolve: `gatsby-plugin-plausible`,
      options: {
        domain: `iliashaddad.com`,
      },
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `iliashaddad`,
      },
    },
    {
      resolve: "gatsby-plugin-mailchimp",
      options: {
        endpoint:
          "https://iliashaddad.us7.list-manage.com/subscribe/post?u=742d5d39e0d2ff7d7a7aafb2e&amp;id=11701e2032",
      },
    },

    {
      resolve: `gatsby-plugin-hotjar`,
      options: {
        includeInDevelopment: true, // optional parameter to include script in development
        id: 2354887,
        sv: 6,
      },
    },
  ],
};
