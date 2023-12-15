import { useDeviceDetect } from "@/utils/hooks";
import { Col, Row } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import QRCode from "react-qr-code";

const Footer = (props) => {
  const {} = props;

  // const {isWindows, isMac} = useDeviceDetect()

  // console.log(isWindows, isMac);

  return (
    <div className="footer">
      <div className="content_wrap">
        <Row>
          <Col className="footer_cells" lg={8} md={8} sm={24} xs={24}>
            <Image src="/logo.png" alt="logo" width={180} height={80} />
            <div>
              <p>
                Pakistan's # 1 Web Portal for <br /> Mobile Phones, Tablets &
                Smart Watches .
              </p>
            </div>
          </Col>
          <Col className="footer_cells" lg={8} md={8} sm={24} xs={24}>
            <div>
              <h3 className="text_primary">Useful Links</h3>
              <ul>
                <li>
                  <Link href="/"> Home</Link>
                </li>
                <li>
                  <Link href="/"> Find Me a Device</Link>
                </li>
                <li>
                  <Link href="/"> About Us</Link>
                </li>
                <li>
                  <Link href="/"> Careers</Link>
                </li>
                <li>
                  <Link href="/"> Blog</Link>
                </li>
                <li>
                  <Link href="/"> Contact Us</Link>
                </li>
              </ul>
            </div>
          </Col>
          <Col className="footer_cells" lg={8} md={8} sm={24} xs={24}>
            <div>
              <h3 className="text_primary">About</h3>
              <ul>
                <li>
                  <Link href="/"> Privacy</Link>
                </li>
                <li>
                  <Link href="/"> Terms & Conditions</Link>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default React.memo(Footer);
