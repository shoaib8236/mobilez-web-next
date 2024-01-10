"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { IoHome } from "react-icons/io5";
import { RiAdvertisementFill } from "react-icons/ri";
import { FiPlus } from "react-icons/fi";
import { IoIosShareAlt } from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";
import { IoHeartOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { BsChatDots } from "react-icons/bs";
import { FaListCheck } from "react-icons/fa6";
import { IoGiftSharp } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa6";
import { IoCopy } from "react-icons/io5";
import { notification } from "antd";

const Menu = () => {
  const [openDropDown, setOpenDropDown] = useState(false);

  const onOpenDropDown = (e) => {
    e.preventDefault();
    setOpenDropDown(!openDropDown);
  };

  const openWhatsApp = (e) => {
    e.preventDefault();
    const whatsappUrl = `https://api.whatsapp.com/send?text=3333`;
    window.open(whatsappUrl, "_blank");
  };

  const openFacebookShare = (e) => {
    e.preventDefault();
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=2222`;
    window.open(facebookShareUrl, "_blank");
  };

  const copyLinkToClipboard = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText("2222");
    notification.success({ message: "Link copied to clipboard!" });
  };

  return (
    <div className="menu_wrap">
      <div className="logo_container">
        <Image
          src={"/logo.png"}
          alt="logo"
          width={200}
          height={100}
          layout="responsive"
        />
      </div>
      <div className="menu_scroll_container">
        <div className="menu_links">
          <Link href={"/"}>
            <IoHome /> Go to Website
          </Link>
          <Link href={"/my-devices"}>
            <RiAdvertisementFill /> My Ads
          </Link>
          <Link href={"/post-ad?type=mobile"}>
            <FiPlus /> Post Ads
          </Link>
          <Link onClick={onOpenDropDown} href={"/"}>
            <IoIosShareAlt /> Share Your Referal
          </Link>
          {openDropDown && (
            <div className="drop_down">
              <Link onClick={openFacebookShare} href={"/"}>
                <FaFacebookF />
                Facebook
              </Link>
              <Link onClick={openWhatsApp} href={"/"}>
                <FaWhatsapp />
                Whatsapp
              </Link>
              <Link onClick={copyLinkToClipboard} href={"/"}>
                <IoCopy />
                Copy Referal Code
              </Link>
            </div>
          )}
          <Link href={"/my-devices"}>
            <AiOutlineUser /> Manage Your Account
          </Link>
          <Link href={"/winning-participation"}>
            <IoGiftSharp /> Winning Participation
          </Link>
          <Link href={"/how-it-works"}>
            <RiAdvertisementFill /> How it Works
          </Link>
          <Link href={"/my-progress"}>
            <FaListCheck /> My Progress
          </Link>
          <Link href={"/wishlist"}>
            <IoHeartOutline /> Wishlist
          </Link>
          <Link href={"/profile-setting"}>
            <IoSettingsOutline /> Profile Setting
          </Link>
          <Link href={"/my-progress"}>
            <BsChatDots /> Chat
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Menu;
