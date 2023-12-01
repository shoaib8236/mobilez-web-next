"use client";

import PageBanner from "@/app-ui/PageBanner/PageBanner";
import api from "@/services/api";
import { getImage } from "@/utils/helper";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Page = ({ params: { slug } }) => {
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
      <PageBanner title="Blog Detail" currentPage="Blog Detail" />
      <div className="blogs_details_wrap">
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
      </div>
    </>
  );
};

export default Page;
