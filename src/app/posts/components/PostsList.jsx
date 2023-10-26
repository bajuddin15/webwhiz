"use client";
import React, { useEffect, useState } from "react";
// import LoadingBar from "react-top-loading-bar";
import PostCard from "./PostCard";
import PostPagination from "./PostPagination";
import { usePagination } from "@/context/PaginationContext";
import Loading from "@/components/Loading/Loading";

const PostsList = () => {
  const { currentPage, pageLimit, progress, setProgress } = usePagination();
  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllPosts = async () => {
    setProgress(progress + 10);
    const queryData = { page: currentPage, limit: pageLimit };
    setProgress(progress + 10);
    const res = await fetch(`/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(queryData),
    });
    setProgress(progress + 20);
    if (res.status === 200) {
      const data = await res.json();
      setPosts(data?.posts);
      setTotalPosts(data?.totalPosts);
    }
    setProgress(100);
    setIsLoading(false);
  };

  useEffect(() => {
    setProgress(progress + 10);
    setIsLoading(true);
    fetchAllPosts();
  }, [currentPage]);
  return (
    <div className="flex flex-col gap-10">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {posts?.map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </>
      )}

      <PostPagination totalPosts={totalPosts} />
    </div>
  );
};

export default PostsList;
