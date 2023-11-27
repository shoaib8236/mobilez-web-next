"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import api from "@/services/api";
import { getImage } from "@/utils/helper";
import Image from "next/image";

const AppBanner = (props) => {
  const { className = "" } = props;

  const [sliderImages, setSliderImage] = useState([]);

  const getSLiderImages = async () => {
    const res = await api.get("/banner-images");

    let images = JSON.parse(res?.data?.images?.[0]?.banner_images);
    setSliderImage(images);
  };

  useEffect(() => {
    getSLiderImages();
  }, []);

  return (
    <Swiper className={`app_banner ${className}`} slidesPerView={1}>
      {sliderImages?.map((item, i) => (
        <SwiperSlide key={i}>
          <div style={{ height: 400, width: "100%" }}>
            <Image fill objectFit="cover" src={getImage(item)} alt="" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default React.memo(AppBanner);
