"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import api from "@/services/api";
import { getImage } from "@/utils/helper";
import Image from "next/image";
import Skeleton from "../Skeleton/Skeleton";

const AppBanner = (props) => {
  const { className = "" } = props;

  const [sliderImages, setSliderImage] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSLiderImages = async () => {
    setLoading(true);
    const res = await api.get("/banner-images");
    if (res?.data?.status) {
      let images = JSON.parse(res?.data?.images?.[0]?.banner_images);
      setSliderImage(images);
      setLoading(false);
    }
  };

  useEffect(() => {
    getSLiderImages();
  }, []);

  return (
    <>
      {loading ? (
        <div className="banner_placeholder">
          <Skeleton height="100%" width="100%"/>
          {/* <div></div> */}
        </div>
      ) : (
        <>
          <Swiper className={`app_banner ${className}`} slidesPerView={1}>
            {sliderImages?.map((item, i) => (
              <SwiperSlide key={i}>
                <div className="slider_wrap">
                  <Image fill objectFit="cover" src={getImage(item)} alt="banner" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </>
  );
};

export default React.memo(AppBanner);
