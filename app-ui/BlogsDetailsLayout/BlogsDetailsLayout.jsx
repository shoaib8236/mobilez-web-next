"use client";

import api from "@/services/api";
import { getImage } from "@/utils/helper";
import Image from "next/image";
import { useEffect, useState } from "react";
import Skeleton from "../Skeleton/Skeleton";

const BlogsDetailsLayout = (props) => {
  const { slug } = props;

  const [blogDetails, setBlogDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const getBlogsDetails = async () => {
    try {
      setLoading(true);
      let res = await api.get(`/blogs-description/${slug}`);

      if (res?.data?.status) {
        setBlogDetails(res?.data?.details);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlogsDetails();
  }, []);

  return (
    <>
      <div className="content_wrap">
        <div className="blog_content">
          {loading ? (
            <div>
              <Skeleton height="600px" width="100%" margin="0 0 20px 0" />
              <Skeleton height="30px" width="50%" margin="0 0 20px 0" />
              <Skeleton height="20px" width="100%" margin="0 0 20px 0" />
              <Skeleton height="15px" width="100%" margin="0 0 20px 0" />
              <Skeleton height="15px" width="100%" margin="0 0 20px 0" />
              <Skeleton height="15px" width="80%" margin="0 0 20px 0" />
            </div>
          ) : (
            <>
              <Image
                height={600}
                width={1200}
                layout="responsive"
                loader={({ src, width, quality }) =>
                  getImage(blogDetails?.image)
                }
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
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogsDetailsLayout;
