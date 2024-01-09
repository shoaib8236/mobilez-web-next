"use client";
import StyledButton from "@/app-ui/StyledButton/StyledButton";
import api from "@/services/api";
import { emailRule, requiredRule } from "@/utils/rules";
import { Form, Input, Modal } from "antd";
import React, { useState } from "react";

const Page = () => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      let res = await api.post("/delete-user", values);
      if (res?.data?.status) {
        setLoading(false);
      }
    } catch (error) {}
    setLoading(false);
  };

  const onDelete = () => {
    Modal.confirm({
      content: "Are you sure you want to delete",
      onOk: form.submit()
    });
  };

  return (
    <div className="manage_account">
      <div className="form_container">
        <h1>Manage account</h1>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            className="styled_input"
            rules={requiredRule}
            name={"account_id"}
            label="Account ID"
          >
            <Input />
          </Form.Item>
          <Form.Item
            className="styled_input"
            rules={emailRule}
            name={"email"}
            label="Email"
          >
            <Input />
          </Form.Item>
          <StyledButton onClick={onDelete} loading={loading}>Delete</StyledButton>
        </Form>
      </div>
    </div>
  );
};

export default Page;
