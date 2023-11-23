"use client";

import PageBanner from "@/app-ui/PageBanner/PageBanner";
import { emailRule, requiredRule, numberRule } from "@/utils/rules";
import { Form, Input, Row, Col } from "antd";
import React from "react";
import StyledButton from "@/app-ui/StyledButton/StyledButton";
import { GrLocation } from "react-icons/gr";
import { GoMail } from "react-icons/go";

const Page = () => {
  return (
    <div className="contact_wrap">
      <PageBanner title="Contact" />
      <div className="contact_form_wrap">
        <div className="content_wrap">
          <div className="form_wrap">
            <div className="form_cols">
              <Form layout="vertical">
                <Row gutter={15}>
                  <Col className="col_space_20" lg={12} md={12} sm={24} xs={24}>
                    <Form.Item
                      className="styled_input"
                      name="fullName"
                      rules={requiredRule}
                      label="Full Name"
                    >
                      <Input placeholder="Full name" />
                    </Form.Item>
                  </Col>
                  <Col className="col_space_20" lg={12} md={12} sm={24} xs={24}>
                    <Form.Item
                      className="styled_input"
                      name="email"
                      rules={emailRule}
                      label="Email"
                    >
                      <Input placeholder="Enter your email" />
                    </Form.Item>
                  </Col>
                  <Col className="col_space_20" lg={24} md={12} sm={24} xs={24}>
                    <Form.Item
                      className="styled_input textarea_style"
                      name="number"
                      rules={requiredRule}
                      label="Contact number"
                    >
                      <Input.TextArea placeholder="Enter your phone number" />
                    </Form.Item>
                  </Col>
                </Row>
                <div className="submit_wrapper">
                  <StyledButton className="primary with_icon" type="submit">
                    Submit
                  </StyledButton>
                </div>
              </Form>
            </div>
            <div className="form_cols for_details">
              <div className="content">
                <h3>Address</h3>
                <p>
                  Your email address will not be published. Required fields are
                  marked *
                </p>
                <ul>
                  <li>
                    <GrLocation /> DHA Karahi, Pakistan
                  </li>
                  <li>
                    <GoMail />
                    <div>
                      <a href="">info@mobilezmarket.com</a>
                      <a href="">support@mobilezmarket.com</a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="signup_banner">
          <div className="content_wrap">
            <div>
              <h1 className="text_light text_center">
                Sign up for the latest updates
              </h1>
            </div>
            <div>
              <div className="styled_input">
                <Input placeholder="Enter your email" />{" "}
                <StyledButton className="light w_max_content">
                  Subscribe
                </StyledButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
