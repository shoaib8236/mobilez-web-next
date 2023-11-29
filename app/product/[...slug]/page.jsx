"use client";

import StyledButton from "@/app-ui/StyledButton/StyledButton";
import api from "@/services/api";
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


  return (
    <>
      <section>
        <div className="content_wrap">
          <Row gutter={[14, 14]}>
            <Col lg={12} md={12} sm={24} xs={24}>
              <div>
                <img
                  className="detail_image"
                  src="https://www.mobilezmarket.com/images/1701098420_A516D43C-8415-4CA6-A53F-0356653054B4.webp"
                  alt=""
                />
              </div>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <div className="detail_content">
                <h1>Apple Iphone 15</h1>
                <h1 className="text_secondary">Rs: 379,999</h1>
                <hr />
                <p>
                  <span className="text_secondary">Posted By:</span>{" "}
                  &nbsp;Muhammad Hasnain
                </p>
                <p>
                  <span className="text_secondary">Posted At:</span>{" "}
                  &nbsp;27-Nov-2023
                </p>
                <h3 className="posted_heading">
                  Posted By :{" "}
                  <span className="text_secondary blinking_text">
                    Muhammad Hasnain
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
                    <span>RAM:</span> 6 GB
                  </div>
                  <div>
                    <span>Storage:</span> 128 GB
                  </div>
                  <div>
                    <span>PTA Status:</span> Not Approved
                  </div>
                  <div>
                    <span>Warranty:</span> 12 Months
                  </div>
                  <div>
                    <span>Product Condition:</span> New
                  </div>
                </div>
                <h3 className="desc_heading">Description:</h3>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Omnis rerum, doloribus neque natus quasi error possimus
                  dolorem. neque natus quasi error possimus dolorem.
                </p>
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
