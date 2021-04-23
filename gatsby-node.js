const path = require(`path`);
exports.createPages = async ({ graphql, actions, reporter }) => {
  const postTemplate = path.resolve(`./src/templates/blogTemplate.js`);
  const tagTemplate = path.resolve(`./src/templates/tagTemplate.js`);
  const projectTemplate = path.resolve(`./src/templates/projectTemplate.js`);

  // Query Ghost data  const tagTemplate = path.resolve(`./src/templates/tagTemplate.js`);

  const result = await graphql(`
    {
      allGhostPost(sort: { order: ASC, fields: published_at }) {
        edges {
          node {
            slug
            primary_tag {
              slug
            }
          }
        }
      }
      allGhostTag {
        edges {
          node {
            slug
          }
        }
      }
      allGhostPage {
        edges {
          node {
            slug
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
  if (!result.data.allGhostPost && !result.data.allGhostTag) {
    return;
  }
  // Create pages for each Ghost post
  const items = result.data.allGhostPost.edges;
  const tags = result.data.allGhostTag.edges;
  const pages = result.data.allGhostPage.edges;

  items.forEach(({ node }) => {
    node.url = `/blog/${node.slug}/`;
    actions.createPage({
      path: node.url,
      component: postTemplate,
      context: {
        slug: node.slug,
        tag: node.primary_tag.slug,
      },
    });
  });
  tags.forEach(({ node }) => {
    node.url = `/tag/${node.slug}/`;
    actions.createPage({
      path: node.url,
      component: tagTemplate,
      context: {
        slug: node.slug,
      },
    });
  });
  pages.forEach(({ node }) => {
    node.url = `/project/${node.slug}/`;
    actions.createPage({
      path: node.url,
      component: projectTemplate,
      context: {
        slug: node.slug,
      },
    });
  });
};
