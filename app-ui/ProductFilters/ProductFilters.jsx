"use client";

import React, { useEffect } from "react";
import { Form, Select } from "antd";
import { RamOptions, StorageOptions, WarrantyOptions } from "@/utils/fakeData";
import api from "@/services/api";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useForm } from "antd/es/form/Form";

const ProductFilters = (props) => {

  const {initialValues} = props

  const router = useRouter();
  const pathname = usePathname();
  const [form] = useForm();

  const onFinish = (values) => {

    const filteredValues = Object.fromEntries(
      Object.entries(values).filter(([key, value]) => value !== undefined)
    );
    const queryString = Object.entries(filteredValues)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
    router.push(`${pathname}?${queryString}`);
  };

  const onValuesChange = () => {
    form.submit();
  };

  return (
    <Form
      initialValues={initialValues}
      form={form}
      onFinish={onFinish}
      onValuesChange={onValuesChange}
      layout="vertical"
    >
      <Form.Item name="category" label="Category">
        <Select className="styled_select">
          <Select.Option value="mobile">Mobile</Select.Option>
          <Select.Option value="tablet">Tablet</Select.Option>
          <Select.Option value="watch">Watch</Select.Option>
          <Select.Option value="accessories">Accessories</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name="brands" label="Brands">
        <Select className="styled_select">
          <Select.Option value="mobile">Mobile</Select.Option>
          <Select.Option value="tablet">Tablet</Select.Option>
          <Select.Option value="watch">Watch</Select.Option>
          <Select.Option value="accessories">Accessories</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name="ram" label="Ram">
        <Select className="styled_select">
          {RamOptions?.map((item, i) => (
            <Select.Option key={i} value={item?.value}>
              {item?.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="storage" label="Rom">
        <Select className="styled_select">
          {StorageOptions?.map((item, i) => (
            <Select.Option key={i} value={item?.value}>
              {item?.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="pta_status" label="PTA Status">
        <Select className="styled_select">
          <Select.Option value={"Approved"}>Approve</Select.Option>
          <Select.Option value={"Not Approved"}>Not Approve</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name="product_status" label="Product Condition ">
        <Select className="styled_select">
          <Select.Option value={"new"}>New</Select.Option>
          <Select.Option value={"used"}>Used</Select.Option>
          <Select.Option value={"refurbish"}>Refurbish</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Warranty">
        <Select className="styled_select">
          {WarrantyOptions.map((item, i) => (
            <Select.Option key={i} value={item?.item}>
              {item?.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="city" label="City">
        <Select className="styled_select">
          <Select.Option value={"approve"}>Karachi</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  );
};

export default ProductFilters;
