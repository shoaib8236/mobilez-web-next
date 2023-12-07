"use client";

import {
  ProductCondition,
  PtaStatus,
  RamOptions,
  StorageOptions,
  WarrantyOptions,
} from "@/utils/fakeData";
import { Checkbox, Collapse, Form, Input, Radio, Select, Tag } from "antd";

import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
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

  console.log(ram);

  useEffect(() => {
    form.setFieldsValue({
      ...(category && { category }),
      ...(brand && { brands: brand.split(",") }),
      ...(ram && { ram: ram.split(",") }),
      ...(storage && { storage }),
      ...(pta_status && { pta_status }),
      ...(product_status && { product_status }),
      ...(city && { city }),
    });
  }, [category, brand, ram, storage, pta_status, product_status, city]);

  const onReset = () => {
    form.resetFields();
    router.push("/devices");
  };

  const onBrandChange = () => {
    form.setFieldValue("brand", []);
  };

  const onFinish = (values) => {
    console.log(values);
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);
    Object.entries(values).forEach(([key, value]) => {
      if (value !== undefined) {
        params.set(key, value);
      }
    });

    console.log(url?.search);

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
      <div className="filters_header">
        <h3>Filters</h3>
      </div>
      <div className="form_item_wrap">
        <Collapse
          expandIconPosition="right"
          defaultActiveKey={["1", "2", "3", "4", "5", "6", "7", "8"]}
        >
          <Collapse.Panel key="1" header="Category">
            {/* <Form.Item name="category">
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
            </Form.Item> */}

            <Form.Item name="category">
              <Radio.Group>
                <Radio value={"mobile"}>
                  <Tag color="blue">Mobile</Tag>
                </Radio>
                <Radio value={"tablet"}>
                  <Tag color="blue">Tablet</Tag>
                </Radio>
                <Radio value={"watch"}>
                  <Tag color="blue">Watches</Tag>
                </Radio>
                <Radio value={"accessories"}>
                  <Tag color="blue">Accessories</Tag>
                </Radio>
              </Radio.Group>
            </Form.Item>
          </Collapse.Panel>
          <Collapse.Panel key="2" header="Brands">
            <Form.Item name="brand">
              <Select placeholder="Select Brand" className="styled_select">
                {categoryBrands?.map((item, i) => (
                  <Select.Option key={i} value={item?.title}>
                    {item?.title}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Collapse.Panel>
          <Collapse.Panel key="3" header="City">
            <Form.Item name="city">
              <Radio.Group>
                <Radio value={"karachi"}>
                  <Tag color="blue">Karachi</Tag>
                </Radio>
                <Radio value={"lahore"}>
                  <Tag color="blue">Lahore</Tag>
                </Radio>
                <Radio value={"islamabad"}>
                  <Tag color="blue">Islamabad</Tag>
                </Radio>
                
              </Radio.Group>
            </Form.Item>
          </Collapse.Panel>
          <Collapse.Panel key="4" header="Ram">
            <Form.Item name="ram">
              <Checkbox.Group options={RamOptions} />
            </Form.Item>
          </Collapse.Panel>
          <Collapse.Panel key="5" header="Storage">
            <Form.Item name="storage">
              <Checkbox.Group options={StorageOptions} />
            </Form.Item>
          </Collapse.Panel>
          <Collapse.Panel key="6" header="Product Condition">
            <Form.Item name="product_status">
              <Checkbox.Group options={ProductCondition} />
            </Form.Item>
          </Collapse.Panel>
          <Collapse.Panel key="7" header="Warranty">
            <Form.Item name="warranty">
              <Checkbox.Group options={WarrantyOptions} />
            </Form.Item>
          </Collapse.Panel>
          <Collapse.Panel key="8" header="Pta Status">
            <Form.Item name="pta_status">
              <Checkbox.Group options={PtaStatus} />
            </Form.Item>
          </Collapse.Panel>
        </Collapse>
      </div>
    </Form>
  );
};

export default React.memo(ProductFilters);
