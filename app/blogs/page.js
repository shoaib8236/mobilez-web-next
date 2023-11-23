import BlogCard from "@/app-ui/BlogCard/BlogCard";
import PageBanner from "@/app-ui/PageBanner/PageBanner";
import { Col, Row } from "antd";
import React from "react";

const Page = () => {
  return (
    <div className="blogs_wrapper">
      <PageBanner title="Blogs" />
      <div className="content_wrap">
        <Row>
          <Col lg={8} md={8} sm={12} xs={24}>
            <BlogCard />
          </Col>
          <Col lg={8} md={8} sm={12} xs={24}>
            <BlogCard />
          </Col>
          <Col lg={8} md={8} sm={12} xs={24}>
            <BlogCard />
          </Col>
          <Col lg={8} md={8} sm={12} xs={24}>
            <BlogCard />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Page;
