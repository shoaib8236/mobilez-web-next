"use client";

import AppBanner from "@/app-ui/AppBanner/AppBanner";
import PageBanner from "@/app-ui/PageBanner/PageBanner";
import ProductCard from "@/app-ui/ProductCard/ProductCard";
import SignupBanner from "@/app-ui/SignupBanner/SignupBanner";
import StyledHeading from "@/app-ui/StyledHeading/StyledHeading";
import { brandsLogo } from "@/utils/fakeData";
import { Row, Col } from "antd";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Home() {
  return (
    <div className="home_wrap">
      <AppBanner className="mb_60" />
      <div className="mb_60">
        <StyledHeading text="RECENTLY ADDED MOBILES" />
      </div>

      <div className="content_wrap mb_60">
        <Swiper spaceBetween={20} slidesPerView={4}>
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
          <Swiper spaceBetween={20} slidesPerView={4}>
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
        <Swiper spaceBetween={20} slidesPerView={4}>
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
        <Swiper spaceBetween={20} slidesPerView={4}>
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
      <div className="mb_60 brands_logo">
        <Swiper loop spaceBetween={20} slidesPerView={8}>
          {brandsLogo?.map((item) => (
            <SwiperSlide key={item?.id}>
              <div className="logo_item">
                <Image height={100} width={100} src={item.logo} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
