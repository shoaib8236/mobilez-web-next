"use client";
import React, { useEffect, useState } from "react";
import { Row, Form, Col, Input, Checkbox, Select, notification } from "antd";
import {
  emailRule,
  passwordRule,
  requiredRule,
  numberRule,
} from "@/utils/rules";
import StyledButton from "@/app-ui/StyledButton/StyledButton";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import { useAuthCheck } from "@/utils/hooks";

const Page = () => {
  const router = useRouter();
  const { authCheck } = useAuthCheck();

  const [loading, setLoading] = useState(false);
  const [accountType, setAccountType] = useState(false);

  useEffect(() => {
    if (authCheck) {
      router.back();
    }
  }, [authCheck]);

  const onSubmit = async (values) => {
    console.log(values);

    if (values?.password !== values?.conf_password) {
      notification.error({ message: "Password does not match!" });
      return;
    }
    try {
      setLoading(true);
      const res = await api.post("/register-user", { ...values, terms: true });
      if (res?.data?.status === 400) {
        notification.error({ message: res?.data?.errors?.email?.[0] });
        setLoading(false);
      }

      if (res?.data?.status === 200) {
        notification.success({ message: res?.data?.message });
        localStorage.setItem("@phone", values?.phone);
        localStorage.setItem("@token", res?.data?.token);
        setLoading(false);
        router.push("/otp");
      } else if (res?.data?.status === 419) {
        notification.error({ message: res?.data?.message });
        setLoading(false);
      }
    } catch (error) {
      notification.error({ message: error?.response?.data?.message });
      setLoading(false);
    }
  };

  const onChangeAccountType = (e) => {
    setAccountType(e === "business");
  };

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
                        name="first_name"
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
                        name="last_name"
                        rules={requiredRule}
                        label="Last Name"
                      >
                        <Input placeholder="Last Name" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={[8, 8]}>
                    <Col lg={12} md={12} sm={24}>
                      <Form.Item
                        rules={requiredRule}
                        name="city"
                        label="Select City"
                      >
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
                        className="styled_input"
                        name="phone"
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
                        name="conf_password"
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
                        className="styled_input"
                        name="code"
                        label="Referral Code"
                      >
                        <Input placeholder="Referral Code" />
                      </Form.Item>
                    </Col>
                    <Col lg={12} md={12} sm={24}>
                      <Form.Item
                        rules={requiredRule}
                        name="acc_type"
                        label="Select Account Type"
                      >
                        <Select
                          onChange={onChangeAccountType}
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
                  {accountType ? (
                    <Row gutter={[8, 8]}>
                      <Col lg={12} md={12} sm={24}>
                        <Form.Item
                        rules={requiredRule}
                          className="styled_input"
                          name="shop_name"
                          label="Shop Name"
                        >
                          <Input placeholder="Shop Name" />
                        </Form.Item>
                      </Col>
                      <Col lg={12} md={12} sm={24}>
                        <Form.Item
                          rules={requiredRule}
                          name="shop_address"
                          label="Shop Address"
                          className="styled_input"
                        >
                          <Input placeholder="Shop Address" />
                        
                        </Form.Item>
                      </Col>
                    </Row>
                  ) : null}

                  <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                      {
                        validator: (_, value) =>
                          value
                            ? Promise.resolve()
                            : Promise.reject(
                                new Error("Should accept agreement")
                              ),
                      },
                    ]}
                  >
                    <Checkbox>
                      I have read the <a href="">agreement</a>
                    </Checkbox>
                  </Form.Item>

                  <div>
                    <div className="submit_wrapper">
                      <StyledButton
                        loading={loading}
                        className="primary w_100
                      "
                        type="submit"
                      >
                        Sign Up
                      </StyledButton>
                    </div>
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
