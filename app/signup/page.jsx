"use client";
import React from "react";
import { Row, Form, Col, Input, Checkbox, Select } from "antd";
import {
  emailRule,
  passwordRule,
  requiredRule,
  numberRule,
} from "@/utils/rules";
import StyledButton from "@/app-ui/StyledButton/StyledButton";

const Page = () => {
  const onSubmit = (values) => {};
  return (
    <div className="signup_wrap">
      <div className="content_wrap">
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <img
              width="100%"
              src="https://img.freepik.com/premium-psd/black-smartphone-mockup-design-isolated_34168-2417.jpg?size=626&ext=jpg&uid=R125309426&ga=GA1.1.1401301473.1700047451&semt=sph"
            />
          </Col>
          <Col span={12}>
            <div className="signup_form">
              <h2>Sign Up</h2>
              <p>
                <span className="welcome_text">Welcome back!</span> please
                signup to your <br /> account.
              </p>
              <div>
                <Form onFinish={onSubmit} layout="vertical">
                  <Row gutter={[8, 8]}>
                    <Col lg={12} md={12} sm={24}>
                      <Form.Item
                        layout="vertical"
                        className="styled_input"
                        name="fname"
                        rules={requiredRule}
                        label="First Name"
                      >
                        <Input placeholder="First Name" />
                      </Form.Item>
                    </Col>
                    <Col lg={12} md={12} sm={24}>
                      <Form.Item
                        layout="vertical"
                        className="styled_input"
                        name="lname"
                        rules={requiredRule}
                        label="Last Name"
                      >
                        <Input placeholder="Last Name" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={[8, 8]}>
                    <Col lg={12} md={12} sm={24}>
                      <Form.Item rules={requiredRule} name="city" label="Select City">
                        <Select
                          placeholder="Select City"
                          className="styled_select"
                        >
                          <Select.Option value="Karachi">Karachi</Select.Option>
                          <Select.Option value="Lahore">Lahore</Select.Option>
                          <Select.Option value="Peshawar">
                            Peshawar
                          </Select.Option>
                          <Select.Option value="Multan">Multan</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col lg={12} md={12} sm={24}>
                      <Form.Item
                        className="styled_input"
                        name="email"
                        rules={emailRule}
                        label="Email"
                      >
                        <Input placeholder="Enter Email" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={[8, 8]}>
                    <Col lg={24} md={24} sm={24}>
                      <Form.Item
                        className="styled_input textarea_style"
                        name="number"
                        rules={numberRule}
                        label="Contact number"
                      >
                        <Input placeholder="Enter Phone Number" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={[8, 8]}>
                    <Col lg={12} md={12} sm={24}>
                      <Form.Item
                        layout="vertical"
                        className="styled_input"
                        name="password"
                        rules={passwordRule}
                        label="Password"
                      >
                        <Input placeholder="Password" />
                      </Form.Item>
                    </Col>
                    <Col lg={12} md={12} sm={24}>
                      <Form.Item
                        layout="vertical"
                        className="styled_input"
                        name="cpassword"
                        rules={passwordRule}
                        label="Confirm Password"
                      >
                        <Input placeholder="Confirm Password" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={[8, 8]}>
                    <Col lg={12} md={12} sm={24}>
                      <Form.Item
                        className="styled_input textarea_style"
                        name="code"
                        rules={numberRule}
                        label="Refferal Code"
                      >
                        <Input placeholder="Refferal Code" />
                      </Form.Item>
                    </Col>
                    <Col lg={12} md={12} sm={24}>
                      <Form.Item rules={requiredRule} name="city" label="Select Account Type">
                        <Select
                          placeholder="Select Account Type"
                          className="styled_select"
                        >
                          <Select.Option value="business">
                            Business
                          </Select.Option>
                          <Select.Option value="individual">
                            Individual
                          </Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item>
                    <Checkbox>Keep me logged in</Checkbox>
                  </Form.Item>

                  <div>
                    <StyledButton
                      className="primary w_100
                      "
                      type="submit"
                    >
                      Sign Up
                    </StyledButton>
                    <p className="text_center signup_or">or</p>
                    <Row gutter={[16, 16]}>
                      <Col lg={12} md={12} sm={24} xs={24}>
                        <div className="social_signup">
                          Sign in with Google{" "}
                          <img
                            src="https://www.mobilezmarket.com/public/assets2/img/google.png"
                            alt=""
                          />
                        </div>
                      </Col>
                      <Col lg={12} md={12} sm={24} xs={24}>
                        <div className="social_signup">
                          Sign in with Facebook{" "}
                          <img
                            src="https://www.mobilezmarket.com/public/assets2/img/facebook.png"
                            alt=""
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Page;
