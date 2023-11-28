"use client";

import { RamOptions, StorageOptions, WarrantyOptions } from "@/utils/fakeData";
import { Form, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import {
  usePathname,
  useRouter
} from "next/navigation";

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
        <Select placeholder="Select Category" className="styled_select">
          <Select.Option value="mobile">Mobile</Select.Option>
          <Select.Option value="tablet">Tablet</Select.Option>
          <Select.Option value="watch">Watch</Select.Option>
          <Select.Option value="accessories">Accessories</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name="brands" label="Brands">
        <Select placeholder="Select Brand" className="styled_select">
          <Select.Option value="mobile">Mobile</Select.Option>
          <Select.Option value="tablet">Tablet</Select.Option>
          <Select.Option value="watch">Watch</Select.Option>
          <Select.Option value="accessories">Accessories</Select.Option>
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
          <Select.Option value={"approve"}>Karachi</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  );
};

export default ProductFilters;
