import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaMedium,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import { Calendar } from "../components/calendar";

export const Contact = () => {
  return (
    <section className="px-12 py-4">
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
              href="mailto:contact@iliashaddad.com"
              className="pl-2"
              target="__blank"
            >
              contact@iliashaddad.com
            </a>
          </p>
          <p className="py-2">
            <Calendar
              utm={{
                utmCampaign: "Footer Section",
                utmMedium: "Personal Blog",
                utmSource: "iliashaddad.com",
              }}
            />
          </p>

          <div
            className="grid grid-cols-6 py-6"
            style={{
              columnGap: "2rem",
              gridTemplateColumns: "repeat(6, minmax(0, max-content))",
              justifyItems: "start",
            }}
          >
            <a
              href="https://www.linkedin.com/in/ilias-haddad/"
              target="__blank"
            >
              <FaLinkedin className="h-6 w-6" />
            </a>
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
          </div>
        </div>
      </div>
    </section>
  );
};
