import React from "react";
import { BiSearch } from "react-icons/bi";

const Banner = () => {
  return (
    <div>
      <div className="flex flex-col items-center gap-10 my-10">
        <div className="text-2xl md:text-6xl flex flex-col items-center gap-3">
          <p className="text-center">
            <span className="font-bold">Hey, we’re Reiro. </span> We promote
            positive
          </p>
          <p className="text-center">
            culture through{" "}
            <span className="font-bold">inspiring articles</span> on
          </p>
          <p className="text-center">health, design, and web.</p>
        </div>
        <div className="flex items-center min-w-full md:min-w-[500px] bg-gray-100 hover:bg-gray-200 cursor-pointer p-3 rounded-full">
          <input
            type="text"
            placeholder="Search posts, tags and authors"
            className="w-full p-3 bg-inherit text-lg border-none outline-none cursor-pointer"
          />
          <div className="bg-yellow-500 p-3 mx-3 rounded-full cursor-pointer">
            <BiSearch size={28} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
