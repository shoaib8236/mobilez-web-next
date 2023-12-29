'use client'

import StyledButton from "@/app-ui/StyledButton/StyledButton";
import { Col, Form, Row, Input } from "antd";
import React, { useEffect, useState } from "react";
import { api } from "@/services/api";

const Page = () => {
  const [form] = Form.useForm();

  return (
    <div className="winning_participation">
      <div className="form_container">
        <Form>
          <Row>
            <Col lg={12} md={12} sm={12} xs={24}>
              <Form.Item name={""} className="styled_input" label="First Name">
                <Input />
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={12} xs={24}>
              <Form.Item name={""} className="styled_input" label="Last Name">
                <Input />
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={12} xs={24}>
              <Form.Item
                name={""}
                className="styled_input"
                label="Whatsapp Number"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={12} xs={24}>
              <Form.Item name={""} className="styled_input" label="CNIC Number">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col lg={12} md={12} sm={12} xs={24}>
              <Form.Item
                name={""}
                className="styled_input"
                label="Bank Account Title"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={12} xs={24}>
              <Form.Item name={""} className="styled_input" label="Shop Name">
                <Input />
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={12} xs={24}>
              <Form.Item
                name={""}
                className="styled_input"
                label="Shop Address"
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <div className="submit_wrapper">
            <StyledButton>Submit</StyledButton>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Page;
