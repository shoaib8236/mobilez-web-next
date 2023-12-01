import React from "react";
import StyledButton from "@/app-ui/StyledButton/StyledButton";
import Image from "next/image";
import PropTypes from "prop-types";
import { getImage } from "@/utils/helper";
import Link from "next/link";

const BlogCard = (props) => {
  const { className = "", data = {}, onClick = () => {} } = props;

  return (
    <div className={`blog_card_wrap ${className}`}>
      <div className="image_wrap">
        <Image
          loading="lazy"
          fill
          objectFit="cover"
          objectPosition="top"
          src={getImage(data?.image)}
          alt="/pixel-8-pro.webp"
        />
      </div>
      <div className="card_content">
        <div className="content">
          <h3 className="text_primary">{data?.title}</h3>
          <p
            className="desc"
            dangerouslySetInnerHTML={{ __html: data?.description }}
          />
        </div>
        <div className="blog_card_footer">
          <Link href={{ pathname: `/blogs/${data?.slug}` }}>
            <StyledButton onClick={onClick} className="primary with_icon">
              Read More
            </StyledButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

BlogCard.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object,
  onClick: PropTypes.func,
};

export default React.memo(BlogCard);
