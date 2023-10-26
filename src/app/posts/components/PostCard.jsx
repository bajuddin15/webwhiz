import Image from "next/image";
import Link from "next/link";
import React from "react";

const PostCard = ({ post }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="">
        <Image
          src={post?.img}
          alt="post-img"
          className="rounded-3xl shadow-md"
          width={1000}
          height={400}
        />
      </div>
      <div className="col-span-2">
        <div className="mb-2">
          <span className="bg-teal-500 text-white text-sm md:text-md px-5 py-2 rounded-full">
            {post?.categories[0]}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <Link
            href={{
              pathname: `/posts/${post?.slug}`,
              query: { id: post?._id },
            }}
          >
            <h2 className="text-[20px] md:text-[28px] font-semibold  hover:underline cursor-pointer">
              {post?.title?.length >= 50
                ? `${post?.title.slice(0, 50)}...`
                : post?.title}
            </h2>
          </Link>
          <p className="text-gray-400">by {post?.author?.name}</p>
        </div>
        <p
          className="text-md md:text-lg my-2 md:my-4"
          style={{ whiteSpace: "pre-line", wordWrap: "break-word" }}
        >
          {post?.description?.length >= 140
            ? `${post?.description.slice(0, 140)}...`
            : post?.description}
        </p>
        <Link
          href={{
            pathname: `/posts/${post?.slug}`,
            query: { id: post?._id },
          }}
        >
          <span className="text-md md:text-lg text-teal-500 hover:text-teal-400 underline rounded-full cursor-pointer">
            Read more
          </span>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
