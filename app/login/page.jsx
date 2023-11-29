"use client";
import React, { useEffect, useState } from "react";
import { Row, Form, Col, Input, Checkbox, notification } from "antd";
import { emailRule, passwordRule } from "@/utils/rules";
import StyledButton from "@/app-ui/StyledButton/StyledButton";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import { useAuthCheck } from "@/utils/hooks";

const Page = () => {
  const router = useRouter();
  const {authCheck} = useAuthCheck()
  
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (authCheck) {
      router.back();
    }
  }, [authCheck]);

  const onSubmit = async (values) => {
    try {
      setLoading(true)
      let res = await api.post("/login", values);
      
      if (res?.data?.status) {
        localStorage.setItem("@token", res?.data?.token);
        localStorage.setItem("@user", JSON.stringify(res?.data?.user));
        router.push('/')
      }else {
        alert('asdas')
        setLoading(false)
      }
    } catch (error) {
      notification.error({message:error?.response?.data?.message})
      setLoading(false)
      console.log(error);
    }
  };
  return (
    <div className="login_wrap">
      <div className="content_wrap">
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <img
              width="100%"
              src="https://img.freepik.com/premium-psd/black-smartphone-mockup-design-isolated_34168-2417.jpg?size=626&ext=jpg&uid=R125309426&ga=GA1.1.1401301473.1700047451&semt=sph"
            />
          </Col>
          <Col span={12}>
            <div className="login_form">
              <h2>Login</h2>
              <p>
                <span className="welcome_text">Welcome back!</span> please login
                to your <br /> account.
              </p>
              <div>
                <Form onFinish={onSubmit} layout="vertical">
                  <Form.Item
                    layout="vertical"
                    className="styled_input"
                    name="email"
                    rules={emailRule}
                    label="Email"
                  >
                    <Input placeholder="Email" />
                  </Form.Item>
                  <Form.Item
                    layout="vertical"
                    className="styled_input password_style"
                    name="password"
                    rules={passwordRule}
                    label="Password"
                  >
                    <Input.Password placeholder="Password" />
                  </Form.Item>
                  <Form.Item>
                    <Checkbox>Keep me logged in</Checkbox>
                  </Form.Item>
                  <div>
                    <StyledButton
                      loading={loading}
                      className="primary w_100
                      "
                      type="submit"
                    >
                      Login
                    </StyledButton>
                    <p className="text_center login_or">or</p>
                    <Row gutter={[16, 16]}>
                      <Col lg={12} md={12} sm={24} xs={24}>
                        <div className="social_login">
                          Sign in with Google{" "}
                          <img
                            src="https://www.mobilezmarket.com/public/assets2/img/google.png"
                            alt=""
                          />
                        </div>
                      </Col>
                      <Col lg={12} md={12} sm={24} xs={24}>
                        <div className="social_login">
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
