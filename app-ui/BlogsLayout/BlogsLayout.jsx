"use client";

import BlogCard from "../BlogCard/BlogCard";
import BlogSkeleton from "../BlogSkeleton/BlogSkeleton";
import api from "@/services/api";
import { Col, Row } from "antd";
import { useEffect, useState } from "react";

const BlogsLayout = () => {
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

  return (
    <div className="content_wrap">
      {loading ? (
        <Row gutter={[20, 20]}>
          <Col lg={8} md={8} sm={12} xs={24}>
            <BlogSkeleton />
          </Col>
          <Col lg={8} md={8} sm={12} xs={24}>
            <BlogSkeleton />
          </Col>
          <Col lg={8} md={8} sm={12} xs={24}>
            <BlogSkeleton />
          </Col>
        </Row>
      ) : (
        <Row gutter={[20, 20]}>
          {blogs?.map((item) => (
            <Col key={item?.id} lg={8} md={8} sm={12} xs={24}>
              <BlogCard data={item} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default BlogsLayout;
