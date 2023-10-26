"use client";
import Image from "next/image";
import React from "react";
import bmg from "@/assets/coding.png";
import Link from "next/link";

const BlogList = ({ posts }) => {
  console.log(posts, "bloglist");
  return (
    <>
      <div className="my-10 grid grid-cols-1 md:grid-cols-3 gap-5">
        {posts?.map((post, index) => (
          <div key={index}>
            <div>
              <Image
                src={post?.img}
                alt="bmg"
                className="rounded-3xl"
                width={500}
                height={250}
              />
            </div>
            <div>
              <div className="flex items-center gap-4 my-3">
                {post.categories?.map((cat, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 px-3 py-2 rounded-full cursor-pointer hover:bg-gray-300"
                  >
                    {cat}
                  </span>
                ))}
              </div>
              <Link
                href={{
                  pathname: `/posts/${post?.slug}`,
                  query: { id: post?._id },
                }}
              >
                <h1 className="text-3xl font-bold my-3 cursor-pointer hover:underline">
                  {post?.title?.length >= 50
                    ? `${post?.title.slice(0, 50)}...`
                    : post?.title}
                </h1>
              </Link>
              <p className="text-gray-500 text-md md:text-lg">
                {post?.description?.length >= 140
                  ? `${post?.description.slice(0, 140)}...`
                  : post?.description}
              </p>
              <div className="text-md md:text-lg mt-5">
                by{" "}
                <span className="hover:underline cursor-pointer">
                  Damian Erdman
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* load more button */}
      <div className="flex items-center justify-center my-10">
        <button className="bg-yellow-500 px-10 py-5 rounded-full text-md md:text-lg font-semibold hover:bg-yellow-600 shadow-md">
          Load more
        </button>
      </div>
    </>
  );
};

export default BlogList;
