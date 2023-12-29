require('dotenv').config({})
const { Client } = require('@notionhq/client')
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})
const AWS = require('aws-sdk')
const axios = require('axios')
const matter = require('gray-matter')
const babel = require('@babel/core')
const spacesEndpoint = new AWS.Endpoint('nyc3.digitaloceanspaces.com')
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_KEY,
})

export const getAllPublished = async (limit = 100) => {
  const posts = await notion.databases.query({
    database_id: process.env.DATABASE_ID,
    filter: {
      property: 'Published',
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: 'Date',
        direction: 'descending',
      },
    ],
    page_size: limit,
  })
  const allPosts = posts.results
  return await Promise.all(
    allPosts.map(async (post) => {
      const data = await getPageMetaData(post)
      return data
    })
  )
}
export const getAllSideProjects = async () => {
  const sideProjects = await notion.databases.query({
    database_id: process.env.SIDE_PROJECTS_DATABASE_ID,
    filter: {
      property: 'Published',
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: 'Date',
        direction: 'descending',
      },
    ],
  })
  const allSideProjects = sideProjects.results
  return await Promise.all(
    allSideProjects.map(async (sideProject) => {
      const data = await getPageMetaData(sideProject)
      return data
    })
  )
}
export const getAllClientsProjects = async () => {
  const clientProjects = await notion.databases.query({
    database_id: process.env.CLIENT_PROJECTS_DATABASE_ID,
    filter: {
      property: 'Published',
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: 'Date',
        direction: 'descending',
      },
    ],
  })
  const allClientProjects = clientProjects.results
  return await Promise.all(
    allClientProjects.map(async (clientProject) => {
      const data = await getPageMetaData(clientProject)
      return data
    })
  )
}
export const getAllRecentPublished = async () => {
  const posts = await notion.databases.query({
    database_id: process.env.DATABASE_ID,
    filter: {
      property: 'Published',
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: 'Date',
        direction: 'descending',
      },
    ],
    page_size: 5,
  })
  const allPosts = posts.results
  return await Promise.all(
    allPosts.map(async (post) => {
      const data = await getPageMetaData(post)
      return data
    })
  )
}

export const getRecentFeaturedPost = async () => {
  const posts = await notion.databases.query({
    database_id: process.env.DATABASE_ID,
    filter: {
      and: [
        {
          property: 'Published',
          checkbox: {
            equals: true,
          },
        },
        {
          property: 'Featured',
          checkbox: {
            equals: true,
          },
        },
      ],
    },
    sorts: [
      {
        property: 'Date',
        direction: 'descending',
      },
    ],
    page_size: 5,
  })
  return await getPageMetaData(posts.results[0])
}
const getPageMetaData = async (post) => {
  const getTags = (tags) => {
    const allTags = tags.map((tag) => {
      return tag.name
    })
    return allTags
  }
  let featuredImage
  const slug = post.properties.Slug.rich_text[0].plain_text

  if (post && post.properties['Featured image'].files[0].external) {
    featuredImage = post.properties['Featured image'].files[0].external.url
  } else {
    let url = new URL(post.properties['Featured image'].files[0].file.url)
    let filename = url.pathname.split('/').reverse()[0]
    let ext = filename.split('.')[1]
    if (ext === 'com-gif-maker') {
      ext = 'gif'
    }
    // Generate
    const imageUrl = post.properties['Featured image'].files[0].file.url
    const imageFileName = imageUrl
      .split('?')[0]
      .substring(imageUrl.split('?')[0].lastIndexOf('/') + 1)
    featuredImage = await uploadImageToImageKit({
      id: imageFileName,
      url: imageUrl,
    })
  }
  return new Promise((resolve) =>
    resolve({
      id: post.id,
      title: post.properties.Name.title[0].plain_text,
      tags: getTags(post.properties.Tags.multi_select),
      description: post.properties.Description.rich_text[0]
        ? post.properties.Description.rich_text[0].plain_text
        : '',
      date: getToday(new Date(post.properties['Date'].date.start).toString()),
      slug,
      featuredImage: featuredImage,
      lastModified: new Date(post.properties['Date'].date.start).toISOString(),
      updatedAt:
        post.properties['Updated At'] && post.properties['Updated At'].date
          ? getToday(
              new Date(post.properties['Updated At'].date.start).toString()
            )
          : null,
      service: post.properties.Service
        ? post.properties.Service.select.name
        : null,
      client: post.properties.Client
        ? post.properties.Client.rich_text[0]
        : null,
    })
  )
}
function getToday(datestring) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  let date = new Date()
  if (datestring) {
    date = new Date(datestring)
  }
  const day = date.getDate()
  const month = months[date.getMonth()]
  const year = date.getFullYear()
  let today = `${month} ${day}, ${year}`
  return today
}

