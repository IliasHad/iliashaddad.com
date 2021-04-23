// gatsby-config.js
require("dotenv").config({
  path: `.env`,
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
    {
      resolve: `gatsby-source-ghost`,
      options: {
        apiUrl: process.env.GHOST_API_URL,
        contentApiKey: process.env.CONTENT_API_KEY,
      },
    },
    `gatsby-plugin-advanced-sitemap`,
    `gatsby-plugin-robots-txt`,

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

    // sharp plugins are only needed if you want to use gatsby image processing tools
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaultQuality: 100,
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-remote-images`,
      options: {
        nodeType: `GhostPost`,
        imagePath: `feature_image`,
        name: `featureImageSharp`,
      },
    },
    {
      resolve: `gatsby-plugin-remote-images`,
      options: {
        nodeType: `GhostPage`,
        imagePath: `feature_image`,
        name: `featureImageSharp`,
      },
    },
    {
      resolve: `gatsby-transformer-rehype`,
      options: {
        // Condition for selecting an existing GrapghQL node (optional)
        // If not set, the transformer operates on file nodes.
        filter: (node) =>
          node.internal.type === `GhostPost` ||
          node.internal.type === `GhostPage`,
        // Only needed when using filter (optional, default: node.html)
        // Source location of the html to be transformed
        source: (node) => node.html,
        // Additional fields of the sourced node can be added here (optional)
        // These fields are then available on the htmlNode on `htmlNode.context`
        contextFields: [],
        // Fragment mode (optional, default: true)
        fragment: true,
        // Space mode (optional, default: `html`)
        space: `html`,
        // EmitParseErrors mode (optional, default: false)
        emitParseErrors: false,
        // Verbose mode (optional, default: false)
        verbose: false,
        // Plugins configs (optional but most likely you need one)
        plugins: [
          {
            resolve: `gatsby-rehype-inline-images`,
            // all options are optional and can be omitted
            options: {
              // all images larger are scaled down to maxWidth (default: maxWidth = imageWidth)
              // maxWidth: 2000,
              withWebp: true,
              // disable, if you need to save memory
              useImageCache: true,
            },
          },
        ],
      },
    },

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images`,
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
