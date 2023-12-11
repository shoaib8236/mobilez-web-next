"use client";

import { getImage, logout } from "@/utils/helper";
import { useAuthCheck } from "@/utils/hooks";
import { Dropdown } from "antd";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AiFillCaretDown, AiOutlineMenuFold } from "react-icons/ai";
import { VscMenu } from "react-icons/vsc";
import Avatar from "../Avatar/Avatar";
import StyledButton from "../StyledButton/StyledButton";
import { BiSearch } from "react-icons/bi";
import TypingAnimation from "../TypingAnimation/TypingAnimation";
import { FiMenu } from "react-icons/fi";

const Navbar = ({ userData }) => {
  const menuRef = useRef(null);

  const pathname = usePathname();
  const router = useRouter();

  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [search, setSearch] = useState("");

  const [user, setUser] = useState(null);
  const { authCheck } = useAuthCheck();

  useEffect(() => {
    let getUser = JSON.parse(localStorage.getItem("@user"));
    if (getUser) {
      setUser(getUser);
    }
  }, []);

  const onOpenMobileMenu = useCallback(() => {
    if (menuRef.current) {
      if (menuRef.current.classList.contains("open_menu")) {
        menuRef.current.classList.remove("open_menu");
      } else {
        menuRef.current.classList.add("open_menu");
      }
    }
  }, [menuRef]);

  useEffect(() => {
    if (menuRef.current) {
      if (menuRef.current.classList.contains("open_menu")) {
        menuRef.current.classList.remove("open_menu");
      }
    }
  }, [pathname, menuRef]);

  const onLogin = () => {
    router.push("/login");
  };

  const onRegister = () => {
    router.push("/signup");
  };

  const onPushToDashboard = (endPoint) => () => {
    window.open(`https://www.mobilezmarket.com/${endPoint}`);
  };

  const onPost = () => {};

  const items = [
    {
      key: "1",
      label: (
        <>
          <span onClick={onPushToDashboard("mydevices")}>Dashboard</span>
        </>
      ),
    },
    {
      key: "2",
      label: (
        <>
          <span onClick={onPushToDashboard("edit-profile")}>
            Profile Setting
          </span>
        </>
      ),
    },
    {
      key: "3",
      label: (
        <>
          <span onClick={onPushToDashboard("wishlist")}>Wishlist</span>
        </>
      ),
    },
    {
      key: "4",
      label: (
        <>
          <span onClick={onPushToDashboard("add-mobile")}>Post Add</span>
        </>
      ),
    },
    {
      key: "5",
      label: (
        <>
          <span onClick={onPushToDashboard("chat")}>Chat</span>
        </>
      ),
    },
    {
      key: "6",
      label: (
        <>
          <span onClick={logout}>Sign out</span>
        </>
      ),
    },
  ];

  const placeholderTexts = [
    " mobile devices",
    " smart watches",
    " accessories",
  ];

  const handlePlaceHolder = () => {
    setShowPlaceholder(false);
  };

  const onBlurInput = () => {
    setShowPlaceholder(true);
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    if (value) {
      setSearch(value);
    } else {
      setSearch(null);
    }
  };

  return (
    <nav className="nav_wrapper">
      <div className="nav_header">
        <div className="logo">
          <Image src="/logo.png" alt="logo" fill objectFit="contain" />
        </div>
        <div className="header_action_container">
          <div className="search_container">
            <input
              onChange={handleSearch}
              onClick={handlePlaceHolder}
              onBlur={onBlurInput}
              type="text"
            />
            {showPlaceholder && !search ? (
              <div className="search_placeholder">
                Search for{" "}
                <TypingAnimation
                  texts={placeholderTexts}
                  speed={100}
                  delay={1500}
                />
              </div>
            ) : null}
            <BiSearch />
          </div>
          <StyledButton onClick={onOpenMobileMenu} className="menu_btn">
            <FiMenu />
          </StyledButton>
        </div>
      </div>
      <div className="nav_links">
        <ul ref={menuRef}>
          <li>
            <Link className="active" href="/">
              Home
            </Link>
          </li>
          <li>
            <Link href="/devices">Find my device</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/blogs">Blogs</Link>
          </li>
          <li>
            <Link href="/videos">Videos</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <li>
            <Link href="/careers">Careers</Link>
          </li>
        </ul>
        <div className="login_section">
          {userData ? (
            <Dropdown
              menu={{
                items,
              }}
              arrow
            >
              <div className="user_dropdown">
                <span>{userData?.name}</span> <AiFillCaretDown />
              </div>
            </Dropdown>
          ) : (
            <>
              <StyledButton onClick={onLogin} className="light">
                Login
              </StyledButton>
            </>
          )}

          <StyledButton onClick={onPost} className="secondary_light sm">
            Post an Ad
          </StyledButton>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
