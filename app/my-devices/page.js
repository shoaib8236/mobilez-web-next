"use client";

import React, { useEffect, useState } from "react";
import api from "@/services/api";
import { getFormattedDate, getImage } from "@/utils/helper";
import StyledButton from "@/app-ui/StyledButton/StyledButton";
import Image from "next/image";

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
          <div className="td sno">#</div>
          <div className="td">Brand</div>
          <div className="td">Product Name</div>
          <div className="td">Unit Price</div>
          <div className="td">Date</div>
          <div className="td">Picture</div>
          <div className="td">Action</div>
        </div>
        {myDevices?.map((item, i) => (
          <div key={i} className="tr">
            <div className="td sno">{i}</div>
            <div className="td">
              {item?.category === "accessories" ? "-" : item?.brand}
            </div>
            <div className="td">
              {item?.category === "accessories" ? "accessories_title" : item?.brand}
            </div>
            <div className="td">{item.price}</div>
            <div className="td">{getFormattedDate(item?.created_at)}</div>
            <div className="td product_image">
            <Image
                src={getImage(item?.image?.img)}
                alt="phone"
                width={100}
                height={100}
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="td action_td">
              <StyledButton disabled={item?.sell_status === 'Sold'} className='sm secondary'>
                Sold
              </StyledButton>
              <StyledButton className='sm primary'>
                Edit
              </StyledButton>
              <StyledButton className='sm secondary'>
                Delete
              </StyledButton>
            </div>
          </div>
        ))}
      </div>
      <p className="entries">Showing 0 to 0 of 0 entries</p>
    </div>
  );
};

export default Page;
