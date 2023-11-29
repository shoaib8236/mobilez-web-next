"use client";

import ImagesGallery from "@/app-ui/ImagesGallery/ImagesGallery";
import StyledButton from "@/app-ui/StyledButton/StyledButton";
import api from "@/services/api";
import { getFormattedDate, getImage } from "@/utils/helper";
import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";

const Page = ({ params: { slug } }) => {
  const [productDetails, setProductDetails] = useState(null);

  const getProductsDetails = async () => {
    let fcmToken = localStorage.getItem("@fcm_token");

    const body = {
      device_token: fcmToken,
    };

    try {
      let res = await api.get(`/details/${slug[0]}/${slug[1]}`, {
        params: body,
      });
      if (res?.data?.status) {
        setProductDetails(res?.data?.details);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getProductsDetails();
  }, []);
  const productImages = productDetails?.productimages.map((item) => ({
    original: getImage(item?.img),
    thumbnail: getImage(item?.img),
  }));

  return (
    <>
      <section>
        <div className="content_wrap">
          <Row gutter={[14, 14]}>
            <Col lg={12} md={12} sm={24} xs={24}>
              <div>
                {/* <img
                  className="detail_image"
                  src="https://www.mobilezmarket.com/images/1701098420_A516D43C-8415-4CA6-A53F-0356653054B4.webp"
                  alt=""
                /> */}
                <ImagesGallery images={productImages || []} />
              </div>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <div className="detail_content">
                <h1>{productDetails?.brand}</h1>
                <h1 className="text_secondary">Rs: {productDetails?.price}</h1>
                <hr />
                <p>
                  <span className="text_secondary">Posted By:</span> &nbsp;
                  {productDetails?.user.name}
                </p>
                <p>
                  <span className="text_secondary">Posted At:</span> &nbsp;
                  {getFormattedDate(productDetails?.created_at)}
                </p>
                <h3 className="posted_heading">
                  Posted By :{" "}
                  <span className="text_secondary blinking_text">
                    {productDetails?.user.name}
                  </span>
                </h3>
                <div className="details_btn">
                  <StyledButton className="primary">
                    Contact Seller
                  </StyledButton>
                  <StyledButton className="secondary">
                    Chat With Seller
                  </StyledButton>
                </div>
                <h3 className="specs_heading">Specifications:</h3>
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
                <h3 className="desc_heading">Description:</h3>
                <p>{productDetails?.description}</p>
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

          <div></div>
        </div>
      </section>
    </>
  );
};

export default Page;
