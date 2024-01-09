'use client'

import React, { useEffect, useState, useRef } from "react";
import ShopProfile from "../ShopProfile/ShopProfile";
import { Checkbox, Col, Collapse, Form, Radio, Row, Tag, Slider } from "antd";
import BlogSkeleton from "../BlogSkeleton/BlogSkeleton";
import ProductCard from "../ProductCard/ProductCard";
import { useRouter, useSearchParams } from "next/navigation";
import debounce from "lodash/debounce";
import Image from "next/image";
import api from "@/services/api";
import StyledButton from "../StyledButton/StyledButton";
import Link from "next/link";
import { IoHome } from "react-icons/io5";
import { MdFilterListOff } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { ProductCondition, PtaStatus, WarrantyOptions } from "@/utils/fakeData";
import { CaretRightOutlined } from "@ant-design/icons";

const ProfileLayout = (props) => {
  const { slug } = props;

  const [deviceData, setDeviceData] = useState([]);
  const [profile, setProfile] = useState(null)
  const [categoryBrands, setCategoryBrands] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [page, setPage] = useState(1);
  const [rams, setRams] = useState([]);
  const [rom, setRom] = useState([]);
  const [total, setTotal] = useState(1);

  const [cities, setCities] = useState([]);


  const filtersNodeRef = useRef(null);

  const router = useRouter();
  const [form] = Form.useForm();

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
    } catch (error) { }
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
    } catch (error) { }
  };

  const getDevices = async (data, isNewData, newPage) => {
    try {
      let res = await api.post(`/user-filter/${slug[0]}`, data);

      if (isNewData) {
        setDeviceData(res?.data?.data?.data);
      } else {
        setDeviceData((prev) => [...(prev || []), ...res?.data?.data?.data]);
      }

      setTotal(res?.data?.data?.total)
      setProfile(res?.data?.user)

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
    ...(warranty && { warranty: warranty.split(",") }),
  };


  useEffect(() => {
    if (category) {
      getBrands(category);
    }
  }, [category]);


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
    warranty,
    slug
  ]);

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

  const onReset = () => {
    setPage(1);
    form.resetFields();
    router.push(`/profile/${slug[0]}/${slug[1]}`);
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
        router.push(`/profile/${slug[0]}/${slug[1]}?category=${value?.category}`);
      } else {
        form.submit();
      }
    }
  };

  return (
    <>
      <div className="product_details_header">
        <div className="content_wrap">
          {loading ? (
            ""
          ) : (
            <div className="styled_breadcrumb">
              <Link href="/">
                <IoHome />
                Home
              </Link>{" "}
              <span className="separator">/</span>
              <Link
                href={`/`}
              >
                {profile?.slug}
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="content_wrap">
        <div className='profile_content'>
          <div className="filters">
            <ShopProfile total={total} data={profile} />
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
          <div className="shop_ads_result">
            <Row gutter={[20, 20]}>
              {loading && isLoadMore !== true ? (
                <>
                  <Col lg={8} md={12} sm={12} xs={12}>
                    <BlogSkeleton />
                  </Col>
                  <Col lg={8} md={12} sm={12} xs={12}>
                    <BlogSkeleton />
                  </Col>
                  <Col lg={8} md={12} sm={12} xs={12}>
                    <BlogSkeleton />
                  </Col>
                </>
              ) : (
                <>
                  {deviceData?.length > 0 ? (
                    <>
                      {deviceData?.map((item) => (
                        <Col
                          key={item?.id}

                          lg={8} md={12} sm={12} xs={12}
                        >
                          <ProductCard

                            className={`two_card_sm`}
                            data={item}
                          />
                        </Col>
                      ))}
                    </>
                  ) : (
                    <>
                      <Image
                        src="/no-data.jpg"
                        alt="no-data"
                        width={300}
                        height={300}
                        layout="responsive"
                      />
                    </>
                  )}
                </>
              )}
            </Row>
            {total && total > deviceData?.length ? (
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


    </>

  );
};

export default ProfileLayout;
