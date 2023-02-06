import { getAllPublished, getRecentFeaturedPost, getAllSideProjects, getAllClientsProjects } from '../lib/notion';

function generateSiteMap(posts) {
    return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
   <url>
   <loc>https://iliashaddad.com</loc>
   <lastmod>2023-02-06T09:30:12Z</lastmod>
   <changefreq>weekly</changefreq>
   <priority>0.8</priority>
   </url>
   <url>
   <loc>https://iliashaddad.com/about</loc>
   <lastmod>2023-02-06T09:30:12Z</lastmod>
   <changefreq>weekly</changefreq>
   <priority>0.8</priority>
   </url>
   <url>
   <loc>https://iliashaddad.com/contact</loc>
   <lastmod>2023-02-06T09:30:12Z</lastmod>
   <changefreq>weekly</changefreq>
   <priority>0.8</priority>
   </url>
     ${posts
            .map(({slug, lastModified}) => {
                return `
       <url>
           <loc>${`https://iliashaddad.com/${slug}`}</loc>
           <lastmod>${lastModified}</lastmod>
           <changefreq>weekly</changefreq>
           <priority>1</priority>
       </url>
     `;
            })
            .join('')}
   </urlset>
 `;
}

function SiteMap() {
    // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {

    const posts = await getAllPublished();
    const sideProjects = await getAllSideProjects();
    const clientProjects = await getAllClientsProjects();
    const postSlugs = posts.map(({ slug, lastModified}) => ({ slug: `/blog/${slug}`, lastModified}))
    const sideProjectSlugs = sideProjects.map(({ slug, lastModified })  => ({ slug: `/project/${slug}`, lastModified }))
    const clientProjectSlugs = clientProjects.map(({ slug, lastModified}) => ({ slug: `/project/${slug}`, lastModified }))

    // We generate the XML sitemap with the posts data
    const sitemap = generateSiteMap(postSlugs.concat(sideProjectSlugs).concat(clientProjectSlugs));

    res.setHeader('Content-Type', 'text/xml');
    // we send the XML to the browser
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
}

export default SiteMap;