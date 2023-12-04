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

const ProductResult = (props) => {
  const { deviceData = {}, loading = true } = props;
  const [layout, setLayout] = useState("grid");

  const onChangeLayout = (type) => () => {
    setLayout(type);
  };

  return (
    <>
      <div className="filters_header">
        <div className="flex_between">
          <h3 className="title_with_icon mb_0">
            {loading ? (
              <>
                <Skeleton height="30px" width="150px" />
              </>
            ) : (
              <>
                <MdOutlineYoutubeSearchedFor />
                Showing {deviceData?.total} results
              </>
            )}
          </h3>
          <div className="filters_right_section">
            <Select placeholder="Select filters" className="styled_select">
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
              className="icon_style md light"
            >
              <FaListUl />
            </StyledButton>
            <StyledButton
              onClick={onChangeLayout("grid")}
              className="icon_style md light"
            >
              <LuLayoutGrid />
            </StyledButton>
           </div>
          </div>
        </div>
      </div>
      <div className="results_wrapper">
        <Row gutter={[20, 20]}>
          {loading ? (
            <>
              <Col lg={8}>
                <BlogSkeleton />
              </Col>
              <Col lg={8}>
                <BlogSkeleton />
              </Col>
              <Col lg={8}>
                <BlogSkeleton />
              </Col>
            </>
          ) : (
            <>
              {deviceData?.data?.map((item) => (
                <Col
                  key={item?.id}
                  {...(layout === "grid" ? { lg: 8 } : { span: 24 })}
                >
                  <ProductCard className={layout} data={item} />
                </Col>
              ))}
            </>
          )}
        </Row>
      </div>
    </>
  );
};

export default ProductResult;
