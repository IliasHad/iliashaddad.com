// gatsby-config.js
require("dotenv").config({
  path: `.env`,
});
const tailwindConfig = require("./tailwind.config.js");

module.exports = {
  trailingSlash: "always",
  siteMetadata: {
    title: `Ilias Haddad`,
    description: `I'm a 23-year-old self taught developer. As I've grown as a developer, I've worked on multiple side projects to improve my coding skills `,
    siteUrl: `https://iliashaddad.com/`,
    author: `@iliashaddad3`,
  },
  plugins: [
    {
      resolve: require.resolve(`./gatsby-workout-plugin`),
      options: {
        apiKey: process.env.WORKOUT_API_KEY,
        apiToken: process.env.WORKOUT_API_TOKEN,
        userId: process.env.WORKOUT_USER_ID,
        mapId: process.env.WORKOUT_MAP_ID,
      },
    },
    {
      resolve: require.resolve(`./gatsby-plugin-notion`),
      options: {
        token: process.env.NOTION_TOKEN,
        databaseId: process.env.NOTION_CLIENT_DATABASE,
        nodeType: "ClientProject",
      },
    },
    {
      resolve: require.resolve(`./gatsby-plugin-notion`),
      options: {
        token: process.env.NOTION_TOKEN,
        databaseId: process.env.NOTION_BLOG_DATABASE,
        nodeType: "BlogPost",
      },
    },
    {
      resolve: require.resolve(`./gatsby-plugin-notion`),
      options: {
        token: process.env.NOTION_TOKEN,
        databaseId: process.env.NOTION_SIDE_PROJECT_DATABASE,
        nodeType: "SideProject",
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
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`, // Needed for dynamic images
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
        endpoint: process.env.MAILCHIMP_ENDPOINT,
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
