"use client";

import PageBanner from "@/app-ui/PageBanner/PageBanner";
import ProductFilters from "@/app-ui/ProductFilters/ProductFilters";
import ProductResult from "@/app-ui/ProductResult/ProductResult";
import api from "@/services/api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LuFilter } from "react-icons/lu";
import { useSearchParams } from 'next/navigation'


const Page = (props) => {
  const [deviceData, setDeviceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams()

  const searchParams = useSearchParams()



  const getDevices = async () => {
    try {
      setLoading(true);
      let res = await api.post("/category", props?.searchParams);
      setLoading(false);

      setDeviceData(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDevices();
  }, [props]);

  console.log(props, "props");
  console.log(params, "params");

  // console.log(searchParams?.getAll())

  return (
    <div className="find_my_device_wrap">
      <div className="content_wrap">
        <h1 className="page_title">
          Adam Boltoro Jeep 4x4 Diesel for sale in Pakistan
        </h1>
        <div className="breadcrumb"></div>

        <div className="flex_layout">
          <div className="flex_cols for_filters">
            <div className="sticky_container">
              <h3 className="title_with_icon">
                <LuFilter /> Filter by
              </h3>
              <ProductFilters
                loading={loading}
                initialValues={props?.searchParams}
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
    </div>
  );
};

export default Page;
