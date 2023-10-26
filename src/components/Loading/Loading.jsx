import React from "react";
import { FadeLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="w-full h-96 flex items-center justify-center">
      {/* <PacmanLoader color="#36d7b7" margin={1} size={25} /> */}
      <FadeLoader color="#36d7b7" height={15} />
    </div>
  );
};

export default Loading;
