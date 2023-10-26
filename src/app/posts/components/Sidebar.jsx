"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import moment from "moment";

const Sidebar = () => {
  const [mostPopularPosts, setMostPopularPosts] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [postCategories, setPostCategories] = useState([]);

  const fetchPopularPosts = async () => {
    const res = await fetch("/api/posts/popular", { method: "GET" });
    if (res.ok) {
      const data = await res.json();
      console.log(data?.popularPosts, "popular posts");
      setMostPopularPosts(data?.popularPosts);
    }
  };
  const fetchLatestPosts = async () => {
    const res = await fetch("/api/posts/latest", { method: "GET" });
    if (res.ok) {
      const data = await res.json();
      console.log(data?.latestPosts, "Latest posts");
      setLatestPosts(data?.latestPosts);
    }
  };

  const fetchAllCategories = async () => {
    const res = await fetch("/api/posts/category", { method: "GET" });
    if (res.ok) {
      const data = await res.json();
      setPostCategories(data?.categories);
      console.log(data, "cates");
    }
  };

  useEffect(() => {
    fetchPopularPosts();
    fetchLatestPosts();
    fetchAllCategories();
  }, []);
  return (
    <div className="flex flex-col gap-10">
      <div>
        <p className="text-gray-500">What&apos;s hot</p>
        <h1 className="text-2xl font-bold">Most Polular</h1>
        <div className="flex flex-col gap-5 mt-5">
          {mostPopularPosts?.map((post) => (
            <div className="" key={post?._id}>
              <span className="bg-teal-600 text-white px-5 py-2 rounded-full">
                {post?.categories[0]}
              </span>
              <Link
                href={{
                  pathname: `/posts/${post?.slug}`,
                  query: { id: post?._id },
                }}
              >
                <h1 className="mt-3 text-lg font-semibold hover:underline cursor-pointer">
                  {post?.title}
                </h1>
              </Link>
              <div>
                <span className="font-semibold">John Doe</span>
                <span className="text-gray-500">
                  {" "}
                  - {moment(post?.createdAt).format("MMM DD, YYYY")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* categories */}
      <div>
        <p className="text-gray-500">Discover by topic</p>
        <h1 className="text-2xl font-bold">Categories</h1>
        <div className="flex flex-wrap gap-4 mt-5">
          {postCategories?.map((cat) => (
            <span
              key={cat._id}
              className="bg-gray-200 hover:bg-gray-300 cursor-pointer px-5 py-2 rounded-xl dark:bg-gray-600 dark:hover:bg-gray-700"
            >
              {cat?.name}
            </span>
          ))}
        </div>
      </div>
      {/* editor's pick */}
      <div className="mt-5">
        <p className="text-gray-500">Chosen by the editor</p>
        <h1 className="text-2xl font-bold">Editors Pick</h1>
        <div className="flex flex-col gap-5 mt-5">
          {latestPosts?.map((post) => (
            <div className="" key={post?._id}>
              <span className="bg-teal-600 text-white px-5 py-2 rounded-full">
                {post?.categories[0]}
              </span>
              <Link
                href={{
                  pathname: `/posts/${post?.slug}`,
                  query: { id: post?._id },
                }}
              >
                <h1 className="mt-3 text-lg font-semibold hover:underline cursor-pointer">
                  {post?.title}
                </h1>
              </Link>
              <div>
                <span className="font-semibold">John Doe</span>
                <span className="text-gray-500">
                  {" "}
                  - {moment(post?.createdAt).format("MMM DD, YYYY")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
