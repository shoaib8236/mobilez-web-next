"use client";

import StyledButton from "@/app-ui/StyledButton/StyledButton";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import api from "@/services/api";

import { IoClose } from "react-icons/io5";
import { getImage } from "@/utils/helper";
import { useRouter } from "next/navigation";

const Page = () => {
  const [wishlist, setWishlist] = useState([]);
  const [removeLoading, serRemoveLoading] = useState(null);

  const router = useRouter();

  const getMyWishList = async () => {
    try {
      let res = await api.get("/my-wishlist");
      if (res?.data?.status) {
        setWishlist(res?.data?.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getMyWishList();
  }, []);

  const onRouteToProduct = (slug, id) => () => {
    router.push(`/product/${id}/${slug}`);
  };

  const onRemoveFromWishlist = (id) => async () => {
    try {
      serRemoveLoading(id);
      let res = await api.post(`remove-wishlist/${id}`);

      if (res?.data?.status) {
        serRemoveLoading(null);

        setWishlist((prev) => prev.filter((item) => item?.id !== id));
      }
    } catch (error) {}
  };

  return (
    <div className="wishlist">
      <div className="styled_table">
        <div className="th">
          <div className="td">Image</div>
          <div className="td">Product Name</div>

          <div className="td">Unit Price</div>
          <div className="td">Action</div>
          <div className="td">Remove</div>
        </div>
        {wishlist.map((item, i) => (
          <div key={i} className="tr">
            <div className="td product_image">
              <Image
                src={getImage(item?.image?.img)}
                alt="phone"
                width={100}
                height={100}
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="td">
              {item?.category === "Accessories"
                ? item?.accessories_title
                : `${item?.brand} ${item?.model}`}
            </div>

            <div className="td">{item?.price}Rs</div>
            <div className="td">
              <StyledButton
                onClick={onRouteToProduct(item?.slug, item?.id)}
                className="light"
              >
                View Product
              </StyledButton>
            </div>
            <div className="td">
              <StyledButton
                onClick={onRemoveFromWishlist(item?.id)}
                loading={removeLoading === item?.id}
                className="light icon_style md"
              >
                <IoClose />
              </StyledButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
