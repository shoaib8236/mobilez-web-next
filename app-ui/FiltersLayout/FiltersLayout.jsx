"use client";

import { useSearchParams } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import ProductResult from "../ProductResult/ProductResult";
import Link from "next/link";
import { IoHome } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { AiOutlineClose } from "react-icons/ai";
import { MdFilterListOff } from "react-icons/md";
import { RiSeparator } from "react-icons/ri";
import StyledButton from "../StyledButton/StyledButton";
import { CaretRightOutlined } from "@ant-design/icons";
import { Checkbox, Collapse, Form, Radio, Slider, Tag } from "antd";

import api from "@/services/api";
import debounce from "lodash/debounce";
import { ProductCondition, PtaStatus, WarrantyOptions } from "@/utils/fakeData";
import { FaRegGrinBeamSweat } from "react-icons/fa";

const FiltersLayout = () => {
  const [deviceData, setDeviceData] = useState([]);
  const [categoryBrands, setCategoryBrands] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(1);
  const [rams, setRams] = useState([]);
  const [rom, setRom] = useState([]);
  const [cities, setCities] = useState([]);

  const filtersNodeRef = useRef(null);

  // ________________________________________________________

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
  const warranty = searchParams.get("warranty") || "";

  const router = useRouter();
  const [form] = Form.useForm();

  const getBrands = async (cat) => {
    try {
      let res = await api.get(`/product-brands?category=${cat}`);

      if (res?.data?.status) {
        let getBrands = res?.data?.product_brands?.map((item) => {
          return {
            label: item,
            value: item,
          };
        });
        setCategoryBrands(getBrands);
      }
    } catch (error) {}
  };

  const getCities = async (cat) => {
    try {
      let res = await api.get(`/cities`);

      if (res?.data?.status) {
        let getCitiesData = res?.data?.cities?.map((item) => {
          return {
            label: item,
            value: item,
          };
        });
        setCities(getCitiesData);
      }
    } catch (error) {}
  };

  const getDevices = async (data, isNewData, newPage) => {
    try {
      let res = await api.post(`/category?page=${newPage}`, data);

      if (isNewData) {
        setDeviceData(res?.data?.data?.data);
      } else {
        setDeviceData((prev) => [...(prev || []), ...res?.data?.data?.data]);
      }

      setTotalRecords(res?.data?.data?.total);

      let formValues = {
        ...data,
        brand: data?.brand?.[0] || "",
        range: [data?.min_price || 0, data?.max_price || 1000000],
      };

      let getRams = res?.data?.ram?.map((item) => {
        return {
          label: `${item?.ram} GB`,
          value: `${item?.ram} GB`,
        };
      });
      let getRoms = res?.data?.storage?.map((item) => {
        return {
          label: `${item?.storage} GB`,
          value: `${item?.storage} GB`,
        };
      });

      console.log(res?.data);

      setRams(getRams);
      setRom(getRoms);

      form.setFieldsValue(formValues);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
    setIsLoadMore(false);
  };

  const debouncedGetDevices = debounce(getDevices, 300);

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
    ...(warranty &&  { warranty: warranty.split(",") }),
  };

  useEffect(() => {
    getCities();
  }, []);

  useEffect(() => {
    setLoading(true);
    debouncedGetDevices(payload, true, 1);

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
    search,
    sort,
    order,
    warranty
  ]);

  useEffect(() => {
    if (category) {
      getBrands(category);
    }
  }, [category]);

  const onReset = () => {
    setPage(1);
    form.resetFields();
    router.push("/devices");
  };

  const onBrandChange = () => {
    form.setFieldsValue({
      brand: [],
      ram: [],
      storage: [],
    });
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
    let payload = {
      ...getValues,
    };
    setPage(1);
    if (payload?.range?.[1] > 0) {
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

    params.delete("search");
    params.delete("sort");
    params.delete("order");

    Object.entries(payload).forEach(([key, value]) => {
      if (value?.length) {
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
      if (Object.keys(value)[0] === "category") {
        router.push(`/devices?category=${value?.category}`);
      } else {
        form.submit();
      }
    }
  };

  const handleCollapse = () => {
    let filterNode = filtersNodeRef.current;
    if (filterNode?.classList.contains("open")) {
      filterNode.classList.remove("open");
    } else {
      filterNode.classList.add("open");
    }
  };
  const handleCollapseClose = () => {
    let filterNode = filtersNodeRef.current;
    filterNode.classList.remove("open");
  };

  const onPageChange = () => {
    setIsLoadMore(true);
    let newPage = page + 1;
    payload.page = newPage;
    debouncedGetDevices(payload, false, newPage);
    setPage(newPage);
  };

  return (
    <>
      <div className="content_wrap">
        <div className="page_title_wrap">
          <div>
            <StyledButton className="light_primary sm" onClick={handleCollapse}>
              Filters
            </StyledButton>
            <h1 className="page_title">
              {brand
                ? `${brand} ${category === "mobile" ? "mobile" : category}`
                : `category`
                ? category === "mobile"
                  ? "Mobile Devices"
                  : category === "accessories"
                  ? "Mobile Accessories"
                  : category === "tablet"
                  ? "Tablet Devices"
                  : category === "watch"
                  ? "Smart Watches"
                  : "Mobiles"
                : "Mobile Devices"}{" "}
              for sale in {city ? city : "Pakistan"}
            </h1>
          </div>
          <p>
            Showing {deviceData?.length} out of {totalRecords}{" "}
          </p>
        </div>
        <div className="styled_breadcrumb">
          <Link href="/">
            <IoHome />
            Home
          </Link>{" "}
          <span className="separator">/</span>
          {category && (
            <>
              <Link href={`/devices?category=${category || ""}`}>
                {category}
              </Link>
              <span className="separator">/</span>
            </>
          )}{" "}
          {brand && (
            <>
              <Link
                href={`/devices?category=${category || ""}&brand=${
                  brand || ""
                }`}
              >
                {brand}
              </Link>
              <span className="separator">/</span>
            </>
          )}{" "}
          {city && (
            <Link
              href={`/devices?category=${category || ""}&brand=${
                brand || ""
              }&city=${city || ""}`}
            >
              {city}{" "}
            </Link>
          )}
        </div>
      </div>
      <div className="content_fluid">
        <div className="content_wrap">
          <div className="flex_layout">
            <div ref={filtersNodeRef} className="filters">
              <div className="sticky_container">
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
                      defaultActiveKey={["1", "2", "3", "4"]}
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
                      {categoryBrands?.length > 0 && (
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
                      )}
                      <Collapse.Panel key="4" header="City">
                        <Form.Item name="city">
                          <Radio.Group>
                            {cities?.map((item) => (
                              <Radio value={item?.value}>
                                <Tag color="blue">{item?.value}</Tag>
                              </Radio>
                            ))}
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
                      {["accessories", "watch"].includes(category) !== true && (
                        <Collapse.Panel key="5" header="Ram">
                          <Form.Item name="ram">
                            <Checkbox.Group options={rams} />
                          </Form.Item>
                        </Collapse.Panel>
                      )}
                      {["accessories", "watch"].includes(category) !== true && (
                        <Collapse.Panel key="6" header="Storage">
                          <Form.Item name="storage">
                            <Checkbox.Group options={rom} />
                          </Form.Item>
                        </Collapse.Panel>
                      )}
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
                      {["accessories", "watch"].includes(category) !== true && (
                        <Collapse.Panel key="9" header="Pta Status">
                          <Form.Item name="pta_status">
                            <Checkbox.Group options={PtaStatus} />
                          </Form.Item>
                        </Collapse.Panel>
                      )}
                    </Collapse>
                  </div>
                </Form>
              </div>
            </div>

            <div className="flex_cols">
              <div className="product_results">
                <ProductResult
                  setLoading={setLoading}
                  setCategoryBrands={setCategoryBrands}
                  setDeviceData={setDeviceData}
                  isLoadMore={isLoadMore}
                  loading={loading}
                  deviceData={deviceData}
                />
              </div>
              {totalRecords && totalRecords > deviceData?.length ? (
                <>
                  {!loading && (
                    <div className="load_more">
                      <StyledButton
                        loading={isLoadMore}
                        disabled={isLoadMore}
                        onClick={onPageChange}
                      >
                        Load More
                      </StyledButton>
                    </div>
                  )}
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FiltersLayout;
