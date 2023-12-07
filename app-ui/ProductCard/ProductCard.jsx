import React from "react";
import StyledButton from "@/app-ui/StyledButton/StyledButton";
import Image from "next/image";
import PropTypes from "prop-types";
import { getImage, getFormattedDate } from "@/utils/helper";
import Link from "next/link";

const ProductCard = (props) => {
  const { className = "", data = {}, type = "mobile" } = props;

  return (
    <div className={`product_card_wrap ${className}`}>
      <div className="image_wrap">
        <Image
          loading="lazy"
          fill
          objectFit="cover"
         
          src={getImage(data?.image?.img)}
          alt={data?.image?.img}
        />
      </div>
      <div className="card_content">
        <div>
          {data?.accessories_title ? (
            <>
              <h3>{data?.accessories_title}</h3>
            </>
          ) : (
            <>
              <h3>
                {data?.brand} {data?.model}
              </h3>
            </>
          )}
          <p className="price">PKR - {data?.price}</p>
          {data?.ram || data?.storage ? (
            <p>
              {data?.ram} GB | {data?.storage} GB | {data?.pta_status}
            </p>
          ) : null}
          <div className="blog_card_area">
            <p>{data?.user?.city}</p>
            <p>{getFormattedDate(data?.created_at, "DD MMM")}</p>
          </div>
        </div>
        <div className="blog_card_footer">
          <Link href={`/product/${data?.id}/${data?.slug}`}>
            <StyledButton className="light_primary sm with_icon">Read More</StyledButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object,
};

export default React.memo(ProductCard);
