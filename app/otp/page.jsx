"use client";
import React, { useEffect, useState } from "react";
import { Row, Form, Col, Input, notification } from "antd";
import { numberRule } from "@/utils/rules";
import StyledButton from "@/app-ui/StyledButton/StyledButton";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import { AiOutlineRedo } from "react-icons/ai";

const Page = () => {
  const router = useRouter();
  const [form] = Form.useForm();


  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");

  const [resendTimer, setResendTimer] = useState(null);
  const [disabledResend, setDisabledResend] = useState(false);
  const [countDown, setCountDown] = useState(0);




  useEffect(() => {
    let timerFromStorage = localStorage.getItem('@resendTimer');
    if (timerFromStorage) {
      setResendTimer(new Date(timerFromStorage));
    }
  }, []);


  useEffect(() => {
    if (resendTimer) {
      setDisabledResend(true)
    }
  }, [resendTimer])

  useEffect(() => {
    if (resendTimer) {
      setDisabledResend(true);
      console.log(resendTimer)
      const currentTime = new Date();
      const elapsedTime = (currentTime - resendTimer) / 1000;

      if (elapsedTime >= 60) {

        localStorage.removeItem('@resendTimer')

      }
    }
  }, [resendTimer]);


  useEffect(() => {
    // Countdown logic
    let intervalId;

    if (resendTimer) {
      intervalId = setInterval(() => {
        const currentTime = new Date();
        const elapsedTime = (currentTime - resendTimer) / 1000;
        const remainingTime = Math.max(0, 60 - elapsedTime);
        setCountDown(Math.floor(remainingTime));

        if (remainingTime === 0) {
          // Enable resend button when countdown reaches zero
          setDisabledResend(false);
          clearInterval(intervalId);
        }
      }, 1000);
    }

    return () => {
      // Cleanup interval on component unmount
      clearInterval(intervalId);
    };
  }, [resendTimer]);




  const resendOtp = async () => {
    try {
      setDisabledResend(true)
      let res = await api.post('/resend-otp', { phone_number: phone })
      if (res?.data?.status) {
        let timer = new Date();
        setResendTimer(timer);
        localStorage.setItem('@resendTimer', timer.toISOString());
        notification.success({ message: 'Success', description: 'Successfully resend otp!' })
      }else {
        setDisabledResend(false)
      }


    } catch (error) {
      notification.error({ message: 'Oops', description: error?.response?.data.message })
      setDisabledResend(false)
    }

  };


  const getUserData = async () => {
    try {
      let res = await api.get("/profile");
      if (res?.data?.status) {
        localStorage.setItem("@user", JSON.stringify(res?.data?.profile));
        setLoading(false);
        router.push("/");
      }
    } catch (error) {
      notification.error({ message: error?.response?.data?.message });
      setLoading(false);
    }
  };

  const onSubmit = async (values) => {

    try {
      setLoading(true);
      let res = await api.post("/mobile-verification", values);
      if (res?.data?.status) {
        getUserData();
      }
    } catch (error) {
      notification.error({ message: error?.response?.data?.message });
      setLoading(false);
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      phone_number: phone,
    });
  }, [phone]);

  useEffect(() => {
    setPhone(localStorage.getItem("@phone"));
  }, [phone]);


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
                <span className="welcome_text">Welcome back!</span> please check
                your Phone to <br /> get the OTP.
              </p>
              <div>
                <Form form={form} onFinish={onSubmit} layout="vertical">
                  {/* <Form.Item
                    layout="vertical"
                    className="styled_input"
                    name="phone_number"
                    rules={numberRule}
                    label="Phone Number"
                  >
                    <Input placeholder="Phone Number" />
                  </Form.Item> */}
                  <Form.Item
                    layout="vertical"
                    className="styled_input"
                    name="otp_code"
                    rules={numberRule}
                    label="Enter OTP"
                  >
                    <Input placeholder="Enter OTP" />
                  </Form.Item>
                  <div className="otp_resend_wrapper">
                    <StyledButton disabled={disabledResend} onClick={resendOtp} className="light">
                       Resend otp {countDown > 0 ? <> in {countDown}</> : null}
                    </StyledButton>
                  </div>
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
