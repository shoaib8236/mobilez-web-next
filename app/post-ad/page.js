"use client";

import PostAccessories from "@/app-ui/PostAdd/PostAccessories";
import PostMobile from "@/app-ui/PostAdd/PostMobile";
import PostSmartWatch from "@/app-ui/PostAdd/PostSmartWatch";
import PostTablet from "@/app-ui/PostAdd/PostTablet";
import api from "@/services/api";
import { Tabs } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const { TabPane } = Tabs;

  const router = useRouter()
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "";

  const onTabChange = (tab) => {
    console.log(tab)
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);
    params.set('type', tab);
    url.search = params.toString();
    router.push(url.pathname + url.search);

  }


  const [brands, setBrands] = useState([]);

  const getBrands = async (type) => {
    try {
      let res = await api.get(`/brand-category?category=${type}`);
      if (res?.data?.status) {

        setBrands(res?.data?.data);
      }
    } catch (error) { }
  };


  useEffect(() => {
    getBrands(type);
  }, [type]);

  return (
    <div className="post_an_ad">
      <div className="ad_wrap">
        <h1>Select Category</h1>
        <Tabs onChange={onTabChange} type="card" defaultActiveKey={type}>
          <TabPane tab="Mobile" key="mobile">
            <PostMobile brands={brands} />
          </TabPane>
          <TabPane tab="Tablet" key="tablet">
            <PostTablet brands={brands} />
          </TabPane>
          <TabPane tab="Accessories" key="accessories">
            <PostAccessories brands={brands} />
          </TabPane>
          <TabPane tab="Smart Watch" key="watch">
            <PostSmartWatch brands={brands} />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Page;
