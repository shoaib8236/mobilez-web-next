import StyledButton from "@/app-ui/StyledButton/StyledButton";
import React from "react";

const Page = () => {
  return (
    <div>
      <StyledButton className="primary">Click me</StyledButton>
      <StyledButton className="secondary">Click me</StyledButton>
      <StyledButton className="danger">Click me</StyledButton>
      <StyledButton className="info">Click me</StyledButton>
      <StyledButton className="warning">Click me</StyledButton>
      <StyledButton className="success">Click me</StyledButton>
    </div>
  );
};

export default Page;
