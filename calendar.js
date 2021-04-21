/* eslint-disable react/prop-types */
import React from "react";

import { PopupText } from "react-calendly";

export const Calendar = ({ utm }) => {
  return (
    <PopupText
      styles={{ color: "#4c51bf", fontWeight: "500" }}
      text="Book a discovery call"
      url="https://calendly.com/iliashaddad/discovery-call"
      utm={utm}
      onClick={() => {
        if (typeof window !== "undefined" && window !== undefined) {
          // browser code
          window.plausible("Meeting-Modal-Opened", {
            callback: () => console.info("Modal Open  event"),
          });
        }
      }}
    />
  );
};
