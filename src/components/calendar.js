/* eslint-disable react/prop-types */
import React, { useRef, useEffect } from "react";

import {
  CalendlyEventListener,
  openPopupWidget,
  closePopupWidget,
} from "react-calendly";

export const Calendar = ({ utm }) => {
  const ref = useRef(null);

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        closePopupWidget();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
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

      <button
        ref={ref}
        className="text-indigo-700 underline font-semibold"
        onClick={() =>
          openPopupWidget({
            utm,
            url: "https://calendly.com/iliashaddad/discovery-call",
          })
        }
      >
        Book a discovery call
      </button>
    </>
  );
};
