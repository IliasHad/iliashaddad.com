const { Client } = require("@notionhq/client");
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});
const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_ENDPOINT,
});

export const getAllPublished = async () => {
  const posts = await notion.databases.query({
    database_id: process.env.DATABASE_ID,
    filter: {
      property: "Published",
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: "Date",
        direction: "descending",
      },
    ],
  });
  const allPosts = posts.results;
  return await Promise.all(
    allPosts.map(async (post) => {
      const data = await getPageMetaData(post);
      return data;
    })
  );
};
export const getAllSideProjects = async () => {
  const sideProjects = await notion.databases.query({
    database_id: process.env.SIDE_PROJECTS_DATABASE_ID,
    filter: {
      property: "Published",
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: "Date",
        direction: "descending",
      },
    ],
  });
  const allSideProjects = sideProjects.results;
  return await Promise.all(
    allSideProjects.map(async (sideProject) => {
      const data = await getPageMetaData(sideProject);
      return data;
    })
  );
};
export const getAllClientsProjects = async () => {
  const clientProjects = await notion.databases.query({
    database_id: process.env.CLIENT_PROJECTS_DATABASE_ID,
    filter: {
      property: "Published",
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: "Date",
        direction: "descending",
      },
    ],
  });
  const allClientProjects = clientProjects.results;
  return await Promise.all(
    allClientProjects.map(async (clientProject) => {
      const data = await getPageMetaData(clientProject);
      return data;
    })
  );
};
export const getAllRecentPublished = async () => {
  const posts = await notion.databases.query({
    database_id: process.env.DATABASE_ID,
    filter: {
      property: "Published",
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: "Date",
        direction: "descending",
      },
    ],
    page_size: 5,
  });
  const allPosts = posts.results;
  return await Promise.all(
    allPosts.map(async (post) => {
      const data = await getPageMetaData(post);
      return data;
    })
  );
};

export const getRecentFeaturedPost = async () => {
  const posts = await notion.databases.query({
    database_id: process.env.DATABASE_ID,
    filter: {
      and: [
        {
          property: "Published",
          checkbox: {
            equals: true,
          },
        },
        {
          property: "Featured",
          checkbox: {
            equals: true,
          },
        },
      ],
    },
    sorts: [
      {
        property: "Date",
        direction: "descending",
      },
    ],
    page_size: 5,
  });
  return await getPageMetaData(posts.results[0]);
};
const getPageMetaData = async (post) => {
  const getTags = (tags) => {
    const allTags = tags.map((tag) => {
      return tag.name;
    });
    return allTags;
  };
  let url = new URL(post.properties["Featured image"].files[0].file.url);
  let filename = url.pathname.split("/").reverse()[0];
  let ext = filename.split(".")[1];
  if (ext === "com-gif-maker") {
    ext = "gif";
  }
  const slug = post.properties.Slug.rich_text[0].plain_text;

  // Generate
  const imageUrl = post.properties["Featured image"].files[0].file.url;
  const imageFileName = imageUrl
    .split("?")[0]
    .substring(imageUrl.split("?")[0].lastIndexOf("/") + 1);
  const featuredImage = await uploadImageToImageKit({
    id: imageFileName,
    url: imageUrl,
  });
  return new Promise((resolve) =>
    resolve({
      id: post.id,
      title: post.properties.Name.title[0].plain_text,
      tags: getTags(post.properties.Tags.multi_select),
      description: post.properties.Description.rich_text[0]
        ? post.properties.Description.rich_text[0].plain_text
        : "",
      date: getToday(new Date(post.properties["Date"].date.start).toString()),
      slug,
      featuredImage: featuredImage,
      lastModified: new Date(post.properties["Date"].date.start).toISOString(),
    })
  );
};
function getToday(datestring) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let date = new Date();
  if (datestring) {
    date = new Date(datestring);
  }
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  let today = `${month} ${day}, ${year}`;
  return today;
}

const { NotionToMarkdown } = require("notion-to-md");
const n2m = new NotionToMarkdown({ notionClient: notion });
n2m.setCustomTransformer("image", async (block) => {
  const { image } = block;
  if (image.file?.url) {
    const imageFileName = image.file.url
      .split("?")[0]
      .substring(image.file.url.split("?")[0].lastIndexOf("/") + 1);
    const imageUrl = await uploadImageToImageKit({
      id: imageFileName,
      url: image.file.url,
    });
    return `![${image.caption.join(" ")}](${imageUrl})`;
  }
  if (image.external.url.includes("data")) return;
  return `![${image.caption.join(" ")}](${image.external.url})`;
});

const getRelatedBlogPostByTag = async (tag, slug) => {
  const posts = await notion.databases.query({
    database_id: process.env.DATABASE_ID,
    filter: {
      and: [
        {
          property: "Tags",
          multi_select: {
            contains: tag,
          },
        },
        {
          property: "Slug",
          formula: {
            string: {
              does_not_equal: slug,
            },
          },
        },
      ],
    },
    sorts: [
      {
        property: "Date",
        direction: "descending",
      },
    ],
    page_size: 3,
  });
  const allPosts = posts.results;
  return await Promise.all(
    allPosts.map(async (post) => {
      const data = await getPageMetaData(post);
      return data;
    })
  );
};
export const getBlogPostsByTag = async (tag) => {
  const posts = await notion.databases.query({
    database_id: process.env.DATABASE_ID,
    filter: {
      property: "Tags",
      multi_select: {
        contains: tag,
      },
    },
    sorts: [
      {
        property: "Date",
        direction: "descending",
      },
    ],
  });
  const allPosts = posts.results;
  return await Promise.all(
    allPosts.map(async (post) => {
      const data = await getPageMetaData(post);
      return data;
    })
  );
};
export const getSingleBlogPostBySlug = async (slug) => {
  const response = await notion.databases.query({
    database_id: process.env.DATABASE_ID,
    filter: {
      property: "Slug",
      formula: {
        string: {
          equals: slug,
        },
      },
    },
  });
  const page = response.results[0];
  const metadata = await getPageMetaData(page);
  const mdblocks = await n2m.pageToMarkdown(page.id);
  const mdString = n2m.toMarkdownString(mdblocks);
  const relatedPosts = await getRelatedBlogPostByTag(metadata.tags[0], slug);
  return {
    metadata,
    markdown: mdString,
    relatedPosts,
  };
};
export const getProjectBySlug = async (slug, type) => {
  const response = await notion.databases.query({
    database_id:
      type === "sideProject"
        ? process.env.SIDE_PROJECTS_DATABASE_ID
        : process.env.CLIENT_PROJECTS_DATABASE_ID,
    filter: {
      property: "Slug",
      formula: {
        string: {
          equals: slug,
        },
      },
    },
  });

  const page = response.results[0];
  const metadata = await getPageMetaData(page);
  const mdblocks = await n2m.pageToMarkdown(page.id);
  const mdString = n2m.toMarkdownString(mdblocks);

  return {
    metadata,
    markdown: mdString,
  };
};

const uploadImageToImageKit = ({ id, url }) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(id)
      imagekit.listFiles({
        searchQuery: `name="${id}"`,
      }, function (error, result) {
        if (error) {
          console.log(error);
          throw new Error(JSON.stringify(error));
        } else {
          console.log(result[0].url);
          resolve(result[0].url);
        }
      });

    } catch (err) {
      console.log(err)
      await imagekit.upload({
        file: url, //required
        fileName: id, //required
        useUniqueFileName: false,
      });

      const imageUrl = imagekit.url({
        path: id,
      });
      resolve(imageUrl);
    }
  });
};
