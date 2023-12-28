import { Col, Form, Input, Row, Select, Upload } from "antd";
import React, { useState } from "react";
import StyledButton from "../StyledButton/StyledButton";
import {
  ProductCondition,
  PtaStatus,
  RamOptions,
  WarrantyOptions,
  StorageOptions,
} from "@/utils/fakeData";

const PostMobile = (props) => {
  const { brands } = props;

  const { Option } = Select;
  const [fileList, setFileList] = useState([]);

  const getBrands = brands.filter((item) => item.category === "Mobile");

  return (
    <div className="post">
      <h2>Mobile</h2>
      <Form layout="vertical">
        <Row gutter={[20, 20]}>
          <Col lg={8} md={8} sm={12} xs={24}>
            <Form.Item label="Product Brand">
              <Select className="styled_select">
                {getBrands?.map((item, i) => (
                  <Option key={i} value={item?.title}>
                    {item.title}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col lg={8} md={8} sm={12} xs={24}>
            <Form.Item className="styled_input" label="Product Model">
              <Input />
            </Form.Item>
          </Col>
          <Col lg={8} md={8} sm={12} xs={24}>
            <Form.Item className="styled_input" label="Price">
              <Input />
            </Form.Item>
          </Col>
          <Col lg={8} md={8} sm={12} xs={24}>
            <Form.Item label="Ram">
              <Select className="styled_select">
                {RamOptions?.map((item, i) => (
                  <Option key={i} value={item?.value}>{item.label}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col lg={8} md={8} sm={12} xs={24}>
            <Form.Item label="Storage">
              <Select className="styled_select">
                {StorageOptions?.map((item, i) => (
                  <Option key={i} value={item?.value}>{item.label}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col lg={8} md={8} sm={12} xs={24}>
            <Form.Item label="PTA Status">
              <Select className="styled_select">
                {PtaStatus?.map((item, i) => (
                  <Option key={i} value={item?.value}>{item.label}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col lg={8} md={8} sm={12} xs={24}>
            <Form.Item label="Product Condition">
              <Select className="styled_select">
                {ProductCondition?.map((item, i) => (
                  <Option key={i} value={item?.value}>{item.label}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col lg={8} md={8} sm={12} xs={24}>
            <Form.Item label="Warranty">
              <Select className="styled_select">
                {WarrantyOptions?.map((item, i) => (
                  <Option key={i} value={item?.value}>{item.label}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="">
              <Upload beforeUpload={() => false} listType="picture-card">
                Upload
              </Upload>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              className="styled_input textarea_style"
              label="Description"
            >
              <Input.TextArea />
            </Form.Item>
          </Col>
        </Row>
        <div className="submit_wrapper">
          <StyledButton>Save Product</StyledButton>
        </div>
      </Form>
    </div>
  );
};

export default PostMobile;
