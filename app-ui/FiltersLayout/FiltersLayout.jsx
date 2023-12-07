"use client";

import api from "@/services/api";
import ProductFilters from "../ProductFilters/ProductFilters";
import ProductResult from "../ProductResult/ProductResult";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LuFilter } from "react-icons/lu";

const FiltersLayout = () => {
  const [deviceData, setDeviceData] = useState(null);
  const [categoryBrands, setCategoryBrands] = useState(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();

  const searchParams = useSearchParams();

  const category = searchParams.get("category") || "";
  const brand = searchParams.get("brand") || "";
  const ram = searchParams.get("ram") || "";
  const storage = searchParams.get("storage") || "";
  const pta_status = searchParams.get("pta_status") || "";
  const product_status = searchParams.get("product_status") || "";
  const city = searchParams.get("city") || "";

  const getDevices = async () => {
    try {
      setLoading(true);
      console.log(category);
      let res = await api.post(
        `/category?category=${category}&brands=${brand}&storage=${storage}&ram=${ram}&pta_status=${pta_status}&product_status=${product_status}&city=${city}`
      );
      setLoading(false);

      setDeviceData(res?.data?.data);
      setCategoryBrands(res?.data?.brands);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDevices();
  }, [category, brand, storage, pta_status, product_status, city, ram]);

  return (
    <>
      <div className="content_wrap">
        <h1 className="page_title">
          {brand
            ? `${brand} ${category === "mobile" ? "mobile" : category}`
            : category}{" "}
          for sale in {city ? city : "Pakistan"}
        </h1>
        <div className="breadcrumb"></div>

        <div className="flex_layout">
          <div className="flex_cols for_filters">
            <div className="sticky_container">
              <h3 className="title_with_icon">
                <LuFilter /> Filter by
              </h3>
              <ProductFilters
                categoryBrands={categoryBrands}
                loading={loading}
                setDeviceData={setDeviceData}
              />
            </div>
          </div>
          <div className="flex_cols">
            <div className="product_results">
              <ProductResult loading={loading} deviceData={deviceData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FiltersLayout;
