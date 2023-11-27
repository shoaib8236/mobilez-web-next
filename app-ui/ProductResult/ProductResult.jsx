'use client'

import { Col, Row, Select } from "antd";
import React from "react";
import ProductCard from "../ProductCard/ProductCard";

const ProductResult = (props) => {
  const { deviceData = {} } = props;

  

  return (
    <>
      <div className="filters_header">
        <div className="flex_between">
          <h3>Showing 3 results</h3>
          <Select placeholder="Select filters" className="styled_select">
            <Select.Option value="">Default</Select.Option>
            <Select.Option value="high-to-low">
              Price : (High to low)
            </Select.Option>
            <Select.Option value="high-to-low">
              Price : (Low to High)
            </Select.Option>
            <Select.Option value="recently-added">Recently Added</Select.Option>
          </Select>
        </div>
      </div>
      <Row gutter={[20, 20]}>
        {deviceData?.data?.map((item) => (
          <Col key={item?.id} lg={8}>
            <ProductCard data={item} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ProductResult;
