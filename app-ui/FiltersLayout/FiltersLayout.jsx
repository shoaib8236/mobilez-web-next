"use client";

import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import ProductFilters from "../ProductFilters/ProductFilters";
import ProductResult from "../ProductResult/ProductResult";
import StyledButton from "../StyledButton/StyledButton";
import Link from "next/link";
import { IoHome } from "react-icons/io5";

const FiltersLayout = () => {
  const [deviceData, setDeviceData] = useState([]);
  const [categoryBrands, setCategoryBrands] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(1);


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

  const onPageChange = () => {
    setIsLoadMore(true)
    setPage((prev) => prev + 1);
  };

  return (
    <>
      <div className="content_wrap">
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
          <p>Showing {deviceData?.length} results of {totalRecords} </p>
        </div>
      </div>
      <div className="content_fluid">
        <div className="content_wrap">
          <div className="flex_layout">
            <div ref={filtersNodeRef} className="filters">
              <div className="sticky_container">
                <ProductFilters
              
                  setTotalRecords={setTotalRecords}
                  isLoadMore={isLoadMore}
                  setIsLoadMore={setIsLoadMore}
                  page={page}
                  handleCollapseClose={handleCollapseClose}
                  setLoading={setLoading}
                  setCategoryBrands={setCategoryBrands}
                  setDeviceData={setDeviceData}
                  categoryBrands={categoryBrands}
                  loading={loading}
                  setPage={setPage}
                />
              </div>
            </div>

            <div className="flex_cols">
              <div className="product_results">
                <ProductResult  isLoadMore={isLoadMore} loading={loading} deviceData={deviceData} />
              </div>
              {totalRecords && totalRecords > deviceData?.length ?<div className="load_more">
                <StyledButton loading={isLoadMore} disabled={isLoadMore} onClick={onPageChange}>Load More</StyledButton>
              </div> : ''}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FiltersLayout;
