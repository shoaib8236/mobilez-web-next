"use client";

import StyledButton from "@/app-ui/StyledButton/StyledButton";
import api from "@/services/api";
import { emailRule, requiredRule } from "@/utils/rules";
import { Col, Form, Input, Row, notification } from "antd";
import { useState } from "react";

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm()

  const onFinish = async (values) => {

   

    try {
      setLoading(true);
      let res = await api.post("/contact", values);

      if (res?.data?.status) {
        notification.success({message:"Successfully submitted!"})
        setLoading(false);
        form.resetFields()
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Row gutter={15}>
        <Col className="col_space_20" lg={12} md={12} sm={24} xs={24}>
          <Form.Item
            className="styled_input"
            name="name"
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
            name="message"
            rules={requiredRule}
            label="Your Message"
          >
            <Input.TextArea placeholder="Enter your phone number" />
          </Form.Item>
        </Col>
      </Row>
      <div className="submit_wrapper">
        <StyledButton loading={loading} type="submit" className="primary with_icon">
          Submit
        </StyledButton>
      </div>
    </Form>
  );
};

export default ContactForm;
