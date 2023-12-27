'use client'
import StyledButton from "@/app-ui/StyledButton/StyledButton";
import { emailRule, requiredRule } from "@/utils/rules";
import { Form, Input } from "antd";
import React from "react";

const Page = () => {
  return (
    <div className="manage_account">
      <div className="form_container">
        <h1>Manage account</h1>
        <Form layout="vertical">
          <Form.Item
            className="styled_input"
            rules={requiredRule}
            name={""}
            label="Account ID"
          >
            <Input />
          </Form.Item>
          <Form.Item
            className="styled_input"
            rules={emailRule}
            name={""}
            label="Email"
          >
            <Input />
          </Form.Item>
          <StyledButton>Delete</StyledButton>
        </Form>
      </div>
    </div>
  );
};

export default Page;
