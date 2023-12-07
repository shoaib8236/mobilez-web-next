"use client";

import api from "@/services/api";
import ProductFilters from "../ProductFilters/ProductFilters";
import ProductResult from "../ProductResult/ProductResult";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { MdFilterList } from "react-icons/md";
import StyledButton from "../StyledButton/StyledButton";

const FiltersLayout = () => {
  const [deviceData, setDeviceData] = useState(null);
  const [categoryBrands, setCategoryBrands] = useState(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();

  const searchParams = useSearchParams();
  const filtersNodeRef = useRef(null);

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

  const handleCollapse = () => {
    let filterNode = filtersNodeRef.current;

    if (filterNode?.classList.contains("open")) {
      filterNode.classList.remove("open");
    } else {
      filterNode.classList.add("open");
    }
  };

  return (
    <>
      <div className="content_wrap">
        <h1 className="page_title">
          {brand
            ? `${brand} ${category === "mobile" ? "mobile" : category}`
            : category}{" "}
          for sale in {city ? city : "Pakistan"}
        </h1>
      </div>
      <div className="content_fluid">
        <div className="content_wrap">
          <div className="flex_layout">
            <div className="filters_sticky">
              <div className="sticky">
                <div className="filter_left_col">
                  <StyledButton
                    onClick={handleCollapse}
                    className="icon_style light_primary sm"
                  >
                    <MdFilterList />
                  </StyledButton>
                </div>
                <div
                  ref={filtersNodeRef}
                  className="filters open"
                >
                  <div className="sticky_container ">
                    <ProductFilters
                      categoryBrands={categoryBrands}
                      loading={loading}
                      setDeviceData={setDeviceData}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex_cols">
              <div className="product_results">
                <ProductResult loading={loading} deviceData={deviceData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FiltersLayout;
