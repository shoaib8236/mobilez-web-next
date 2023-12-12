"use client";

import { Col, Row, Select } from "antd";
import React, { useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { MdOutlineYoutubeSearchedFor } from "react-icons/md";
import Skeleton from "../Skeleton/Skeleton";
import BlogSkeleton from "../BlogSkeleton/BlogSkeleton";
import { FaListUl } from "react-icons/fa6";
import { LuLayoutGrid } from "react-icons/lu";

import StyledButton from "../StyledButton/StyledButton";
import Image from "next/image";

const ProductResult = (props) => {
  const { deviceData = {}, loading = true,     isLoadMore= false,
  setIsLoadMore= ()=> {}} = props;
  const [layout, setLayout] = useState("grid");

  const onChangeLayout = (type) => () => {
    setLayout(type);
  };

  return (
    <>
      <div className="filters_header">
        <div className="flex_between">
          <div className="filters_right_section">
            <Select placeholder="Sort by" className="styled_select">
              <Select.Option value="">Default</Select.Option>
              <Select.Option value="high-to-low">
                Price : (High to low)
              </Select.Option>
              <Select.Option value="high-to-low">
                Price : (Low to High)
              </Select.Option>
              <Select.Option value="recently-added">
                Recently Added
              </Select.Option>
            </Select>
           <div>
           <StyledButton
              onClick={onChangeLayout("list")}
              className="icon_style light_primary sm"
            >
              <FaListUl />
            </StyledButton>
            <StyledButton
              onClick={onChangeLayout("grid")}
              className="icon_style light_primary sm"
            >
              <LuLayoutGrid />
            </StyledButton>
           </div>
          </div>
        </div>
      </div>
      <div className="results_wrapper">
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
              {
                deviceData?.length > 0 ? <>
                {deviceData?.map((item) => (
                <Col
                
                  key={item?.id}
                  {...(layout === "grid" ? { lg: 8, md:12, sm:12, xs:12 } : { span: 24 })}
                >
                  <ProductCard className={`${layout} two_card_sm`} data={item} />
                </Col>
              ))}
                </> : <>
                  <Image src='/no-data.jpg' alt="no-data" width={300} height={300} layout="responsive"/>
                </>
              }
            </>
          )}
        </Row>
      </div>
    </>
  );
};

export default ProductResult;
