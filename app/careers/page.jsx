"use client";
import PageBanner from "@/app-ui/PageBanner/PageBanner";
import StyledButton from "@/app-ui/StyledButton/StyledButton";
import { emailRule, numberRule, requiredRule } from "@/utils/rules";
import { Col, Form, Input, InputNumber, Row, Select, Upload } from "antd";
import { ImAttachment } from "react-icons/im";
import React from "react";

const Page = () => {
  const onSubmit = (values) => {
   
  };

  return (
    <div className="careers_wrapper">
      <PageBanner title="Careers" />
      <div className="content_wrap">
        <h1 className="text_center page_title">Please Fill The Form</h1>
        <div className="form_wrapper">
          <Form onFinish={onSubmit} layout="vertical">
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
              <Col className="col_space_20" lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  className="styled_input"
                  name="number"
                  rules={numberRule}
                  label="Contact number"
                >
                  <Input placeholder="Enter your phone number" />
                </Form.Item>
              </Col>
              <Col className="col_space_20" lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  className="styled_input"
                  name="city"
                  rules={requiredRule}
                  label="City"
                >
                  <Select className="styled_select">
                    <Select.Option value="karachi">Karachi</Select.Option>
                    <Select.Option value="lahore">Lahore</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col className="col_space_20" span={24}>
                <Form.Item
                  className="styled_input"
                  name="address"
                  rules={numberRule}
                  label="Address"
                >
                  <Input placeholder="Type here" />
                </Form.Item>
              </Col>
              <Col className="col_space_20" span={24}>
                <Form.Item
                  name={"cvc"}
                  rules={requiredRule}
                  label="Upload CV or Resume"
                >
                  <Upload>
                    <StyledButton className="light with_icon p_0">
                      <ImAttachment />
                      Upload your file
                    </StyledButton>
                  </Upload>
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
      </div>
    </div>
  );
};

export default Page;
