"use client";

import AppBanner from "@/app-ui/AppBanner/AppBanner";
import BrandsSlider from "@/app-ui/BrandsSlider/BrandsSlider";
import ProductCard from "@/app-ui/ProductCard/ProductCard";
import SignupBanner from "@/app-ui/SignupBanner/SignupBanner";
import StyledHeading from "@/app-ui/StyledHeading/StyledHeading";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Home() {
  const breakpoints = {
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    480: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
  };

  return (
    <div className="home_wrap">
      <AppBanner className="mb_60" />
      <div className="mb_60">
        <StyledHeading text="RECENTLY ADDED MOBILES" />
      </div>

      <div className="content_wrap mb_60">
        <Swiper breakpoints={breakpoints} spaceBetween={20} slidesPerView={4}>
          <SwiperSlide>
            <ProductCard />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard />
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="home_banner_wrap mb_60">
        <Image fill objectFit="cover" src={"/page-banner.webp"} alt="" />
      </div>

      <div className="mb_60">
        <StyledHeading text="RECENTLY ADDED TABLETS" />
      </div>

      <div className="content_wrap mb_60">
        <div className="content_wrap mb_60">
          <Swiper breakpoints={breakpoints} spaceBetween={20} slidesPerView={4}>
            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div className="mb_60">
        <StyledHeading text="RECENTLY ADDED TABLETS" />
      </div>
      <div className="home_banner_wrap mb_60">
        <Image fill objectFit="cover" src={"/page-banner.webp"} alt="" />
      </div>
      <div className="mb_60">
        <StyledHeading text="RECENTLY ADDED SMART WATCHES" />
      </div>
      <div className="content_wrap mb_60">
        <Swiper breakpoints={breakpoints} spaceBetween={20} slidesPerView={4}>
          <SwiperSlide>
            <ProductCard />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="home_banner_wrap mb_60">
        <Image fill objectFit="cover" src={"/page-banner.webp"} alt="" />
      </div>
      <div className="mb_60">
        <StyledHeading text="RECENTLY ADDED ACCESSORIES" />
      </div>
      <div className="content_wrap mb_60">
        <Swiper breakpoints={breakpoints} spaceBetween={20} slidesPerView={4}>
          <SwiperSlide>
            <ProductCard />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="mb_60">
        <SignupBanner />
      </div>
      <BrandsSlider className="mb_60" />
    </div>
  );
}
