import React from "react";

import Image from "next/image";

const Footer = () => {
  const webwhizLogo =
    "http://res.cloudinary.com/dcf23bhzd/image/upload/v1698335949/nextjsblog_uploads/lwi5qg90w8wnftila01p.png";
  return (
    <div className="my-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2">
          <div className="">
            <Image src={webwhizLogo} alt="webwhiz" width={240} height={240} />
          </div>
          <p className="text-md md:text-lg text-gray-500 my-5">
            A minimal, functional theme for running a <br /> paid-membership
            publication on Ghost.
          </p>
        </div>
        <div className="pt-10">
          <button className="bg-teal-500 text-white w-full py-3 rounded-full text-md md:text-xl font-semibold hover:bg-teal-600 shadow-md">
            Become a subscriber
          </button>
          <p className="text-md md:text-lg text-gray-500 text-center my-5">
            Get all the latest posts delivered straight to your inbox.
          </p>
        </div>
      </div>
      <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <span class="block text-lg text-gray-500 text-center dark:text-gray-400">
        © 2023{" "}
        <a href="https://flowbite.com/" class="hover:underline">
          Webwhiz™
        </a>
        . All Rights Reserved.
      </span>
      {/* <div className="grid grid-cols-2 md:grid-cols-6 gap-5 my-5">
        <div>
          <h2 className="text-xl font-semibold">Social</h2>
          <ul className="flex flex-col gap-2 text-lg mt-3">
            <li>Facebook</li>
            <li>Youtube</li>
            <li>Linkedin</li>
            <li>Twitter</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Social</h2>
          <ul className="flex flex-col gap-2 text-lg mt-3">
            <li>Facebook</li>
            <li>Youtube</li>
            <li>Linkedin</li>
            <li>Twitter</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Social</h2>
          <ul className="flex flex-col gap-2 text-lg mt-3">
            <li>Facebook</li>
            <li>Youtube</li>
            <li>Linkedin</li>
            <li>Twitter</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Social</h2>
          <ul className="flex flex-col gap-2 text-lg mt-3">
            <li>Facebook</li>
            <li>Youtube</li>
            <li>Linkedin</li>
            <li>Twitter</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Social</h2>
          <ul className="flex flex-col gap-2 text-lg mt-3">
            <li>Facebook</li>
            <li>Youtube</li>
            <li>Linkedin</li>
            <li>Twitter</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Social</h2>
          <ul className="flex flex-col gap-2 text-lg mt-3">
            <li>Facebook</li>
            <li>Youtube</li>
            <li>Linkedin</li>
            <li>Twitter</li>
          </ul>
        </div>
      </div> */}
    </div>
  );
};

export default Footer;
