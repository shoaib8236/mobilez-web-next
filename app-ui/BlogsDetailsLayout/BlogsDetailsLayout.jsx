"use client";


import api from "@/services/api";
import { getImage } from "@/utils/helper";
import Image from "next/image";
import { useEffect, useState } from "react";

const BlogsDetailsLayout = (props) => {

    const {slug} = props;

  const [blogDetails, setBlogDetails] = useState(null);

  const getBlogsDetails = async () => {
    try {
      let res = await api.get(`/blogs-description/${slug}`);

      if (res?.data?.status) {
        setBlogDetails(res?.data?.details);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getBlogsDetails();
  }, []);

  return (
    <>
      <div className="content_wrap">
        <div className="blog_content">
          <Image
            height={660}
            width={1200}
            layout="responsive"
            loading="lazy"
            loader={({ src, width, quality }) => getImage(blogDetails?.image)}
            src={getImage(blogDetails?.image)}
            alt="banner"
          />
          <div>
            <h2 className="text_primary">{blogDetails?.title}</h2>
            <p
              className="desc"
              dangerouslySetInnerHTML={{ __html: blogDetails?.description }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogsDetailsLayout;
