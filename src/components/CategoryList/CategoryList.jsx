import Image from "next/image";
import React from "react";
import catImg from "@/assets/crypto.png";

const CategoryList = () => {
  return (
    <div>
      <h2 className="mb-4 font-semibold">POPULAR TAGS</h2>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        <div className="relative transition-all duration-700 ease-in-out  hover:translate-y-2">
          <div className="w-full h-32 md:h-44">
            <Image src={catImg} alt="bb" fill={true} className="rounded-2xl" />
          </div>
          <span className="bg-white absolute left-2 bottom-2 px-3 py-2 rounded-full">
            coder
          </span>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
