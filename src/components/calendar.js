/* eslint-disable react/prop-types */
import React from "react";

import { PopupText, CalendlyEventListener } from "react-calendly";

export const Calendar = ({ utm }) => {
  return (
    <>
      <CalendlyEventListener
        onDateAndTimeSelected={function noRefCheck() {
          if (typeof window !== "undefined" && window !== undefined) {
            // browser code
            window.plausible("Meeting-Date-Selected", {
              callback: () => console.info(""),
            });
          }
        }}
        onEventScheduled={function noRefCheck() {
          if (typeof window !== "undefined" && window !== undefined) {
            // browser code
            window.plausible("Meeting-Event-Scheduled", {
              callback: () => console.info(""),
            });
          }
        }}
        onEventTypeViewed={function noRefCheck() {
          if (typeof window !== "undefined" && window !== undefined) {
            // browser code
            window.plausible("Meeting-Event-Viewed", {
              callback: () => console.info(""),
            });
          }
        }}
      ></CalendlyEventListener>
      <PopupText
        styles={{ color: "#4c51bf", fontWeight: "500" }}
        text="Book a discovery call"
        url="https://calendly.com/iliashaddad/discovery-call"
        utm={utm}
      />
    </>
  );
};
