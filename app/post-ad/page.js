"use client";

import PostAccessories from "@/app-ui/PostAdd/PostAccessories";
import PostMobile from "@/app-ui/PostAdd/PostMobile";
import PostSmartWatch from "@/app-ui/PostAdd/PostSmartWatch";
import PostTablet from "@/app-ui/PostAdd/PostTablet";
import api from "@/services/api";
import { Tabs } from "antd";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const { TabPane } = Tabs;


  const searchParams = useSearchParams();

  const type = searchParams.get("type") || "";


  console.log(type, )

  const [brands, setBrands] = useState([]);

  const getBrands = async () => {
    try {
      let res = await api.get("/brands");
      if (res?.data?.status) {
        console.log(res?.data);
        setBrands(res?.data?.brands);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <div className="post_an_ad">
      <div className="ad_wrap">
        <h1>Select Category</h1>
        <Tabs type="card" defaultActiveKey={type}>
          <TabPane tab="Mobile" key="mobile">
            <PostMobile brands={brands} />
          </TabPane>
          <TabPane tab="Tablet" key="tablet">
            <PostTablet brands={brands} />
          </TabPane>
          <TabPane tab="Accessories" key="accessories">
            <PostAccessories brands={brands} />
          </TabPane>
          <TabPane tab="Smart Watch" key="smart_watch">
            <PostSmartWatch  brands={brands} />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Page;
