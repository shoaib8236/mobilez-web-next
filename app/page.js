"use client";

import AppBanner from "@/app-ui/AppBanner/AppBanner";
import BlogSkeleton from "@/app-ui/BlogSkeleton/BlogSkeleton";
import BrandsSlider from "@/app-ui/BrandsSlider/BrandsSlider";
import ProductCard from "@/app-ui/ProductCard/ProductCard";
import SignupBanner from "@/app-ui/SignupBanner/SignupBanner";
import StyledHeading from "@/app-ui/StyledHeading/StyledHeading";
import api from "@/services/api";
import { Col, Row } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

const fetchData = async (category) => {
  try {
    const res = await api.post(`/category?category=${category}`);
    if (res?.data?.status) {
      return {
        data: res?.data?.data,
        category,
      };
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

const useCategoryData = (category) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDataForCategory = async () => {
      const result = await fetchData(category);
      if (result) {
        setData(result);
      }
    };

    fetchDataForCategory();
  }, [category]);

  return data;
};

export default function Home() {
  const mobiles = useCategoryData("mobile");
  const tablets = useCategoryData("tablet");
  const smartWatches = useCategoryData("watch");
  const accessories = useCategoryData("accessories");

  let sliderProp = {
    breakpoints: {
      300: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      480: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
    },
    spaceBetween: 20,
    slidesPerView: 4,

    pagination: {
      clickable: true,
      dynamicBullets: true,
    },
    navigation: true,
  };

  const renderSkeleton = () => {
    return (
      <>
        <Row gutter={[20, 20]}>
          <Col lg={6} md={8} sm={12} xs={24}>
            <BlogSkeleton />
          </Col>
          <Col lg={6} md={8} sm={12} xs={24}>
            <BlogSkeleton />
          </Col>
          <Col lg={6} md={8} sm={12} xs={24}>
            <BlogSkeleton />
          </Col>
          <Col lg={6} md={8} sm={12} xs={24}>
            <BlogSkeleton />
          </Col>
        </Row>
      </>
    );
  };

  return (
    <div className="home_wrap">
      <AppBanner className="mb_60" />
      <div className="mb_60">
        <StyledHeading text="RECENTLY ADDED MOBILE" />
      </div>

      <div className="content_wrap mb_60">
        {mobiles === null ? (
          renderSkeleton()
        ) : (
          <>   
            <Swiper className="p_15" {...sliderProp} modules={[Pagination]} loop= {true}>
              {mobiles?.data?.data?.map((item) => (
                <SwiperSlide key={item?.id}>
                  <ProductCard data={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        )}
      </div>

      <div className="home_banner_wrap mb_60">
        <Image fill objectFit="cover" src={"/banner-2.webp"} alt="" />
      </div>

      <div className="mb_60">
        <StyledHeading text="RECENTLY ADDED TABLETS" />
      </div>

      <div className="content_wrap mb_60">
        <div className="content_wrap mb_60">
          {tablets === null ? (
            renderSkeleton()
          ) : (
            <>
              <Swiper className="p_15" {...sliderProp} modules={[Pagination]} loop= {true}>
                {tablets?.data?.data?.map((item) => (
                  <SwiperSlide key={item?.id}>
                    <ProductCard data={item} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
          )}
        </div>
      </div>
      <div className="mb_60">
        <StyledHeading text="RECENTLY ADDED TABLETS" />
      </div>
      <div className="home_banner_wrap mb_60">
        <Image fill objectFit="cover" src={"/banner-3.webp"} alt="" />
      </div>
      <div className="mb_60">
        <StyledHeading text="RECENTLY ADDED SMART WATCHES" />
      </div>
      <div className="content_wrap mb_60">
        {accessories === null ? (
          renderSkeleton()
        ) : (
          <>
            <Swiper className="p_15" {...sliderProp} modules={[Pagination]} loop= {true}>
              {smartWatches?.data?.data?.map((item) => (
                <SwiperSlide key={item?.id}>
                  <ProductCard data={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        )}
      </div>
      <div className="home_banner_wrap mb_60">
        <Image fill objectFit="cover" src={"/banner-3.webp"} alt="" />
      </div>
      <div className="mb_60">
        <StyledHeading text="RECENTLY ADDED ACCESSORIES" />
      </div>
      <div className="content_wrap mb_60">
        {accessories === null ? (
          renderSkeleton()
        ) : (
          <>
            <Swiper className="p_15" {...sliderProp} modules={[Pagination]} loop= {true}>
              {accessories?.data?.data?.map((item) => (
                <SwiperSlide key={item?.id}>
                  <ProductCard type="accessories" data={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        )}
      </div>
      <div className="mb_60">
        <SignupBanner />
      </div>
      <BrandsSlider className="mb_60" />
    </div>
  );
}
