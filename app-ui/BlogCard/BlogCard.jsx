import React from "react";
import StyledButton from "@/app-ui/StyledButton/StyledButton";
import Image from "next/image";
import PropTypes from "prop-types";

const BlogCard = (props) => {
  const { className = "", data = {} } = props;

  console.log(data);

  return (
    <div className={`blog_card_wrap ${className}`}>
      <div className="image_wrap">
        <Image width={500} height={300} layout="responsive" src="/pixel-8-pro.webp" alt="/pixel-8-pro.webp" />
      </div>
      <div className="card_content">
        <div className="content">
          <h3>{data?.title}</h3>
          <p className="price">Infinix Smart 6: A Budget Smartphone With Certain Shortcomings</p>
          <p className="des">Sketching New Horizons With The Samsung Galaxy A54</p>
        </div>
        <div className="blog_card_footer">
          <StyledButton className="primary with_icon">Read More</StyledButton>
        </div>
      </div>
    </div>
  );
};

BlogCard.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object,
};

export default React.memo(BlogCard);
