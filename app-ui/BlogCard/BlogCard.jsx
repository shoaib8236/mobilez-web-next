import React from "react";
import StyledButton from "@/app-ui/StyledButton/StyledButton";
import Image from "next/image";
import PropTypes from "prop-types";
import { getImage } from "@/utils/helper";

const BlogCard = (props) => {
  const { className = "", data = {} } = props;

  console.log(data);

  return (
    <div className={`blog_card_wrap ${className}`}>
      <div className="image_wrap">
        <Image
          loading="lazy"
          width={500}
          height={300}
          objectFit="cover"
          layout="responsive"
          src={getImage(data?.image)}
          alt="/pixel-8-pro.webp"
        />
      </div>
      <div className="card_content">
        <div className="content">
          <h3 className="text_secondary">{data?.title}</h3>
          <p
            className="desc"
            dangerouslySetInnerHTML={{ __html: data?.description }}
          />
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
