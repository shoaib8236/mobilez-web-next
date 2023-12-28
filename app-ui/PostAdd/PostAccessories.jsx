import { Col, Form, Input, Row, Select, Upload } from "antd";
import React, { useState } from "react";
import StyledButton from "../StyledButton/StyledButton";
import {
  ProductCondition,
  PtaStatus,
  RamOptions,
  WarrantyOptions,
  StorageOptions
} from "@/utils/fakeData";
import {
  requiredRule
} from "@/utils/rules";

const PostAccessories = () => {
  const { Option } = Select;
  const [fileList, setFileList] = useState([]);

  return (
    <div className='post'>
    <h2>Accessories</h2>
    <Form layout="vertical">
      <Row gutter={[20, 20]}>
        <Col lg={8} md={8} sm={12} xs={24}>
          <Form.Item name='Brand' rules={requiredRule} label="Product Brand">
            <Select className="styled_select">
              <Option></Option>
            </Select>
          </Form.Item>
        </Col>
        <Col lg={8} md={8} sm={12} xs={24}>
          <Form.Item name='Model' rules={requiredRule} className="styled_input" label="Product Model">
            <Input />
          </Form.Item>
        </Col>
        <Col lg={8} md={8} sm={12} xs={24}>
          <Form.Item rules={requiredRule} className="styled_input" label="Price">
            <Input />
          </Form.Item>
        </Col>
        <Col lg={8} md={8} sm={12} xs={24}>
          <Form.Item rules={requiredRule} label="Product Condition">
            <Select className="styled_select">
              {ProductCondition?.map((item) => (
                <Option value={item?.value}>{item.label}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item rules={requiredRule} label="Upload images">
            <Upload beforeUpload={() => false} listType="picture-card">
              Upload
            </Upload>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item rules={requiredRule}
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

export default PostAccessories;
