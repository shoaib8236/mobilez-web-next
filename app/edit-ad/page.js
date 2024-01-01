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
  const id = searchParams.get("id") || "";

  
  const [brands, setBrands] = useState([]);
  const [ad, setAd] = useState([]);
  const [loadingAd, setLoadingAd] = useState(true);

  const getBrands = async () => {
    try {
      let res = await api.get("/brands");
      if (res?.data?.status) {
        setBrands(res?.data?.brands);
      }
    } catch (error) {}
  };
  const getAdById = async (id) => {
    try {
      setLoadingAd(true);
      let res = await api.get(`/edit-Ad/${id}`);
      if (res?.data?.status) {
        setAd(res?.data?.data);
      }
    } catch (error) {}
    setLoadingAd(false);
  };

  useEffect(() => {
    getAdById(id);
    getBrands();
  }, []);

  const renderEditAdByType = (type) => {
    if (type === "mobile") {
      return <PostMobile brands={brands} defaultValue={ad} />;
    } else if (type === "tablet") {
      <PostTablet brands={brands} defaultValue={ad} />;
    } else if (type === "watch") {
      <PostSmartWatch brands={brands} defaultValue={ad} />;
    } else if (type === "accessories") {
      <PostAccessories brands={brands} defaultValue={ad} />;
    }
  };

  return (
    <div className="post_an_ad">
      <div className="ad_wrap">
        <h1>Select Category</h1>

        {loadingAd ? "loading" : renderEditAdByType(type)}
      </div>
    </div>
  );
};

export default Page;
