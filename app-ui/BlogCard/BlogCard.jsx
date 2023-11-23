import React from "react";
import StyledButton from '@/app-ui/StyledButton/StyledButton';

const BlogCard = (props) => {
  const {} = props;

  return <section>
    <div className="content_wrap">
      <div className="card">
        <div>
          <img className="w_100" src="https://www.mobilezmarket.com/images/1700754314_C23D0222-B2CC-40E9-9760-5CE9289AB6E4.webp" alt="image" />
        </div>
        <div className="card_content">
          <h3>Oneplus  Oneplus 8</h3>
          <p className="price">PKR - 59999</p>
          <p>8 GB | 128 GB | Approved</p>
          <div className="blog_card_area">
            <p>Karachi</p>
            <p>23 - Nov</p>
          </div>
          <StyledButton className="primary with_icon">
                Read More
          </StyledButton>
        </div>

      </div>
    </div>
  </section>;
};

export default BlogCard;
