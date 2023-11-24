"use client";

import React, { useEffect, useState } from "react";
import BlogCard from "@/app-ui/BlogCard/BlogCard";
import PageBanner from "@/app-ui/PageBanner/PageBanner";
import api from "@/services/api";
import { Col, Row } from "antd";
import { useRouter, withRouter } from "next/navigation";

const Page = () => {
  
  const router = useRouter()
 
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const getBlogs = async () => {
    let res = await api.get("/blogs");
    setLoading(false);
    setBlogs(res?.data?.blogs);
  };

  useEffect(() => {
    getBlogs();
  }, []);


  const onPushToDetails = (slug)=> ()=> {
    router.push(
      {
        pathname:`blogs/${slug}`,
        query: {data:{name:'shoaib'}}
      }
    )
  }

  return (
    <div className="blogs_wrapper">
      <PageBanner title="Blogs" />
      <div className="content_wrap">
        {loading ? (
          <>loading</>
        ) : (
          <Row gutter={[20, 20]}>
            {blogs?.map((item) => (
              <Col key={item?.id} lg={8} md={8} sm={12} xs={24}>
                <BlogCard onClick={onPushToDetails(item?.slug)} data={item} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
};

export default withRouter(Page);
