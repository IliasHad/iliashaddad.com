const { Client } = require("@notionhq/client");
const path = require("path")
const notion = new Client({
  auth: process.env.NOTION_TOKEN
})

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
  return await Promise.all(allPosts.map(async (post) => {
    const data = await getPageMetaData(post);
    return data;
  }));
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
  return await Promise.all(allSideProjects.map(async (sideProject) => {
    const data = await getPageMetaData(sideProject);
    return data;
  }));
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
  return await Promise.all(allClientProjects.map(async (clientProject) => {
    const data = await getPageMetaData(clientProject);
    return data;
  }));
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
    page_size: 5
  });
  const allPosts = posts.results;
  return await Promise.all(allPosts.map(async (post) => {
    const data = await getPageMetaData(post);
    return data;
  }));
};

export const getRecentFeaturedPost = async () => {
  const posts = await notion.databases.query({
    database_id: process.env.DATABASE_ID,
    filter: {
      "and": [
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
      ]
    },
    sorts: [
      {
        property: "Date",
        direction: "descending",
      },
    ],
    page_size: 5
  });
  return await getPageMetaData(posts.results[0]);
};
const getPageMetaData = async (post) => {
  const fs = require('fs');

  const getTags = (tags) => {
    const allTags = tags.map((tag) => {
      return tag.name;
    });
    return allTags;
  };
  let url = new URL(post.properties["Featured image"].files[0].file.url,);
  let filename = url.pathname.split('/').reverse()[0]
  let ext = filename.split('.')[1];
  if (ext === "com-gif-maker") {
    ext = "gif"
  }
  if (!fs.existsSync('public')) {
    fs.mkdirSync('public')
  }
  if (!fs.existsSync('public/posts')) {
    fs.mkdirSync('public/posts')
  }
  if (!fs.existsSync(path.resolve('public/posts', `${post.id}.${ext}`))) {
    await downloadImage(post.properties["Featured image"].files[0].file.url, path.resolve('public/posts', `${post.id}.${ext}`))
  }
  return new Promise(resolve => resolve({
    id: post.id,
    title: post.properties.Name.title[0].plain_text,
    tags: getTags(post.properties.Tags.multi_select),
    description: post.properties.Description.rich_text[0] ? post.properties.Description.rich_text[0].plain_text : "",
    date: getToday(new Date(post.properties["Date"].date.start).toString()),
    slug: post.properties.Slug.rich_text[0].plain_text,
    featuredImage: `/posts/${post.id}.${ext}`,
    lastModified: new Date(post.properties["Date"].date.start).toISOString(),
  }));
}
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
};

const { NotionToMarkdown } = require("notion-to-md");
const n2m = new NotionToMarkdown({ notionClient: notion });
n2m.setCustomTransformer('image', async (block) => {
  const { image } = block;
  if (image.file?.url) return `![${image.caption.join(" ")}](${image.file.url})`;
  if (image.external.url.includes("data")) return;
  return `![${image.caption.join(" ")}](${image.external.url})`;
});

const getRelatedBlogPostByTag = async (tag) => {
  const posts = await notion.databases.query({
    database_id: process.env.DATABASE_ID,
    filter: {
      property: "Tags",
      multi_select: {
        contains: tag
      },
    },
    sorts: [
      {
        property: "Date",
        direction: "descending",
      },
    ],
    page_size: 3
  });
  const allPosts = posts.results;
  return await Promise.all(allPosts.map(async (post) => {
    const data = await getPageMetaData(post);
    return data;
  }));

}
export const getBlogPostsByTag = async (tag) => {
  const posts = await notion.databases.query({
    database_id: process.env.DATABASE_ID,
    filter: {
      property: "Tags",
      multi_select: {
        contains: tag
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
  return await Promise.all(allPosts.map(async (post) => {
    const data = await getPageMetaData(post);
    return data;
  }));

}
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
  const relatedPosts = await getRelatedBlogPostByTag(metadata.tags[0])
  return {
    metadata,
    markdown: mdString,
    relatedPosts
  };
}
export const getProjectBySlug = async (slug, type) => {
  const response = await notion.databases.query({
    database_id: type === "sideProject" ? process.env.SIDE_PROJECTS_DATABASE_ID : process.env.CLIENT_PROJECTS_DATABASE_ID,
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
}

function downloadImage(url, filepath) {
  const fs = require('fs');
  const client = require('https');
  return new Promise((resolve, reject) => {
    client.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(fs.createWriteStream(filepath))
          .on('error', reject)
          .once('close', () => resolve(filepath));
      } else {
        // Consume response data to free up memory
        res.resume();
        reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));

      }
    });
  });
}