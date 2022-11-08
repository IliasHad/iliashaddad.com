const path = require(`path`);
exports.createPages = async ({ graphql, actions, reporter }) => {
  const postTemplate = path.resolve(`./src/templates/blogTemplate.js`);
  const tagTemplate = path.resolve(`./src/templates/tagTemplate.js`);
  const projectTemplate = path.resolve(`./src/templates/projectTemplate.js`);

  // Query Ghost data  const tagTemplate = path.resolve(`./src/templates/tagTemplate.js`);

  const result = await graphql(`
    {
      allBlogPost: allBlogPost(sort: { order: ASC, fields: published_at }) {
        edges {
          node {
            slug
            tags {
              slug
              name
            }
          }
        }
      }
      allClientProject: allClientProject(
        sort: { order: ASC, fields: published_at }
      ) {
        edges {
          node {
            slug
            tags {
              slug
              name
            }
          }
        }
      }
      allSideProject: allSideProject(
        sort: { order: ASC, fields: published_at }
      ) {
        edges {
          node {
            slug
            tags {
              slug
              name
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
  if (!result.data.allBlogPost) {
    return;
  }
  // Create pages for each Ghost post
  const sideProjects = result.data.allSideProject.edges;
  const clientProjects = result.data.allClientProject.edges;
  const blogPosts = result.data.allBlogPost.edges;
  const tags = [];

  blogPosts.forEach(({ node }) => {
    node.tags.forEach((tag) => {
      if (tags.findIndex((item) => item.slug === tag.slug) < 0) {
        tags.push({ slug: tag.slug, name: tag.name });
        console.log(tags)
      }
    });
    node.url = `/blog/${node.slug}`;
    actions.createPage({
      path: node.url,
      component: postTemplate,
      context: {
        slug: node.slug,
        tag: node.tags[0]?.slug,
      },
    });
  });

  clientProjects.concat(sideProjects).forEach(({ node }) => {
    node.url = `/project/${node.slug}`;
    actions.createPage({
      path: node.url,
      component: projectTemplate,
      context: {
        slug: node.slug,
      },
    });
  });
  tags.forEach((tag) => {
    actions.createPage({
      path: `/tag/${tag.slug}`,
      component: tagTemplate,
      context: {
        slug: tag.slug,
        name: tag.name
      },
    });
  });
};
