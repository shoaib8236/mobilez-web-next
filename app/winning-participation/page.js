"use client";

import StyledButton from "@/app-ui/StyledButton/StyledButton";
import { Col, Form, Row, Input, Upload, notification } from "antd";
import React, { useEffect, useState } from "react";
import api from "@/services/api";
import { IoClose } from "react-icons/io5";
import { requiredRule } from "@/utils/rules";

const Page = () => {
  const [participationForm] = Form.useForm();
  const { Dragger } = Upload;

  const [files, setFiles] = useState({});
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let getUser = JSON.parse(localStorage.getItem("@user"));
    setUser(getUser);
  }, []);

  useEffect(() => {
    participationForm.setFieldsValue(user);
  }, [user]);

  const onUpload = (fileName) => (e) => {
    setFiles((prev) => ({ ...prev, [fileName]: e }));
  };

  const getImage = (file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    return url;
  };

  const onRemoveProfile = (fileName) => () => {
    setFiles((prevFiles) => {
      const newFiles = { ...prevFiles };
      delete newFiles[fileName];
      return newFiles;
    });
  };

  const onSubmit = async (values) => {
    let formData = new FormData();

    let payload = {
      ...values,
      cnic_front_image: files.cnicFront,
      cnic_back_image: files.cnicBack,
      shop_visiting_card: files.shopCard,
    };
    for (const value in payload) {
      formData.append(`${value}`, values[value]);
    }
    try {
      setLoading(true);
      let res = await api.post("/prize-participation", formData);
      if (res?.data?.status === 400) {
        for (const err of Object.values(res?.data?.errors)) {
          notification.error({ message: "Oops", description: err[0] });
        }
      } else {
        notification.success({
          message: "Success",
          description: "Successfully submitted!",
        });
        participationForm.resetFields();
        setFiles({});
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="winning_participation">
      <div className="form_container_wrapper">
        <div className="form_container">
          <Form onFinish={onSubmit} form={participationForm} layout="vertical">
            <Row gutter={[20, 20]}>
              <Col lg={12} md={12} sm={12} xs={24}>
                <Form.Item
                  rules={requiredRule}
                  name={"first_name"}
                  className="styled_input"
                  label="First Name"
                >
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col lg={12} md={12} sm={12} xs={24}>
                <Form.Item
                  name={"last_name"}
                  className="styled_input"
                  label="Last Name"
                >
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col lg={12} md={12} sm={12} xs={24}>
                <Form.Item
                  rules={requiredRule}
                  name={"whatsapp_number"}
                  className="styled_input"
                  label="Whatsapp Number"
                >
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col lg={12} md={12} sm={12} xs={24}>
                <Form.Item
                  name={"nic_number"}
                  className="styled_input"
                  label="CNIC Number"
                >
                  <Input disabled />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[20, 20]}>
              <Col lg={8} md={8}>
                <Form.Item>
                  {!files?.cnicFront ? (
                    <Dragger
                      beforeUpload={onUpload("cnicFront")}
                      name="file"
                      multiple={false}
                      showUploadList={false}
                    >
                      <p>CNIC Front Image</p>
                    </Dragger>
                  ) : (
                    <div className="upload_result">
                      <button onClick={onRemoveProfile("cnicFront")}>
                        <IoClose />
                      </button>
                      <img src={getImage(files?.cnicFront)} />
                    </div>
                  )}
                </Form.Item>
              </Col>
              <Col lg={8} md={8}>
                <Form.Item>
                  {!files?.cnicBack ? (
                    <Dragger
                      beforeUpload={onUpload("cnicBack")}
                      name="file"
                      multiple={false}
                      showUploadList={false}
                    >
                      <p>CNIC Back Image</p>
                    </Dragger>
                  ) : (
                    <div className="upload_result">
                      <button onClick={onRemoveProfile("cnicBack")}>
                        <IoClose />
                      </button>
                      <img src={getImage(files?.cnicFront)} />
                    </div>
                  )}
                </Form.Item>
              </Col>
              <Col lg={8} md={8}>
                <Form.Item>
                  {!files?.shopCard ? (
                    <Dragger
                      beforeUpload={onUpload("shopCard")}
                      name="file"
                      multiple={false}
                      showUploadList={false}
                    >
                      <p>Shop Visiting Card</p>
                    </Dragger>
                  ) : (
                    <div className="upload_result">
                      <button onClick={onRemoveProfile("shopCard")}>
                        <IoClose />
                      </button>
                      <img src={getImage(files?.cnicFront)} />
                    </div>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[20, 20]}>
              <Col lg={12} md={12} sm={12} xs={24}>
                <Form.Item
                  rules={requiredRule}
                  name={"account_title"}
                  className="styled_input"
                  label="Bank Account Title"
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col lg={12} md={12} sm={12} xs={24}>
                <Form.Item
                  rules={requiredRule}
                  name={"shop_name"}
                  className="styled_input"
                  label="Shop Name"
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col lg={12} md={12} sm={12} xs={24}>
                <Form.Item
                  rules={requiredRule}
                  name={"shop_address"}
                  className="styled_input"
                  label="Shop Address"
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <div className="submit_wrapper">
              <StyledButton loading={loading} type="submit">
                Submit
              </StyledButton>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Page;
