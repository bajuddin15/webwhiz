"use client";
import { createContext, useState, useContext } from "react";
import LoadingBar from "react-top-loading-bar";

const PaginationContext = createContext();

export const usePagination = () => {
  return useContext(PaginationContext);
};

export const PaginationContextProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(5);
  const [progress, setProgress] = useState(0);
  return (
    <PaginationContext.Provider
      value={{
        currentPage,
        pageLimit,
        progress,
        setCurrentPage,
        setPageLimit,
        setProgress,
      }}
    >
      <LoadingBar
        color="teal"
        progress={progress}
        height={5}
        onLoaderFinished={() => setProgress(0)}
      />
      {children}
    </PaginationContext.Provider>
  );
};
