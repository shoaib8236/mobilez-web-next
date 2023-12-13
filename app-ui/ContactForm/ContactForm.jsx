"use client";

import StyledButton from "@/app-ui/StyledButton/StyledButton";
import { emailRule, requiredRule } from "@/utils/rules";
import { Col, Form, Input, Row } from "antd";

const ContactForm = () => {
  return (
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
  );
};

export default ContactForm;
