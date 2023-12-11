"use client";

import BlogSkeleton from "@/app-ui/BlogSkeleton/BlogSkeleton";
import ContactSellerModal from "@/app-ui/ContactSellerModal/ContactSellerModal";
import ImagesGallery from "@/app-ui/ImagesGallery/ImagesGallery";
import ProductCard from "@/app-ui/ProductCard/ProductCard";
import Skeleton from "@/app-ui/Skeleton/Skeleton";
import StyledButton from "@/app-ui/StyledButton/StyledButton";
import StyledHeading from "@/app-ui/StyledHeading/StyledHeading";
import api from "@/services/api";
import { getFormattedDate, getImage } from "@/utils/helper";
import { useFcmToken } from "@/utils/hooks";
import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Page = ({ params: { slug } }) => {
  const { fcmToken, notificationPermissionStatus } = useFcmToken();
  const [productDetails, setProductDetails] = useState(null);
  const [relatedAdds, setRelatedAdds] = useState([]);
  const [shopAdds, setShopAdds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openContactSellerModal, setOpenContactSellerModal] = useState(false);

  const handleContactSellerModal = () => {
    setOpenContactSellerModal(!openContactSellerModal);
  };

  const getProductsDetails = async (fcm) => {
    const body = {
      device_token: fcm,
    };

    try {
      let res = await api.get(`/details/${slug[0]}/${slug[1]}`, {
        params: body,
      });
      if (res?.data?.status) {
        setProductDetails(res?.data?.details);
        setRelatedAdds(res?.data?.related_ads);
        setShopAdds(res?.data?.more_ads);
        setLoading(false);
      }
    } catch (error) {}
  };

  useEffect(() => {

    if (fcmToken) {
      getProductsDetails(fcmToken);
    }
  }, [fcmToken, slug]);

  const productImages = productDetails?.productimages.map((item) => ({
    original: getImage(item?.img),
    thumbnail: getImage(item?.img),
  }));

  let sliderProp = {
    breakpoints: {
      300: {
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
        <Row gutter={[40, 40]}>
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
    <>
      <section className="product_details">
        <div className="content_wrap">
          <Row gutter={[20, 20]}>
            <Col lg={12} md={12} sm={24} xs={24}>
              
                {loading ? (
                  <Skeleton height="400px" width="100%" />
                ) : (
                  <ImagesGallery images={productImages || []} />
                )}
              
            </Col>

            <Col lg={12} md={12} sm={24} xs={24}>
              <div className="detail_content">
                {loading ? (
                  <Skeleton height="30px" margin="0 0 10px 0" width="280px" />
                ) : (
                  <>
                    <h1>{`${productDetails?.brand} ${productDetails?.model}`}</h1>
                  </>
                )}
                {loading ? (
                  <Skeleton height="30px" margin="0 0 10px 0" width="220px" />
                ) : (
                  <>
                    <h1 className="text_primary">
                      Rs: {productDetails?.price}
                    </h1>
                  </>
                )}
                <hr />
                {loading ? (
                  <Skeleton height="20px" margin="0 0 10px 0" width="200px" />
                ) : (
                  <>
                    <p>
                      <span className="text_primary">Posted By:</span> &nbsp;
                      {productDetails?.user.name}
                    </p>
                  </>
                )}
                {loading ? (
                  <Skeleton height="20px" margin="0 0 10px 0" width="160px" />
                ) : (
                  <>
                    <p>
                      <span className="text_primary">Posted At:</span> &nbsp;
                      {getFormattedDate(productDetails?.created_at)}
                    </p>
                  </>
                )}
                {loading ? (
                  <Skeleton height="30px" margin="0 0 10px 0" width="300px" />
                ) : (
                  <>
                    <h3 className="posted_heading">
                      Posted By :{" "}
                      <span className="text_primary blinking_text">
                        {productDetails?.user.name}
                      </span>
                    </h3>
                  </>
                )}
                {loading ? (
                  <Skeleton
                    height="40px"
                    margin="0 0 10px 0"
                    width="120px"
                    borderRadius="50px"
                  />
                ) : (
                  <>
                    <div className="details_btn">
                      <StyledButton
                        onClick={handleContactSellerModal}
                        className="primary"
                      >
                        Contact Seller
                      </StyledButton>
                      <StyledButton className="secondary">
                        Chat With Seller
                      </StyledButton>
                    </div>
                  </>
                )}
                {loading ? (
                  <Skeleton height="20px" margin="0 0 10px 0" width="120px" />
                ) : (
                  <>
                    {" "}
                    <h3 className="specs_heading">Specifications:</h3>
                  </>
                )}
                {loading ? (
                  <Skeleton height="30px" margin="0 0 10px 0" width="250px" />
                ) : (
                  <>
                    {" "}
                    <div className="specs">
                      <div>
                        <span>RAM:</span> {productDetails?.ram} GB
                      </div>
                      <div>
                        <span>Storage:</span> {productDetails?.storage} GB
                      </div>
                      <div>
                        <span>PTA Status:</span> {productDetails?.pta_status}
                      </div>
                      <div>
                        <span>Warranty:</span> {productDetails?.warranty}
                      </div>
                      <div>
                        <span>Product Condition:</span>{" "}
                        {productDetails?.product_type}
                      </div>
                    </div>
                  </>
                )}
                <h3 className="desc_heading">Description:</h3>
                {loading ? (
                  <>
                    <Skeleton height="20px" margin="0 0 10px 0" width="100%" />
                    <Skeleton height="20px" margin="0 0 10px 0" width="300px" />
                  </>
                ) : (
                  <>
                    {" "}
                    <p>{productDetails?.description}</p>
                  </>
                )}
                <h3 className="share_heading">Share:</h3>
                <div className="icons">
                  <FaFacebook />
                  <IoLogoWhatsapp />
                  <FaLink />
                </div>
                <h3 className="views_heading">Views:</h3>
                03
              </div>
            </Col>
          </Row>

          <div className="mt_60">
            <div className="mb_60">
              <StyledHeading text="ADS BY CELL LAGOON" />
            </div>
            <div className="mb_60">
              {loading ? (
                renderSkeleton()
              ) : (
                <>
                  <Swiper {...sliderProp} modules={[Pagination]} loop={true}>
                    {relatedAdds?.map((item) => (
                      <SwiperSlide key={item?.id}>
                        <ProductCard data={item} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </>
              )}
            </div>
          </div>
          <div>
            <div className="mb_60">
              <StyledHeading text="RELATED ITEMS" />
            </div>
            <div className="mb_60">
              {loading ? (
                renderSkeleton()
              ) : (
                <>
                  <Swiper {...sliderProp} modules={[Pagination]} loop={true}>
                    {shopAdds?.map((item) => (
                      <SwiperSlide key={item?.id}>
                        <ProductCard data={item} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </>
              )}
            </div>
          </div>
          <ContactSellerModal
            data={productDetails}
            open={openContactSellerModal}
            onClose={handleContactSellerModal}
          />
        </div>
      </section>
    </>
  );
};

export default Page;
