import Image from "next/image";
import Link from "next/link";
import React from "react";
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



const Menu = () => {
  return (
    <div className="menu_wrap">
      <div className="logo_container">
        <Image
          width={140}
          height={60}
          src={"/logo.png"}
          layout="responsive"
          alt="logo"
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
          <Link href={"/post-ad"}>
            <FiPlus /> Post Ads
          </Link>
          <Link href={"/my-devices"}>
            <IoIosShareAlt /> Share Your Referal
          </Link>
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
