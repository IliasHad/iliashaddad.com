import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaMedium,
  FaGithub,
  FaProductHunt,
} from "react-icons/fa";

export const Contact = () => {
  return (
    <section className="p-12">
      <div className="w-2/4 ">
        <h5 className="text-3xl font-bold">
          Let&apos;s Build Something Together
        </h5>
      </div>
      <div className="grid  grid-cols-1 md:grid-cols-2 py-12 gap-12">
        <p>
          Feel free to reach out if you&apos;re looking for a developer, have a
          question, or just want to connect.
        </p>

        <div>
          <p className="py-2">
            Email:
            <a
              href="mailto:iliasshaddaddev@gmail.com"
              className="pl-2"
              target="__blank"
            >
              iliashaddaddev@gmail.com
            </a>
          </p>

          <div className="grid grid-cols-6 sm:col-gap-8  lg:col-gap-4  w-1/2 py-3">
            <a href="https://web.facebook.com/iliasshaddad99/" target="__blank">
              <FaFacebook className="h-6 w-6" />
            </a>
            <a href="https://www.instagram.com/iliashaddad3" target="__blank">
              <FaInstagram className="h-6 w-6" />
            </a>
            <a href="https://medium.com/@iliashaddad" target="__blank">
              <FaMedium className="h-6 w-6" />
            </a>
            <a href="https://twitter.com/IliasHaddad3" target="__blank">
              <FaTwitter className="h-6 w-6" />
            </a>
            <a href="https://github.com/IliasHad" target="__blank">
              <FaGithub className="h-6 w-6" />
            </a>
            <a href="https://producthunt.com/@IliasHaddad3" target="__blank">
              <FaProductHunt className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
