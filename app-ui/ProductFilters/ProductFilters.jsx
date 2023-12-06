"use client";

import { RamOptions, StorageOptions, WarrantyOptions } from "@/utils/fakeData";
import { Checkbox, Form, Input, Select } from "antd";

import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const ProductFilters = (props) => {
  const { initialValues, categoryBrands } = props;


  const params = useParams();

  const searchParams = useSearchParams();

  const category = searchParams.get("category") || "";
  const brand = searchParams.get("brand") || "";
  const ram = searchParams.get("ram") || "";
  const storage = searchParams.get("storage") || "";
  const pta_status = searchParams.get("pta_status") || "";
  const product_status = searchParams.get("product_status") || "";
  const city = searchParams.get("city") || "";

  const router = useRouter();
  const pathname = usePathname();
  const [form] = Form.useForm();


  useEffect(() => {
    form.setFieldsValue({
      ...(category && { category }),
      ...(brand && { brands: brand.split(",") }),
      ...(ram && { ram }),
      ...(storage && { storage }),
      ...(pta_status && { pta_status }),
      ...(product_status && { product_status }),
      ...(city && { city }),
    });
  }, [category, brand, ram, storage, pta_status, product_status, city]);

  const onReset = () => {
    form.resetFields()
    router.push('/devices')
  };

  const onBrandChange = () => {
    form.setFieldValue("brand", []);
  };

  const onFinish = (values) => {
    console.log(values)
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);
    Object.entries(values).forEach(([key, value]) => {
      if (value !== undefined) {
        params.set(key, value);
      }
    });

    console.log(url?.search)

    url.search = params.toString();
    router.push(url.pathname + url.search);
  };

  const onValuesChange = () => {
    form.submit();
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      onValuesChange={onValuesChange}
      layout="vertical"
    >
      <button type='button' onClick={onReset}>Reset Fields</button>
      <Form.Item name="category" label="Category">
        <Select         
          onChange={onBrandChange}
          placeholder="Select Category"
          className="styled_select"
        >
          <Select.Option value="mobile">Mobile</Select.Option>
          <Select.Option value="tablet">Tablet</Select.Option>
          <Select.Option value="watch">Watch</Select.Option>
          <Select.Option value="accessories">Accessories</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name="brand" label="Brands">
        <Select placeholder="Select Brand" className="styled_select">
          {categoryBrands?.map((item, i) => (
            <Select.Option key={i} value={item?.title}>
              {item?.title}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="ram" label="Ram">
        <Select placeholder="Select Ram" className="styled_select">
          {RamOptions?.map((item, i) => (
            <Select.Option key={i} value={item?.value}>
              {item?.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="storage" label="Storage">
        <Select placeholder="Select Storage" className="styled_select">
          {StorageOptions?.map((item, i) => (
            <Select.Option key={i} value={item?.value}>
              {item?.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="pta_status" label="PTA Status">
        <Select placeholder="Select PTA Status" className="styled_select">
          <Select.Option value={"Approved"}>Approve</Select.Option>
          <Select.Option value={"Not Approved"}>Not Approve</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name="product_status" label="Product Condition ">
        <Select placeholder="Select Condition" className="styled_select">
          <Select.Option value={"new"}>New</Select.Option>
          <Select.Option value={"used"}>Used</Select.Option>
          <Select.Option value={"refurbish"}>Refurbish</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Warranty">
        <Select placeholder="Select Warranty" className="styled_select">
          {WarrantyOptions.map((item, i) => (
            <Select.Option key={i} value={item?.item}>
              {item?.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="city" label="City">
        <Select placeholder="Select City" className="styled_select">
          <Select.Option value={"karachi"}>Karachi</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  );
};

export default React.memo(ProductFilters);
