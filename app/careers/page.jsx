"use client";
import PageBanner from "@/app-ui/PageBanner/PageBanner";
import StyledButton from "@/app-ui/StyledButton/StyledButton";
import { emailRule, requiredRule } from "@/utils/rules";
import { Col, Form, Input, Row } from "antd";
import React from "react";

const Page = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className="careers_wrapper">
      <PageBanner title="Careers" />
      <div className="content_wrap">
        <h1 className="text_center">Please Fill The Form</h1>
        <div className="form_wrapper">
          <Form onFinish={onSubmit} layout="vertical">
            <Row>
              <Col lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="fullName"
                  rules={requiredRule}
                  label="Full Name"
                >
                  <Input placeholder="Full name" />
                </Form.Item>
              </Col>
              <Col lg={12} md={12} sm={24} xs={24}>
                <Form.Item name="email" rules={emailRule} label="Email">
                  <Input placeholder="Enter your Email" />
                </Form.Item>
              </Col>
            </Row>
            <StyledButton className="primary" type="submit">
              Submit
            </StyledButton>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Page;
