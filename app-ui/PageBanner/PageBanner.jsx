import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

const PageBanner = (props) => {
  const {
    title = "",
    currentPage = "",
    imageUrl = "",
    noContent = false,
  } = props;

  return (
    <div className="styled_page_banner">
      <div className="content_wrap">
        <img
          className="banner_image_wrap"
          src="/page-banner.webp"
          alt="banner-image"
        />
        <div className="banner_overlay"></div>
        {!noContent && (
          <div className="banner_content">
            <h1>{title}</h1>
            <div className="breadcrumb">
              <Link href={"/"}>Home</Link> <span>/</span>{" "}
              <Link href={"/"} className="active">
                {currentPage ? currentPage : title}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

PageBanner.propTypes = {
  title: PropTypes.string,
  currentPage: PropTypes.string,
  imageUrl: PropTypes.string,
  noContent: PropTypes.bool,
};

export default PageBanner;
