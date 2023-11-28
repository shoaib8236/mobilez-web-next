import React from "react";
import StyledButton from "@/app-ui/StyledButton/StyledButton";
import Image from "next/image";
import PropTypes from "prop-types";
import { getImage, getFormattedDate } from "@/utils/helper";

const ProductCard = (props) => {
  const { className = "", data = {} } = props;

  return (
    <div className={`product_card_wrap ${className}`}>
      <div className="image_wrap">
        <Image
          width={500}
          height={300}
          layout="responsive"
          src={getImage(data?.image?.img)}
          alt={data?.image?.img}
        />
      </div>
      <div className="card_content">
        <h3>{data?.title}</h3>
        <p className="price">PKR - {data?.price}</p>
        <p>{data?.ram} GB | {data?.storage} GB | {data?.pta_status}</p>
        <div className="blog_card_area">
          <p>{data?.user?.city}</p>
          <p>{getFormattedDate(data?.created_at, 'DD MMM')}</p>
        </div>
        <StyledButton className="primary with_icon">Read More</StyledButton>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object,
};

export default React.memo(ProductCard);
