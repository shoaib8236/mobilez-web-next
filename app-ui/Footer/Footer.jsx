import React from "react";
import { Col, Divider, Row } from "antd";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { IoLogoLinkedin } from "react-icons/io5";
import { BiLogoTiktok } from "react-icons/bi";
import Image from "next/image";

const Footer = (props) => {
  const {} = props;
  return (
    <div className="footer">
      <div className="content_wrap">
        <Row>
          <Col className="gutter-row" lg={7} md={7} sm={24}>
            <Image src="/logo.png" alt="logo" width={180} height={80} />
            <p>
              Pakistan's # 1 Web Portal for <br /> Mobile Phones, Tablets &
              Smart Watches .
            </p>
            <div className="footer_icons_main">
              <FaFacebook />
              <RiInstagramFill />
              <IoLogoLinkedin />
              <BiLogoTiktok />
              <FaYoutube />
            </div>
          </Col>
          <Col className="gutter-row" lg={7} md={7} sm={24}>
            <div>
              <h4>Useful Links</h4>
              <ul>
                <li>Home</li>
                <li>Find Me a Device</li>
                <li>About Us</li>
                <li>Careers</li>
                <li>Blog</li>
                <li>Contact Us</li>
              </ul>
            </div>
          </Col>
          <Col className="gutter-row" lg={10} md={10} sm={24}>
            <div>
              <h4>About</h4>
              <ul>
                <li>Privacy</li>
                <li>Terms & Conditions</li>
              </ul>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default React.memo(Footer);
