"use client";

import StyledButton from "@/app-ui/StyledButton/StyledButton";
import { Col, Form, Input, Upload, Row, notification } from "antd";
import React, { useEffect, useState } from "react";
import { emailRule, numberRule, requiredRule } from "@/utils/rules";
import api from "@/services/api";
import { IoClose } from "react-icons/io5";

const Page = () => {
  const [form] = Form.useForm();
  const [profileImage, setProfileImage] = useState(null);
  const [rawProfile, setRawProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [defaultValues, setDefaultValues] = useState({});

  useEffect(() => {
    let getUser = JSON.parse(localStorage.getItem("@user"));
    setDefaultValues(getUser);
  }, []);

  useEffect(() => {
    if (Object.keys(defaultValues || {})?.length) {
      const { photo, ...data } = defaultValues;
      setProfileImage(photo);
      form.setFieldsValue(data);
    }
  }, [defaultValues]);

  const onUploadProfile = (file) => {
    if (file instanceof Blob || file instanceof File) {
      setRawProfile(file);
      const url = URL.createObjectURL(file);
      setProfileImage(url);

      return false;
    } else {
      console.error("Invalid file object:", file);

      return false;
    }
  };

  const onRemoveProfile = () => {
    setProfileImage(null);
  };

  const updateProfile = async (values) => {
    console.log(values);

    try {
      setLoading(true);
      let payload = { ...values, ...(rawProfile && { photo: rawProfile }) };

      
      let res = await api.post("/update-profile", payload);
      if (res?.data?.status) {
        notification.success({
          message: "Profile updated successfully!",
        });
        localStorage.setItem(
          "@user",
          JSON.stringify({ ...defaultValues, ...payload })
        );
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <div className="profile_setting">
      <div className="form_container">
        <Form
          onFinish={updateProfile}
          className="form"
          form={form}
          layout="vertical"
        >
          <div className="user_detail">
            <h1>Edit Profile</h1>
            <h1>Referral Code : MM-797</h1>
          </div>
          <Row gutter={[20, 20]}>
            <Col className="profile_upload" span={24}>
              {!profileImage && (
                <Form.Item rules={requiredRule} name="photo">
                  <Upload
                    showUploadList={false}
                    beforeUpload={onUploadProfile}
                    listType="picture-circle"
                  >
                    Upload
                  </Upload>
                </Form.Item>
              )}
              {profileImage && (
                <div className="profile_image">
                  <button onClick={onRemoveProfile}>
                    <IoClose />
                  </button>
                  <img src={profileImage} alt="user" />
                </div>
              )}
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item
                rules={requiredRule}
                className="styled_input"
                name={"first_name"}
                label="First Name"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              {" "}
              <Form.Item
                rules={requiredRule}
                className="styled_input"
                name={"last_name"}
                label="Last Name"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item
                rules={emailRule}
                className="styled_input"
                name={"email"}
                label="Email"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              {" "}
              <Form.Item
                rules={requiredRule}
                className="styled_input"
                name={"phone"}
                label="Phone"
              >
                <Input />
              </Form.Item>
            </Col>
            {defaultValues?.user_type === "businees" ? (
              <>
                <Col lg={12} md={12} sm={24} xs={24}>
                  <Form.Item
                    rules={requiredRule}
                    className="styled_input"
                    name={"shop_name"}
                    label="Shop Name"
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col lg={12} md={12} sm={24} xs={24}>
                  <Form.Item
                    rules={requiredRule}
                    className="styled_input"
                    name={"shop_address"}
                    label="Shop Address"
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </>
            ) : null}
          </Row>
          <div className="submit_wrapper">
            <StyledButton loading={loading} type={"submit"}>
              Update
            </StyledButton>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Page;
