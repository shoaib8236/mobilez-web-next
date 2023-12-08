"use client";

import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import ProductFilters from "../ProductFilters/ProductFilters";
import ProductResult from "../ProductResult/ProductResult";
import StyledButton from "../StyledButton/StyledButton";

const FiltersLayout = () => {
  const [deviceData, setDeviceData] = useState(null);
  const [categoryBrands, setCategoryBrands] = useState(null);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const filtersNodeRef = useRef(null);

  const category = searchParams.get("category") || "";
  const brand = searchParams.get("brand") || "";
  const city = searchParams.get("city") || "";

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
                : category
                ? category
                : "Mobile Devices"}{" "}
              for sale in {city ? city : "Pakistan"}
            </h1>
          </div>
          <p>Showing {deviceData?.total} results</p>
        </div>
      </div>
      <div className="content_fluid">
        <div className="content_wrap">
          <div className="flex_layout">
            <div ref={filtersNodeRef} className="filters">
              <div className="sticky_container">
                <ProductFilters
                  handleCollapseClose={handleCollapseClose}
                  setLoading={setLoading}
                  setCategoryBrands={setCategoryBrands}
                  setDeviceData={setDeviceData}
                  categoryBrands={categoryBrands}
                  loading={loading}
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
      </div>
    </>
  );
};

export default FiltersLayout;
