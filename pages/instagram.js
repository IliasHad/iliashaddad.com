import { Layout } from "../components/Layout";
import { SEO } from "../components/Seo";
import Image from "next/legacy/image";
import Img from "../public/images/IMG_7434.jpg";
import {
  FaTwitter,
  FaInstagram,
  FaGithub,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";

export default function Instagram({

}) {
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
        title="Instagram"
        description="@iliashaddad_dev Instagram"
        featuredImage={"/images/IMG_7434.jpg"}
        url={""}
      />

      <div class="mx-5">
        <div class="">
          <div class="max-w-lg h-auto mx-auto my-20 rounded-sm overflow-hidden shadow-lg bg-mirage-500">
            <div className="h-32 mx-auto w-32">
              <Image
                src={Img}
                alt={"Ilias Haddad"}
                placeholder="blur"
                objectFit="cover"
                quality={100}
                layout="responsive"
                height={80}
                width={80}
                class="object-contain rounded-full mx-auto mt-8 p-1 border-4 border-yellow-500"
              />
            </div>
            <div class="px-6 py-4 text-white">
              <div class="flex flex-col">
                <div class="font-bold text-xl text-center hover:cursor-pointer">
                  @Iliashaddad_dev
                </div>
                <p class="text-sm text-center">Software Engineer</p>
              </div>
            </div>

            <div class="flex flex-col mx-auto text-black text-center">
              <a
                href="https://twitter.com/iliashaddad3"
                target="__blank"
                class="flex flex-row  justify-center mx-auto my-2 bg-white hover:bg-gray-100  w-2/4 text-mirage-500 py-2 pl-2 rounded-md border-r-4"
              >
                <FaTwitter className="h-6 w-6" />
                <h4 class="my-auto  mx-5 text-black">Twitter</h4>
              </a>
              <a
                href="https://www.youtube.com/channel/UCxv_k9zRHdz5L1av2xgEAMA"
                target="__blank"
                class="flex flex-row justify-center  mx-auto my-2 bg-white hover:bg-gray-100  w-2/4 text-mirage-500 py-2 pl-2 rounded-md border-r-4"
              >
              <FaYoutube className="h-6 w-6" />
                <h4 class="my-auto  mx-5">Youtube</h4>
              </a>
              <a
                href="https://github.com/iliashad"
                target="__blank"
                class="flex flex-row  justify-center mx-auto my-2 bg-white hover:bg-gray-100 w-2/4 text-mirage-500 py-2 pl-2 rounded-md border-r-4"
              >
              <FaGithub className="h-6 w-6" />
                <h4 class="my-auto mx-5">Github</h4>
              </a>
              <a
                href="https://www.instagram.com/iliashaddad_dev"
                target="__blank"
                class="flex flex-row  justify-center  mx-auto my-2 bg-white hover:bg-gray-100  w-2/4 text-mirage-500 py-2 pl-2 rounded-md border-r-4"
              >
              <FaInstagram className="h-6 w-6" />
                <h4 class="my-auto  mx-3">Instagram</h4>
              </a>
              <a
                href="https://www.linkedin.com/in/ilias-haddad/"
                target="__blank"
                class="flex flex-row  justify-center  mx-auto my-2 bg-white hover:bg-gray-100  w-2/4 text-mirage-500 py-2 pl-2 rounded-md border-r-4"
              >
                <FaLinkedin className="h-6 w-6" />
                <h4 class="my-auto mx-3">LinkedIn</h4>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
