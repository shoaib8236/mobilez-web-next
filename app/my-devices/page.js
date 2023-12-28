'use client'

import React, { useEffect, useState } from "react";
import api from "@/services/api";

const Page = () => {
  const [myDevices, setMyDevices] = useState();

  const getMyAds = async () => {
    try {
      let res = await api.get("/my-devices");
      if (res?.data?.status) {
        setMyDevices(res?.data?.my_adds);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getMyAds();
  }, []);

  return (
    <div className="my_devices_wrap">
      <div className="styled_table">
        <div className="th">
          <div className="td">#</div>
          <div className="td">Brand</div>
          <div className="td">Product Name</div>
          <div className="td">Unit Price</div>
          <div className="td">Date</div>
          <div className="td">Picture</div>
          <div className="td">Action</div>
        </div>
        {myDevices?.map((item, i)=> (
          <div key={i} className="tr">
          <div className="td"></div>
          <div className="td">Brand</div>
          <div className="td">Product Name</div>
          <div className="td">Unit Price</div>
          <div className="td">Date</div>
          <div className="td">Picture</div>
          <div className="td">Action</div>
        </div>
        ))}
      </div>
      <p className="entries">Showing 0 to 0 of 0 entries</p>
    </div>
  );
};

export default Page;
