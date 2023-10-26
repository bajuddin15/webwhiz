import { usePagination } from "@/context/PaginationContext";
import React, { useEffect, useState } from "react";

const PostPagination = ({ totalPosts }) => {
  const [count, setCount] = useState(0);
  const { currentPage, setCurrentPage, pageLimit } = usePagination();
  const [defaultPages, setDefaultPages] = useState([1, 2, 3]);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  useEffect(() => {
    const totalPostsNumber = parseInt(totalPosts, 10); // Convert totalPosts to a number
    const lastPage = Math.floor(totalPostsNumber / pageLimit);
    const reminder = totalPostsNumber % pageLimit;
    const lastPageNumber = reminder > 0 ? lastPage + 1 : lastPage;
    console.log(lastPage, "lastPage");
    console.log(reminder, "reminder");
    console.log(lastPageNumber, "lastPageNum");

    if (totalPosts && count + defaultPages[2] == lastPageNumber) {
      setIsNextDisabled(true);
    }

    if (totalPosts && count + defaultPages[2] > lastPageNumber) {
      setDefaultPages([1, 2]);
      setIsNextDisabled(true);
    }
    if (totalPosts && count + defaultPages[1] > lastPageNumber) {
      setDefaultPages([1]);
      setIsNextDisabled(true);
    }
    if (totalPosts === 0) {
      setDefaultPages([1]);
      setIsNextDisabled(true);
    }

    // window.scroll(0, 450);
  }, [currentPage, count, totalPosts]);

  return (
    <nav aria-label="Page navigation">
      <ul className="list-style-none flex gap-2 md:gap-4">
        <li
          onClick={() => {
            setCount(count > 0 ? count - 1 : count);
            setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage);
          }}
        >
          <a
            className={
              count <= 0
                ? `cursor-pointer hover:bg-neutral-100  dark:hover:bg-neutral-700 dark:hover:text-white relative block rounded bg-transparent px-4 py-2 text-md md:text-lg text-neutral-500 transition-all duration-300 dark:text-neutral-400`
                : "relative cursor-pointer  block rounded bg-transparent px-4 py-2 text-md md:text-lg text-neutral-600 transition-all duration-300 hover-bg-neutral-100 dark:text-white dark:hover-bg-neutral-700 dark:hover-text-white"
            }
          >
            Previous
          </a>
        </li>
        {defaultPages?.map((item, index) => (
          <li
            key={index}
            onClick={() => {
              setCurrentPage(count + defaultPages[index]);
              console.log(count + defaultPages[index]);
            }}
          >
            <a
              className={`relative block rounded ${
                count + defaultPages[index] === currentPage
                  ? "bg-teal-100 text-teal-700"
                  : "bg-transparent text-neutral-600 dark:text-white"
              }  px-4 py-2 text-md md:text-lg font-medium  transition-all duration-300`}
              href="#!"
            >
              {count + defaultPages[index]}
            </a>
          </li>
        ))}

        <li
          onClick={() => {
            if (!isNextDisabled) {
              setCount(count + 1);
              setCurrentPage(currentPage + 1);
            }
          }}
        >
          <a
            className={`relative block rounded bg-transparent px-4 py-2 text-md md:text-lg text-neutral-600 transition-all duration-300 ${
              isNextDisabled
                ? "pointer-events-none cursor-not-allowed"
                : "hover-bg-neutral-100 dark:text-white dark:hover-bg-neutral-700 dark:hover-text-white"
            }`}
            href="#!"
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default PostPagination;
