"use client";

import {
  ProductCondition,
  PtaStatus,
  RamOptions,
  StorageOptions,
  WarrantyOptions,
} from "@/utils/fakeData";
import { CaretRightOutlined } from "@ant-design/icons";
import { Checkbox, Collapse, Form, Radio, Slider, Tag } from "antd";

import api from "@/services/api";
import debounce from "lodash/debounce";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { MdFilterListOff } from "react-icons/md";
import { RiSeparator } from "react-icons/ri";
import StyledButton from "../StyledButton/StyledButton";

const ProductFilters = (props) => {
  const {
    categoryBrands = [],
    setDeviceData,
    setCategoryBrands,
    setLoading,
    handleCollapseClose,
    loading,
    page = 1,
    isLoadMore = false,
    setIsLoadMore = () => {},
    setPage = () => {},
    setTotalRecords = () => {},
  } = props;

  const searchParams = useSearchParams();

  const category = searchParams.get("category") || "";
  const brand = searchParams.get("brand") || "";
  const ram = searchParams.get("ram") || "";
  const storage = searchParams.get("storage") || "";
  const pta_status = searchParams.get("pta_status") || "";
  const product_status = searchParams.get("product_status") || "";
  const city = searchParams.get("city") || "";
  const min_price = searchParams.get("min_price") || "";
  const max_price = searchParams.get("max_price") || "";
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "";
  const order = searchParams.get("order") || "";

  const router = useRouter();
  const [form] = Form.useForm();

  const [price, setPrice] = useState([]);

  const getDevices = async ({ page, ...data }) => {
    try {
      setLoading(true);
      let res = await api.post(`/category?page=${page}`, data);
      setLoading(false);

      if (isLoadMore) {
        setIsLoadMore(false);
      }

      setDeviceData((prev) => [...(prev || []), ...res?.data?.data?.data]);

      setTotalRecords(res?.data?.data?.total);

      let getBrands = res?.data?.brands?.map((item) => {
        return {
          label: item?.brand,
          value: item?.brand,
        };
      });

      setCategoryBrands(getBrands);

      let formValues = {
        ...data,
        brand: data?.brand?.[0] || "",
        range: [data?.min_price || 0, data?.max_price || 1000000],
      };

      setPrice(formValues?.range);

      form.setFieldsValue(formValues);
    } catch (error) {
      console.log(error);
    }
  };

  const debouncedGetDevices = debounce(getDevices, 300);

  useEffect(() => {
    let payload = {
      ...(category && { category }),
      ...(brand && { brand: brand.split(",") }),
      ...(ram && { ram: ram.split(",") }),
      ...(storage && { storage: storage.split(",") }),
      ...(pta_status && { pta_status: pta_status.split(",") }),
      ...(product_status && { product_status: product_status.split(",") }),
      ...(city && { city }),
      ...(min_price && { min_price }),
      ...(max_price && { max_price }),
      ...(search && { search }),
      ...(sort && { sort }),
      ...(order && { order }),
      page,
    };

    if(payload?.search){
      setLoading(true)
      setDeviceData([])
    }

    debouncedGetDevices(payload);

    return () => debouncedGetDevices.cancel();
  }, [
    category,
    brand,
    ram,
    storage,
    pta_status,
    product_status,
    city,
    min_price,
    max_price,
    page,
    search,
    sort,
    order
  ]);

  const onReset = () => {
    form.resetFields();
    router.push("/devices");
  };

  const onBrandChange = () => {
    setLoading(true);
    form.setFieldValue("brand", []);
  };

  const removeUndefinedValues = (obj) => {
    const result = {};
    for (const key in obj) {
      if (obj[key] !== undefined) {
        result[key] = obj[key];
      }
    }
    return result;
  };

  const onFinish = (values) => {
    let getValues = removeUndefinedValues(values);
    setLoading(true);
    setDeviceData([]);
    setPage(1);

    let payload = {
      ...getValues,
    };

    if (payload?.range[1] > 0) {
      payload = {
        ...payload,
        ...(getValues?.brand?.length > 0 ? { brand: [getValues?.brand] } : {}),
        ...(getValues?.range
          ? { min_price: getValues?.range[0], max_price: getValues?.range[1] }
          : {}),
      };
    }

    delete payload.range;

    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);

    // Remove the "search" parameter
    params.delete("search");

    Object.entries(payload).forEach(([key, value]) => {
      if (value !== undefined || value !== "0" || value !== 0) {
        params.set(key, value);
      }
    });

    url.search = params.toString();
    router.push(url.pathname + url.search);
    handleCollapseClose();
  };

  let timer;
  const onValuesChange = (value) => {
    if (Object.keys(value)[0] === "range") {
      clearTimeout(timer);

      timer = setTimeout(() => {
        form.submit();
      }, 1000);
    } else {
      form.submit();
    }
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      onValuesChange={onValuesChange}
      layout="vertical"
    >
      <div className="filters_header">
        <h3>Filters</h3>{" "}
        <div>
          <StyledButton
            onClick={onReset}
            className="with_icon_right light_primary sm"
          >
            Clear All Filter <MdFilterListOff />
          </StyledButton>
          <StyledButton
            onClick={handleCollapseClose}
            className="icon_style filters_action light_primary sm"
          >
            <AiOutlineClose />
          </StyledButton>
        </div>
      </div>
      <div className="form_item_wrap">
        <Collapse
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          ghost
          bordered={false}
          expandIconPosition="end"
          defaultActiveKey={["1", "2", "3", "4", "5", "6", "7", "8"]}
        >
          <Collapse.Panel key="1" header="Category">
            <Form.Item name="category">
              <Radio.Group onChange={onBrandChange}>
                <Radio value={"mobile"}>
                  <Tag color="blue">Mobile</Tag>
                </Radio>
                <Radio value={"tablet"}>
                  <Tag color="blue">Tablet</Tag>
                </Radio>
                <Radio value={"watch"}>
                  <Tag color="blue">Smart Watches</Tag>
                </Radio>
                <Radio value={"accessories"}>
                  <Tag color="blue">Accessories</Tag>
                </Radio>
              </Radio.Group>
            </Form.Item>
          </Collapse.Panel>
          <Collapse.Panel key="2" header="Brands">
            <Form.Item name="brand">
              <Radio.Group>
                {categoryBrands?.map((item) => (
                  <Radio value={item?.label}>
                    <Tag color="blue">{item?.label}</Tag>
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          </Collapse.Panel>
          <Collapse.Panel key="4" header="City">
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
          <Collapse.Panel key="3" header="Price Range">
            <Form.Item name={"range"}>
              <Slider
                defaultValue={[1000, 500000]}
                min={0}
                max={1000000}
                range
              />
            </Form.Item>
            {max_price > 0 ? (
              <div className="price_range">
                <span>{min_price || 0}</span>{" "}
                <span>
                  <RiSeparator />
                </span>
                <span>{max_price || 0}</span>
              </div>
            ) : null}
          </Collapse.Panel>
          <Collapse.Panel key="5" header="Ram">
            <Form.Item name="ram">
              <Checkbox.Group options={RamOptions} />
            </Form.Item>
          </Collapse.Panel>
          <Collapse.Panel key="6" header="Storage">
            <Form.Item name="storage">
              <Checkbox.Group options={StorageOptions} />
            </Form.Item>
          </Collapse.Panel>
          <Collapse.Panel key="7" header="Product Condition">
            <Form.Item name="product_status">
              <Checkbox.Group options={ProductCondition} />
            </Form.Item>
          </Collapse.Panel>
          <Collapse.Panel key="8" header="Warranty">
            <Form.Item name="warranty">
              <Checkbox.Group options={WarrantyOptions} />
            </Form.Item>
          </Collapse.Panel>
          <Collapse.Panel key="9" header="Pta Status">
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
