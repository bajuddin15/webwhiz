"use client";
import Banner from "@/components/Banner/Banner";
import BlogList from "@/components/BlogList/BlogList";
import CategoryList from "@/components/CategoryList/CategoryList";
import Loading from "@/components/Loading/Loading";
import { useEffect, useState } from "react";
import PostsList from "./posts/components/PostsList";
import Sidebar from "./posts/components/Sidebar";

export default function Home() {
  return (
    <div className="">
      {/* <Banner />
      <CategoryList />
      {posts && <BlogList posts={posts} />} */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="col-span-3">
          <PostsList />
        </div>
        <div>
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
