/* eslint-disable react/prop-types */
import React, { useRef, useEffect, useState, Fragment } from "react";
import { usePlausible } from 'next-plausible'
import { useCalendlyEventListener, InlineWidget } from "react-calendly";
import { Dialog, Transition } from '@headlessui/react'

export const Calendar = ({ utm, textColor = 'text-black' }) => {
  const ref = useRef(null);
  const plausible = usePlausible()
  const [openPopupWidget, setOpenPopupWidget] = useState(false);
  useCalendlyEventListener({
    onDateAndTimeSelected: () => {
      plausible("Meeting-Date-Selected")
    },
    onEventTypeViewed: () => {
      plausible("Meeting-Event-Viewed")
    },
    onEventScheduled: (e) => {
      plausible("Meeting-Event-Scheduled")

    },

  });

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpenPopupWidget(false)
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
    <div ref={ref}>
      <Transition.Root show={openPopupWidget} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpenPopupWidget}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <InlineWidget
                    url="https://calendly.com/iliashaddad/discovery-call"
                    /*
                     * react-calendly uses React's Portal feature (https://reactjs.org/docs/portals.html) to render the popup modal. As a result, you'll need to
                     * specify the rootElement property to ensure that the modal is inserted into the correct domNode.
                     */
                    text="Click here to schedule!"
                    textColor="#ffffff"
                    color="#00a2ff"
                    utm={utm}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <button
        className={`${textColor} underline font-semibold`}
        onClick={() =>
          setOpenPopupWidget(true)
        }
      >
        Book a discovery call
      </button>
    </div>
  );
};


