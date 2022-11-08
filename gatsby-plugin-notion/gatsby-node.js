/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */
// You can delete this file if you're not using it

/**
 * You can uncomment the following line to verify that
 * your plugin is being loaded in your site.
 *
 * See: https://www.gatsbyjs.com/docs/creating-a-local-plugin/#developing-a-local-plugin-that-is-outside-your-project
 */
exports.onPreInit = () => console.log("Loaded gatsby-starter-plugin");
const { Client } = require("@notionhq/client");
const { createRemoteFileNode } = require(`gatsby-source-filesystem`);
const slugify = require("slugify");

exports.createSchemaCustomization = ({ actions }, pluginOptions) => {
  const { createTypes } = actions;
  const { nodeType } = pluginOptions;

  createTypes(`
    type ${nodeType} implements Node {
      id: ID!
      featuredImage: File @link
      imgUrl: String!
      title: String!
      slug: String!
      featured: Boolean!
      published: Boolean!
      tags: [Tag]
      published_at: Date!
      created_at: Date!
      excerpt: String
      description: String
      blocks: String!
    }

    type Tag {
      slug: String!
      name: String!
    }
    
    
    `);
};

exports.sourceNodes = async (
  { actions, createContentDigest, createNodeId, getNodesByType, getCache },
  pluginOptions
) => {
  const { createNode, touchNode } = actions;

  const { databaseId, token, nodeType } = pluginOptions;
  const notion = new Client({
    auth: token,
  });
  const response = await notion.databases.query({
    database_id: databaseId,
  });

  // loop through data returned from the api and create Gatsby nodes for them
  response.results.forEach(async (page) => {
    let blocks = [];

    const getNotionBlocks = async (cursor) => {
      let options = {
        block_id: page.id,
        page_size: 100,
      };
      if (cursor) {
        options.start_cursor = cursor;
      }
      const data = await notion.blocks.children.list(options);
      if (blocks.length === 0) blocks = data.results;
      else blocks = blocks.concat(data.results);
      if (data.next_cursor) getNotionBlocks(data.next_cursor);
      // eslint-disable-next-line no-undef
      return new Promise((resolve) => {
        if (!data.next_cursor) resolve("done");
      });
    };
    await getNotionBlocks();

    console.log(blocks);
    //writing to file
    if (!blocks) return;
    if (!page.properties["Featured image"].files[0]) return;
    const fileNode = await createRemoteFileNode({
      // the url of the remote image to generate a node for
      url: page.properties["Featured image"].files[0].file.url,
      getCache,
      createNode,
      createNodeId,
    });
    const stringify = Object.fromEntries(
      Object.entries(page.properties).filter(
        // eslint-disable-next-line no-unused-vars
        ([key, value]) => value.id === "title"
      )
    );
    for (const [index, block] of blocks.entries()) {
      if (block.type === "image" && block.file && block.file.url) {
        const imageNode = await createRemoteFileNode({
          url: block.file.url, // string that points to the URL of the image
          createNode, // helper function in gatsby-node to generate the node
          createNodeId, // helper function in gatsby-node to generate the node id
          getCache,
        });

        // if the file was created, extend the node with "localFile"
        if (fileNode) {
          // console.log(fileNode);
          blocks[index] = { ...block, imageNodeId: imageNode.id };
          console.log(blocks[index]);
        }
      }
    }

    const node = {
      id: createNodeId(page.id), // hashes the inputs into an ID
      parent: nodeType,
      excerpt:
        blocks
          .filter((block) => block.type === "paragraph")
          .map((block) => {
            return block.paragraph.rich_text
              .map(({ text }) => text.content)
              .join(" ");
          })
          .join(" ")
          .slice(0, 100) + "...",
      created_at: page.created_time,
      published_at: new Date(page.properties["Date"].date),
      tags: page.properties["Tags"].multi_select
        .filter((el) => el.color)
        .map((el) => {
          return {
            ...el,
            slug: slugify(el.name, {
              lower: true,
            }),
          };
        }),
      slug: page.properties["Slug"].rich_text[0]?.text.content,
      description: page.properties["Description"]?.rich_text[0]?.text.content,
      featured: page.properties["Featured"].checkbox,
      published: page.properties["Published"].checkbox,
      children: [],
      featuredImage: fileNode.id,
      imgUrl: page.properties["Featured image"].files[0].file.url,
      internal: {
        mediaType: `application/json`,
        type: nodeType,
        content: JSON.stringify(page),
        contentDigest: createContentDigest(page),
      },
      blocks: JSON.stringify(blocks),
    };

    console.log();
    if (stringify[Object.keys(stringify)[0]]) {
      node.title = stringify[Object.keys(stringify)[0]].title[0].plain_text;
      if (!node.slug) {
        node.slug = slugify(node.title, { lower: true });
      }
    }
    await createNode(node);
  });
  getNodesByType(nodeType).forEach((node) => touchNode(node));
  return;
};
