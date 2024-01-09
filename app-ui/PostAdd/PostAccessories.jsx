import { Col, Form, Input, Row, Select, Upload, notification } from "antd";
import React, { useEffect, useState } from "react";
import StyledButton from "../StyledButton/StyledButton";
import {
  ProductCondition,
  PtaStatus,
  RamOptions,
  WarrantyOptions,
  StorageOptions,
} from "@/utils/fakeData";
import { requiredRule } from "@/utils/rules";
import api from "@/services/api";

const PostAccessories = () => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const [fileList, setFileList] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryType, setCategoryType] = useState("");
  const [files, setFiles] = useState([]);

  const getAccessoriesCategory = async () => {
    try {
      let res = await api.get("/accessories-category");

      if (res?.data?.status) {
        setAccessories(res?.data?.categories);
      }
    } catch (error) { }
  };

  useEffect(() => {
    getAccessoriesCategory();
  }, []);

  const onSelectCategory = (e) => {
    form.setFieldValue("type", null);
    setCategoryType(e.split(" ").join("_"));
  };

  const handleFileChange = (info) => {
    const { fileList } = info;
    setFileList([...fileList]);
    return true;
  };

  const onPost = async (values) => {
    const { files, ...data } = values;

    let payload = {
      ...data,
      images: files?.fileList,
    };


    try {
      setLoading(true);

      let formData = new FormData();

      for (const [key, value] of Object.entries(payload)) {
        if (Array.isArray(value)) {
          for (const imageObj of value) {
            formData.append(`image[]`, imageObj?.originFileObj);
          }
        } else {
          formData.append(key, value);
        }
      }

      let res = await api.post("/post-accessories", formData);

      if (res?.data?.status) {
        setAccessories(res?.data?.categories);
        form.resetFields();
        notification.success({
          message: "Success",
          description: "Ad posted successfully!",
        });
      }
    } catch (error) {
      notification.error({
        message: "Oops",
        description: "Something went wrong!",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post">
      <h2>Accessories</h2>
      <Form form={form} onFinish={onPost} layout="vertical">
        <Row gutter={[20, 20]}>
          <Col lg={12} md={12} sm={12} xs={24}>
            <Form.Item
              name="accessories_category"
              rules={requiredRule}
              label="Select Category"
            >
              <Select onChange={onSelectCategory} className="styled_select">
                {accessories?.map((item) => (
                  <Option key={item?.id} value={item?.title}>
                    {item?.title}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          {["Charging_Cables", "Chargers"].includes(categoryType) ? (
            <Col lg={12} md={12} sm={12} xs={24}>
              <Form.Item
                name="product_type"
                rules={requiredRule}
                className="styled_input"
                label="Type"
              >
                <Select>
                  <Option value={"IOS"}>IOS</Option>
                  <Option value={"USB Type C"}>USB Type C</Option>
                  <Option value={"Micro-USB/Android"}>Micro-USB/Android</Option>
                  <Option value={"Other"}>Other</Option>
                </Select>
              </Form.Item>
            </Col>
          ) : null}
          {[
            "Screens",
            "Screen_Protectors",
            "Chargers",
            "Covers_&_Cases",
          ].includes(categoryType) ? (
            <Col lg={12} md={12} sm={12} xs={24}>
              <Form.Item
                name="device_type"
                rules={requiredRule}
                className="styled_input"
                label="Device Type"
              >
                <Select>
                  <Option value={"Tablet"}>Tablet</Option>
                  <Option value={"Mobile"}>Mobile</Option>
                  <Option value={"Smart Watch"}>Smart Watch</Option>
                </Select>
              </Form.Item>
            </Col>
          ) : null}
          {["Headphones", "Earphones"].includes(categoryType) ? (
            <Col lg={12} md={12} sm={12} xs={24}>
              <Form.Item
                name="type"
                rules={requiredRule}
                className="styled_input"
                label="Type"
              >
                <Select>
                  <Option value={"Wireless"}>Wireless</Option>
                  <Option value={"Wired"}>Wired</Option>
                </Select>
              </Form.Item>
            </Col>
          ) : null}
          <Col lg={12} md={12} sm={12} xs={24}>
            <Form.Item
              name="title"
              rules={requiredRule}
              className="styled_input"
              label="Accessories Title"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col lg={12} md={12} sm={12} xs={24}>
            <Form.Item
              name="price"
              rules={requiredRule}
              className="styled_input"
              label="Price"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col lg={12} md={12} sm={12} xs={24}>
            <Form.Item
              name="product_condition"
              rules={requiredRule}
              label="Product Condition"
            >
              <Select className="styled_select">
                {ProductCondition?.map((item) => (
                  <Option value={item?.value}>{item.label}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="files" rules={requiredRule} label="Upload images">
              <Upload
                beforeUpload={() => false}
                listType="picture-card"
                fileList={fileList}
                onChange={handleFileChange}
                maxCount={20}
              >
                {fileList.length === 20 ? '' : 'Upload'}
              </Upload>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="description"
              rules={requiredRule}
              className="styled_input textarea_style"
              label="Description"
            >
              <Input.TextArea />
            </Form.Item>
          </Col>
        </Row>
        <div className="submit_wrapper">
          <StyledButton loading={loading} type="submit">
            Save Product
          </StyledButton>
        </div>
      </Form>
    </div>
  );
};

export default PostAccessories;
