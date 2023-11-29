"use client";
import React, {useState} from "react";
import { Row, Form, Col, Input } from "antd";
import { numberRule } from "@/utils/rules";
import StyledButton from "@/app-ui/StyledButton/StyledButton";

const Page = () => {

    const [loading, setLoading] = useState(false)

    const onSubmit = (values) =>{
        console.log(values);
    }
 
  return (
    <div className="login_wrap">
      <div className="content_wrap">
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <img
              width="100%"
              src="https://img.freepik.com/free-photo/3d-mobile-phone-with-security-code-padlock_107791-16180.jpg?size=626&ext=jpg&uid=R125309426&ga=GA1.1.1401301473.1700047451&semt=sph"
            />
          </Col>
          <Col span={12}>
            <div className="login_form">
              <h2>Phone Verification</h2>
              <p>
                <span className="welcome_text">Welcome back!</span> please check your Phone to <br /> get the OTP.
              </p>
              <div>
                <Form onFinish={onSubmit} layout="vertical">
                  <Form.Item
                    layout="vertical"
                    className="styled_input"
                    name="phone"
                    rules={numberRule}
                    label="Phone Number"
                  >
                    <Input placeholder="Phone Number" />
                  </Form.Item>
                  <Form.Item
                    layout="vertical"
                    className="styled_input"
                    name="otp"
                    rules={numberRule}
                    label="Enter OTP"
                  >
                    <Input placeholder="Enter OTP" />
                  </Form.Item>
                  <div>
                    <StyledButton
                      loading={loading}
                      className="primary w_100
                      "
                      type="submit"
                    >
                      Submit
                    </StyledButton>
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
