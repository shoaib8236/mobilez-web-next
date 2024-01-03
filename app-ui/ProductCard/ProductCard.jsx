'use client'
import React, { useState } from "react";
import StyledButton from "@/app-ui/StyledButton/StyledButton";
import Image from "next/image";
import PropTypes from "prop-types";
import { getImage, getFormattedDate, numberWithCommas } from "@/utils/helper";
import Link from "next/link";
import moment from "moment";
import { HiLocationMarker } from "react-icons/hi";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import api from "@/services/api";
import { notification } from "antd";

const ProductCard = (props) => {
  const { className = "", data = {}, type = "mobile" } = props;

  const [isWishlist, setIsWishlist] = useState(false);
  const [loading , setLoading] = useState(false)

  function getHumanReadableTimeDifference(date) {
    const now = moment();
    const inputDate = moment(date);

    const diffInSeconds = now.diff(inputDate, "seconds");
    const diffInMinutes = now.diff(inputDate, "minutes");
    const diffInHours = now.diff(inputDate, "hours");
    const diffInDays = now.diff(inputDate, "days");
    const diffInMonths = now.diff(inputDate, "months");

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else if (diffInDays < 30) {
      return `${diffInDays} days ago`;
    } else {
      return `${diffInMonths} months ago`;
    }
  }
  var area = data?.user?.area;
  var cityFromArea = area ? area.split(" ").pop() : null;
  const timeDifference = Date.now() - new Date(data?.created_at).getTime();
  const isNew = timeDifference < 24 * 60 * 60 * 1000;



  const onAddIntoWishList = async (id) => {
    try {
      setLoading(true)
      let res = await api.post(`/wishlist/${id}`, {id, product_id:id,});
      if (res?.data?.status) {
        setIsWishlist(true);
        notification.success({
          message: "Success",
          description: "Successfully added into wishlist!",
        });
      }
    } catch (error) {
      if (error?.response?.data?.message === "Unauthenticated.") {
        notification.error({
          message: "Oops",
          description: "Please login first!",
        });
      }
    }
    setLoading(false)

  };

  const onRemoveFromWishlist = async (id) => {
    try {
      setLoading(true)

      let res = await api.post(`remove-wishlist/${id}`);
      if (res?.data?.status) {
        setIsWishlist(false);
        notification.success({
          message: "Success",
          description: "Successfully removed from wishlist!",
        });
      }
    } catch (error) {}
    setLoading(false)

  };

  const handleWishlistClick = (id) => (e) => {
    e.preventDefault();
    if (isWishlist) {
      onRemoveFromWishlist(id);
    } else {
      onAddIntoWishList(id);
    }
  };

  return (
    <Link href={`/product/${data?.id}/${data?.slug}`}>
      <div className={`product_card_wrap ${className}`}>
        <div className="badge_wrapper">
          {data?.feature_add && <div className={`badge primary`}>Featured</div>}
          {data?.sell_status === "Sold" && (
            <div className={`badge danger`}>Sold</div>
          )}
          {isNew && <div className={`badge secondary`}>New</div>}
        </div>
        <div className="image_wrap">
          <div className="wishlist_wrapper">
            <button disabled={loading} onClick={handleWishlistClick(data?.id)}>
              {isWishlist ? <GoHeartFill /> : <GoHeart />}
            </button>
          </div>
          <Image
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
                <h2>{data?.accessories_title}</h2>
              </>
            ) : (
              <>
                <h2>
                  {data?.brand} {data?.model}
                </h2>
              </>
            )}
            <p className="price">PKR - {numberWithCommas(data?.price)}</p>

            {data?.ram || data?.storage ? (
              <p>
                {data?.ram} GB | {data?.storage} GB | {data?.pta_status}
              </p>
            ) : null}
            <div className="flex_between">
              <p className="location">
                <HiLocationMarker />
                {data?.user?.city ? (
                  <span>{data?.user?.city}</span>
                ) : (
                  <span>{cityFromArea}</span>
                )}
              </p>

              <p>
                {getHumanReadableTimeDifference(data?.created_at, "DD MMM")}
              </p>
            </div>
          </div>
          <div className="blog_card_footer"></div>
        </div>
      </div>
    </Link>
  );
};

ProductCard.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object,
};

export default React.memo(ProductCard);
