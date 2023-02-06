import { getAllRecentPublished, getRecentFeaturedPost, getAllSideProjects, getAllClientsProjects } from '../lib/notion';
import { Layout } from "../components/Layout";
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Articles } from "../components/Articles";
import { Testimonials } from "../components/Testimonials";
import { SideProject } from "../components/SideProject";
import { Work } from "../components/Work";
import { Logos } from "../components/Logos";
import { Skills } from "../components/Skills";
import { Services } from "../components/Services";
import { Talks } from "../components/Talks";
import { SEO } from "../components/Seo";

export default function Home({ posts, featuredPost, sideProjects,  clientProjects }) {
  return (
    <Layout>
      <SEO
        keywords={[
          `Shopify Developer`,
          `Freelancer`,
          `Shopify App Developer`,
          `Shopify Theme Developer`,
          `Web App Developer`,
          `Shopify Blog`,
          `Developer Blog`,
          `Developer Portfolio`,
          `Web App Developer Portfolio`,
          `Full Stack Developer Portfolio`,
          `Shopify Developer Portfolio`,
        ]}
        title="Full Stack Developer, Shopify Developer, and Freelancer"
      />
      <Hero />
      <Logos />
      <About />
      <Skills />
      <SideProject sideProjects={sideProjects} />
      <Work clientProjects={clientProjects} />
      <Services />
      <Articles posts={posts} featuredPost={featuredPost} />
      <Testimonials />
      <Talks />
    </Layout>

  )
}
export const getStaticProps = async () => {
  const posts = await getAllRecentPublished();
  const featuredPost = await getRecentFeaturedPost();
  const sideProjects = await getAllSideProjects();
  const clientProjects = await getAllClientsProjects();
  return {
    props: {
      posts,
      featuredPost,
      sideProjects,
      clientProjects
    },
    revalidate: 60
  };
};
