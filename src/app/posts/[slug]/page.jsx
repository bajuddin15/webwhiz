"use client";
import ReactHtmlParser from "react-html-parser";
import { BsTwitter, BsFacebook, BsLinkedin } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { BiSolidEdit, BiLike, BiSolidLike } from "react-icons/bi";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { usePagination } from "@/context/PaginationContext";
import Sidebar from "../components/Sidebar";
import Comments from "../components/Comments";
import { useSession } from "next-auth/react";
import moment from "moment";

const SingleBlogPage = ({ searchParams, params }) => {
  const { slug } = params;
  const { id: postId } = searchParams;

  const router = useRouter();
  const { data, status } = useSession();
  const { progress, setProgress } = usePagination();

  const [post, setPost] = useState(null);

  const getPostData = async (postId) => {
    setProgress(progress + 10);
    const res = await fetch(`/api/posts/${postId}`, { method: "GET" });
    setProgress(progress + 20);
    if (!res.ok) {
      console.log("post is not fetch");
      return;
    }
    setProgress(progress + 20);
    const data = await res.json();
    setPost(data?.post);
    setProgress(100);
  };
  const handleDeletePost = async (postId) => {
    setProgress(progress + 10);
    const res = await fetch(`/api/posts/delete/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setProgress(progress + 20);
    if (!res.ok) {
      toast.error("Post has not been deleted");
    }
    setProgress(progress + 20);
    const promise = () => new Promise((resolve) => setTimeout(resolve, 2000));

    toast.promise(promise, {
      loading: "Loading...",
      success: () => {
        return `Post has been deleted successfully`;
      },
      error: () => {
        return "Post has not been deleted";
      },
    });
    router.replace("/posts");
  };

  const likedPost = async (postId) => {
    const likeData = {
      postId,
      userId: data?.token?.sub,
    };

    const res = await fetch("/api/posts/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(likeData),
    });
    if (res.ok) {
      const postData = await res.json();
      setPost(postData?.post);
      console.log({ userId: data?.token?.sub, likes: postData?.post?.likes });
    }
  };

  const dislikedPost = async (postId) => {
    const dislikeData = {
      postId,
      userId: data?.token?.sub,
    };

    const res = await fetch("/api/posts/dislike", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dislikeData),
    });
    if (res.ok) {
      const postData = await res.json();
      setPost(postData?.post);
      console.log({ userId: data?.token?.sub, likes: postData?.post?.likes });
    }
  };

  useEffect(() => {
    if (postId) {
      getPostData(postId);
    } else {
      setProgress(progress + 10);
    }
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
      <div className="col-span-3">
        <div>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-5">
              <h1 className="text-3xl md:text-4xl font-semibold">
                {post?.title}
              </h1>
              <p
                className="text-lg md:text-xl"
                style={{ whiteSpace: "pre-line", wordWrap: "break-word" }}
              >
                {post?.description}
              </p>
              <div className="flex items-center justify-between gap-4 my-3">
                <div className="flex items-center gap-5">
                  {post?.categories?.map((cat, index) => (
                    <span
                      key={index}
                      className="bg-teal-600 text-white px-3 py-2 rounded-full cursor-pointer "
                    >
                      {cat}
                    </span>
                  ))}
                  {status === "authenticated" && (
                    <div className="text-teal-500 cursor-pointer flex items-center gap-1">
                      {!post?.likes?.includes(data?.token?.sub) ? (
                        <div onClick={() => likedPost(postId)}>
                          <BiLike size={36} />
                        </div>
                      ) : (
                        <div onClick={() => dislikedPost(postId)}>
                          <BiSolidLike size={36} />
                        </div>
                      )}
                      <span className="text-lg font-semibold">
                        {post?.likes?.length}
                      </span>
                    </div>
                  )}
                </div>
                {status === "authenticated" &&
                  data?.token?.sub === post?.author._id && (
                    <div className="flex items-center gap-5">
                      <Link
                        href={{
                          pathname: `/posts/edit/${postId}`,
                        }}
                      >
                        <div className="text-teal-600 cursor-pointer">
                          <BiSolidEdit size={36} />
                        </div>
                      </Link>
                      <div
                        className="text-red-600 cursor-pointer"
                        onClick={() => handleDeletePost(postId)}
                      >
                        <MdDelete size={36} />
                      </div>
                    </div>
                  )}
              </div>
            </div>
            <div className="w-full h-[250px] md:h-[500px]">
              <img
                src={post?.img}
                alt="post-img"
                className="w-full h-full object-cover rounded-3xl"
              />
            </div>
          </div>
          <div className="mb-5">
            {/* user info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-5">
              <div className="flex items-center gap-5">
                <div className="relative inline-flex mr-3 items-center justify-center w-16 h-16 overflow-hidden bg-gray-200 rounded-full dark:bg-gray-600">
                  <span className="text-2xl font-medium text-gray-600 dark:text-gray-300">
                    {post?.author?.name[0]}
                  </span>
                </div>
                {/* <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
                  alt=""
                  className="w-16 h-16 rounded-full object-cover"
                /> */}
                <div className="text-lg">
                  <p>
                    by{" "}
                    <span className="cursor-pointer hover:underline">
                      {post?.author?.name}
                    </span>
                  </p>
                  <p>
                    {moment(post?.createdAt).format("MMMM DD, YYYY")}
                    {/* <span className="hidden md:inline-block">
                      {"  "}∙ 3 min read
                    </span> */}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between md:justify-end gap-10">
                <span className="flex md:hidden">3 min read</span>
                <div className="flex items-center gap-10">
                  <BsTwitter size={24} />
                  <BsFacebook size={24} />
                  <BsLinkedin size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* post content */}
        <div className="flex flex-col gap-5">
          {ReactHtmlParser(post?.content)}
        </div>
        {/* Comments */}
        <Comments postId={postId} commentsData={post?.comments} />
      </div>
      <div>
        <Sidebar />
      </div>
    </div>
  );
};

export default SingleBlogPage;
