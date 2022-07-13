import React from "react";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <>
      <div className="h-full px-4 md:px-10 md:flex items-center justify-between my-4 md:my-0">
        <p className="md:w-1/2 md:pr-10 text-lg">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
        <div className="md:w-1/2 md:pl-10 space-y-5">
          <div className="md:w-5/6">
            <p className="text-xl font-semibold py-2">Feature 1</p>
            <p className="text-lg">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
          </div>

          <div className="md:w-5/6">
            <p className="text-xl font-semibold py-2">Feature 2</p>
            <p className="text-lg">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
          </div>

          <div className="md:w-5/6">
            <p className="text-xl font-semibold py-2">Feature 3</p>
            <p className="text-lg">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
