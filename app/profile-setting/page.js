"use client";

import StyledButton from "@/app-ui/StyledButton/StyledButton";
import { Col, Form, Input, Upload, Row } from "antd";
import React, { useState } from "react";
import { emailRule, numberRule, requiredRule } from "@/utils/rules";

const Page = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  

  return (
    <div className="profile_setting">
      <div className="form_container">
        <Form className="form" form={form} layout="vertical">
          <div className="user_detail">
            <h1>Edit Profile</h1>
            <h1>Referral Code : MM-797</h1>
          </div>
          <Row  gutter={[20, 20]}>
            <Col className='profile_upload' span={24}>
            <Form.Item>
              <Upload
                maxCount={1}
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                listType="picture-circle"
              >
                Upload
              </Upload>
            </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item
                rules={requiredRule}
                className="styled_input"
                name={""}
                label="First Name"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              {" "}
              <Form.Item
                rules={requiredRule}
                className="styled_input"
                name={""}
                label="Last Name"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item
                rules={emailRule}
                className="styled_input"
                name={""}
                label="Email"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              {" "}
              <Form.Item
                rules={numberRule}
                className="styled_input"
                name={""}
                label="Phone"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              {" "}
              <Form.Item
                rules={requiredRule}
                className="styled_input"
                name={""}
                label="Shop Name"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item
                rules={requiredRule}
                className="styled_input"
                name={""}
                label="Shop Address"
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <div className="submit_wrapper">
            <StyledButton>Update</StyledButton>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Page;
