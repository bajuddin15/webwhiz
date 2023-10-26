import React from "react";
import PostsList from "./components/PostsList";
import Sidebar from "./components/Sidebar";

const PostsPage = () => {
  return (
    <div>
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
};

export default PostsPage;
