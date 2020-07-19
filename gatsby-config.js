const resolveConfig = require("tailwindcss/resolveConfig");
const tailwindConfig = require("./tailwind.config.js");

const fullConfig = resolveConfig(tailwindConfig);

module.exports = {
  siteMetadata: {
    title: `Ilias Haddad`,
    description: `Gatsby starter styled with Tailwind`,
    siteUrl: `https://iliashaddad.netlify.com/`,
    author: `@iliashaddad3`,
  },
  plugins: [
    `gatsby-plugin-eslint`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-tailwind`,
        short_name: `starter`,
        start_url: `/`,
        background_color: fullConfig.theme.colors.white,
        theme_color: fullConfig.theme.colors.teal["400"],
        display: `minimal-ui`,
        icon: `src/images/tailwind-icon.png`,
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
    `gatsby-transformer-remark`,
  ],
};