const { NotionToMarkdown } = require('notion-to-md')
const n2m = new NotionToMarkdown({ notionClient: notion })
n2m.setCustomTransformer('image', async (block) => {
  const { image } = block
  if (image.file?.url) {
    const imageFileName = image.file.url
      .split('?')[0]
      .substring(image.file.url.split('?')[0].lastIndexOf('/') + 1)
    const imageUrl = await uploadImageToImageKit({
      id: imageFileName,
      url: image.file.url,
    })
    return `![${image.caption.join(' ')}](${imageUrl})`
  }
  if (image.external.url.includes('data')) return
  return `![${image.caption.join(' ')}](${image.external.url})`
})
n2m.setCustomTransformer('video', async (block) => {
  const { video } = block
  console.log(video.external.url)
  if (video.external && video.external.url) {
    return `<iframe frameborder="0" allowfullscreen="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" class="flex lg:block" style="height:500px; width:100%"  src="${video.external.url}"></iframe>`
  }
})
const getRelatedBlogPostByTag = async (tag, slug) => {
  const posts = await notion.databases.query({
    database_id: process.env.DATABASE_ID,
    filter: {
      and: [
        {
          property: 'Tags',
          multi_select: {
            contains: tag,
          },
        },
        {
          property: 'Slug',
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
        property: 'Date',
        direction: 'descending',
      },
    ],
    page_size: 3,
  })
  const allPosts = posts.results
  return await Promise.all(
    allPosts.map(async (post) => {
      const data = await getPageMetaData(post)
      return data
    })
  )
}
export const getBlogPostsByTag = async (tag) => {
  const posts = await notion.databases.query({
    database_id: process.env.DATABASE_ID,
    filter: {
      property: 'Tags',
      multi_select: {
        contains: tag,
      },
    },
    sorts: [
      {
        property: 'Date',
        direction: 'descending',
      },
    ],
  })
  const allPosts = posts.results
  return await Promise.all(
    allPosts.map(async (post) => {
      const data = await getPageMetaData(post)
      return data
    })
  )
}
export const getSingleBlogPostBySlug = async (slug) => {
  const response = await notion.databases.query({
    database_id: process.env.DATABASE_ID,
    filter: {
      property: 'Slug',
      formula: {
        string: {
          equals: slug,
        },
      },
    },
  })
  const page = response.results[0]
  const metadata = await getPageMetaData(page)
  const mdblocks = await n2m.pageToMarkdown(page.id)
  const mdString = n2m.toMarkdownString(mdblocks)
  const relatedPosts = await getRelatedBlogPostByTag(metadata.tags[0], slug)
  const { content } = matter(mdString.parent)

  return {
    metadata,
    markdown: mdString,
    relatedPosts,
    content,
  }
}
export const getProjectBySlug = async (slug, type) => {
  const response = await notion.databases.query({
    database_id:
      type === 'sideProject'
        ? process.env.SIDE_PROJECTS_DATABASE_ID
        : process.env.CLIENT_PROJECTS_DATABASE_ID,
    filter: {
      property: 'Slug',
      formula: {
        string: {
          equals: slug,
        },
      },
    },
  })

  const page = response.results[0]
  if (!page) {
    return null
  }
  const metadata = await getPageMetaData(page)
  const mdblocks = await n2m.pageToMarkdown(page.id)
  const mdString = n2m.toMarkdownString(mdblocks)

  const { content } = matter(mdString.parent)
  console.log(content)

  return {
    metadata,
    markdown: mdString,
    content,
  }
}

const uploadImageToImageKit = ({ id, url }) => {
  return new Promise((resolve, reject) => {
    try {
      const params = {
        Bucket: process.env.SPACE_NAME,
        Key: `assets/${id}`,
      }
      s3.headObject(params, async function (err, data) {
        if (err) {
          if (err.code === 'NotFound') {
            const response = await axios({
              method: 'get',
              url: url,
              responseType: 'stream',
            })
            params.Body = response.data
            params.ACL = 'public-read'
            // S3 ManagedUpload with callbacks are not supported in AWS SDK for JavaScript (v3).
            // Please convert to 'await client.upload(params, options).promise()', and re-run aws-sdk-js-codemod.
            s3.upload(params, function (err, data) {
              if (err) console.log(err, err.stack)
              else {
                const publicUrl = `https://${params.Bucket}.${spacesEndpoint.hostname}/${params.Key}`
                console.log('File uploaded successfully.', publicUrl)
                resolve(publicUrl)
              }
            })
          } else {
            // An error occurred.
            console.log(err, err.stack)
            reject(err)
          }
        } else {
          // The file exists.
          const publicUrl = `https://${params.Bucket}.${spacesEndpoint.hostname}/${params.Key}`
          resolve(publicUrl)
        }
      })
    } catch (err) {
      console.log(err)
    }
  });
}
