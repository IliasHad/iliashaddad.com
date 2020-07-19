exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const blogPostTemplate = require.resolve(`./src/templates/blogTemplate.js`);
  const projectTemplate = require.resolve(`./src/templates/projectTemplate.js`);

  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `);

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    if (node.frontmatter.slug.includes("blog")) {
      createPage({
        path: node.frontmatter.slug.toLowerCase().replace(" ", "-"),
        component: blogPostTemplate,
        context: {
          // additional data can be passed via context
          slug: node.frontmatter.slug,
        },
      });
    } else {
      createPage({
        path: node.frontmatter.slug.toLowerCase().replace(" ", "-"),
        component: projectTemplate,
        context: {
          // additional data can be passed via context
          slug: node.frontmatter.slug,
        },
      });
    }
  });
};
