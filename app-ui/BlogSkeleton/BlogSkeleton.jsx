import React from "react";
import Skeleton from "../Skeleton/Skeleton";

const BlogSkeleton = () => {
  return (
    <>
      <Skeleton margin="0 0 30px 0" height="200px" width="100%" />
      <Skeleton margin="0 0 20px 0" height="20px" width="250px" />
      <Skeleton margin="0 0 20px 0" height="20px" width="150px" />
      <Skeleton
        borderRadius="100px"
        margin="0 0 30px 0"
        height="30px"
        width="100px"
      />
    </>
  );
};

export default BlogSkeleton;
