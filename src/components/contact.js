import React from "react";

export const Contact = () => {
  return (
    <section className="p-12">
      <div className=" w-full w-2/4 ">
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
          <p>Email: iliasshaddaddev@gmail.com</p>

          <p className="py-4">Social Media Icons</p>
        </div>
      </div>
    </section>
  );
};
