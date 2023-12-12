'use client'

import PropTypes from "prop-types";
import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { brandsLogo } from "@/utils/fakeData";


const BrandsSlider = (props) => {
  const { className = "" } = props;

  const breakpoints = {
    320: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    480: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 6,
      spaceBetween: 30,
    },
    1200: {
      slidesPerView: 8,
      spaceBetween: 40,
    },
  };

  return (
    <div className={`${className} brands_logo`}>
      <Swiper
        loop
        spaceBetween={20}
        slidesPerView={8}
        breakpoints={breakpoints}
      >
        {brandsLogo?.map((item) => (
          <SwiperSlide key={item?.id}>
            <div className="logo_item">
              <Image height={100} width={100} src={item.logo} alt={'brands'} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

// PropTypes for type-checking
BrandsSlider.propTypes = {
  className: PropTypes.string,
};

export default BrandsSlider;
