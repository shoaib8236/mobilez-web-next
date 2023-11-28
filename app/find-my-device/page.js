"use client";

import PageBanner from "@/app-ui/PageBanner/PageBanner";
import ProductFilters from "@/app-ui/ProductFilters/ProductFilters";
import ProductResult from "@/app-ui/ProductResult/ProductResult";
import api from "@/services/api";
import { useEffect, useState } from "react";

const Page = (props) => {
  const [deviceData, setDeviceData] = useState(null);
  
  const getDevices = async () => {
    try {
      let res = await api.post("/category", props?.searchParams);
      setDeviceData(res?.data?.data);
    } catch (error) {
        console.log(error)
    }
  };

  useEffect(() => {
    getDevices();
  }, [props?.searchParams]);
  
  return (
    <div className="find_my_device_wrap">
      <PageBanner title="Find my device" />
      <div className="content_wrap">
        <div className="flex_layout">
          <div className="flex_cols for_filters">
            <div className="sticky_container">
              <ProductFilters initialValues={props?.searchParams} setDeviceData={setDeviceData} />
            </div>
          </div>
          <div className="flex_cols">
            <ProductResult deviceData={deviceData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
