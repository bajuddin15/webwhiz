import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import moment from "moment";

const Comments = ({ postId, commentsData }) => {
  const { data, status } = useSession();
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [editCommentInput, setEditCommentInput] = useState("");
  const [settingToggleId, setSettingToggleId] = useState(null);
  const [editSectionToggleId, setEditSectionToggleId] = useState(null);

  useEffect(() => {
    setComments(commentsData);
  }, [commentsData]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentInput) return;
    try {
      const commentData = {
        comment: commentInput,
        postId,
        userId: data?.token?.sub,
      };
      const res = await fetch("/api/posts/comments/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      });
      if (res.ok) {
        const data = await res.json();
        setComments(data?.comments);
        setCommentInput("");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const removeComment = async (commentId) => {
    try {
      const res = await fetch(`/api/posts/comments/delete/${commentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const data = await res.json();
        setComments(data?.comments);
        console.log(data, "deleted comment");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const editCommentSubmit = async (commentId) => {
    const editCommentData = {
      comment: editCommentInput,
    };
    try {
      const res = await fetch(`/api/posts/comments/edit/${commentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editCommentData),
      });
      if (res.ok) {
        const data = await res.json();
        setComments(data?.comments);
        console.log(data, "Update comment");
      }
    } catch (error) {
      console.log(error.message);
    }
    setEditSectionToggleId(null);
  };

  const editToggleHandler = (item) => {
    setEditCommentInput(item?.comment);
    if (editSectionToggleId === item?._id) {
      setEditSectionToggleId(null); // Close the settings for the clicked comment
    } else {
      setEditSectionToggleId(item?._id); // Open the settings for the clicked comment
    }
    setSettingToggleId(null);
  };
  const settingToggleHandler = (commentId) => {
    if (settingToggleId === commentId) {
      setSettingToggleId(null); // Close the settings for the clicked comment
    } else {
      setSettingToggleId(commentId); // Open the settings for the clicked comment
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
      <div className="max-w-full mx-auto md:px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-md md:text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            Discussion ({comments?.length})
          </h2>
        </div>
        {status === "authenticated" ? (
          <form className="mb-6" onSubmit={handleCommentSubmit}>
            <div className="shadow-md py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <label htmlFor="comment" className="sr-only">
                Your comment
              </label>
              <textarea
                id="comment"
                rows="6"
                className="px-0 w-full text-md md:text-lg text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Write a comment..."
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-md md:text-lg font-medium text-center text-white bg-teal-700 rounded-lg focus:ring-4 focus:ring-teal-200 dark:focus:ring-teal-900 hover:bg-teal-800"
            >
              Post comment
            </button>
          </form>
        ) : (
          <>Please Sign In to add comments</>
        )}
        <article className="md:p-6 text-base bg-white rounded-lg dark:bg-gray-900">
          {comments?.map((item) => (
            <div key={item._id}>
              <footer className="flex justify-between items-center mb-2 my-5">
                <div className="flex items-center">
                  <p className="inline-flex items-center mr-3 text-md md:text-lg text-gray-900 dark:text-white font-semibold">
                    <div className="relative inline-flex mr-3 items-center justify-center w-10 h-10 overflow-hidden bg-gray-200 rounded-full dark:bg-gray-600">
                      <span className="font-medium text-gray-600 dark:text-gray-300">
                        {item?.author?.name[0]}
                      </span>
                    </div>
                    {item?.author?.name}
                  </p>
                  <p className="text-md md:text-lg text-gray-600 dark:text-gray-400">
                    <time
                      pubdate
                      datetime="2022-02-08"
                      title="February 8th, 2022"
                    >
                      {moment(item?.createdAt).fromNow()}
                    </time>
                  </p>
                </div>
                {status === "authenticated" &&
                  data?.token?.sub === item?.author?._id && (
                    <div className="flex flex-col gap-4 relative">
                      <button
                        id={`dropdownComment${item._id}Button`}
                        data-dropdown-toggle={`dropdownComment${item._id}`}
                        className="inline-flex items-center p-2 text-md md:text-lg font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        type="button"
                        onClick={() => settingToggleHandler(item._id)}
                      >
                        <svg
                          className="w-4 h-4"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 16 3"
                        >
                          <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                        </svg>
                        <span className="sr-only">Comment settings</span>
                      </button>
                      {settingToggleId === item?._id && (
                        <div
                          id={`dropdownComment${item._id}`}
                          className="absolute right-0 top-10 z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                        >
                          <ul
                            className="py-1 text-md md:text-lg text-gray-700 dark:text-gray-200"
                            aria-labelledby={`dropdownComment${item._id}Button`}
                          >
                            <li onClick={() => editToggleHandler(item)}>
                              <span className="block py-2 px-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                Edit
                              </span>
                            </li>
                            <li onClick={() => removeComment(item?._id)}>
                              <span className="block py-2 px-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                Remove
                              </span>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
              </footer>

              {editSectionToggleId === item?._id ? (
                <div>
                  <div className="mb-6">
                    <div className="shadow-md py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                      <label htmlFor="editcomment" className="sr-only">
                        Edit Your comment
                      </label>
                      <textarea
                        id="editcomment"
                        rows="6"
                        className="px-0 w-full text-md md:text-lg text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                        value={editCommentInput}
                        onChange={(e) => setEditCommentInput(e.target.value)}
                        required
                      ></textarea>
                    </div>
                    <button
                      className="inline-flex items-center py-2.5 px-4 text-md md:text-lg font-medium text-center text-white bg-teal-700 rounded-lg focus:ring-4 focus:ring-teal-200 dark:focus:ring-teal-900 hover:bg-teal-800"
                      onClick={() => editCommentSubmit(item?._id)}
                    >
                      Edit comment
                    </button>
                  </div>
                </div>
              ) : (
                <p
                  className="text-gray-500 dark:text-gray-400"
                  style={{ whiteSpace: "pre-line", wordWrap: "break-word" }}
                >
                  {item?.comment}
                </p>
              )}
              <div className="flex items-center mt-4 space-x-4">
                <button
                  type="button"
                  className="flex items-center text-md md:text-lg text-gray-500 hover:underline dark:text-gray-400 font-medium"
                >
                  <svg
                    className="mr-1.5 w-3.5 h-3.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 18"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                    />
                  </svg>
                  Reply
                </button>
              </div>
            </div>
          ))}
        </article>
      </div>
    </section>
  );
};

export default Comments;
