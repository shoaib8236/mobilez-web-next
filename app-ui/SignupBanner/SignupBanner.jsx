import { Input } from "antd";
import React from "react";
import StyledButton from "../StyledButton/StyledButton";

const SignupBanner = () => {
  return (
    <div className="signup_banner">
      <div className="content_wrap">
        <div>
          <h1 className="text_light text_center">
            Sign up for the latest updates
          </h1>
        </div>
        <div>
          <div className="styled_input">
            <Input placeholder="Enter your email" />{" "}
            <StyledButton className="light w_max_content">
              Subscribe
            </StyledButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupBanner;
