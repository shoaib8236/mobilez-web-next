import PageBanner from "@/app-ui/PageBanner/PageBanner";
import ProductCard from "@/app-ui/ProductCard/ProductCard";
import StyledButton from "@/app-ui/StyledButton/StyledButton";
import React from "react";

const Page = () => {
  return (
    <div className="about_wrap">
      <PageBanner title="About Us" currentPage="about" />
    </div>
  );
};

export default Page;
