import StyledButton from "@/app-ui/StyledButton/StyledButton";
import Image from "next/image";
import React from "react";
import { IoClose } from "react-icons/io5";

const Page = () => {
  return (
    <div className="wishlist">
      <div className="styled_table">
        <div className="th">
          <div className="td">Image</div>
          <div className="td">Product Name</div>
          <div className="td">Product Name</div>
          <div className="td">Unit Price</div>
          <div className="td">Action</div>
          <div className="td">Remove</div>
        </div>
        <div className="tr">
          <div className="td product_image">
            <Image
              src="https://www.mobilezmarket.com/images/1701351053_rn_image_picker_lib_temp_4253f31d-b178-44cd-acb5-5414fe76eeb8.webp"
              alt="phone"
              width={100}
              height={100}
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="td">Product Name</div>
          <div className="td">Product Name</div>
          <div className="td">Unit Price</div>
          <div className="td">
            <StyledButton className="light">View Product</StyledButton>
          </div>
          <div className="td">
            <StyledButton className="light icon_style md">
              <IoClose />
            </StyledButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
