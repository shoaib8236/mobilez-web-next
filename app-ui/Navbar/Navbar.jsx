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

const Navbar = ({ userData }) => {
  const menuRef = useRef(null);
  const linkRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState(null);
  const { authCheck } = useAuthCheck();

  useEffect(() => {
    let getUser = JSON.parse(localStorage.getItem("@user"));
    if (getUser) {
      setUser(getUser);
    }
  }, []);

  const onOpenMobileMenu = useCallback(() => {
    if (menuRef.current && linkRef.current) {
      if (menuRef.current.classList.contains("open_menu")) {
        menuRef.current.classList.remove("open_menu");
        linkRef.current.classList.remove("animate_links");
      } else {
        menuRef.current.classList.add("open_menu");
        linkRef.current.classList.add("animate_links");
      }
    }
  }, [menuRef, linkRef]);

  useEffect(() => {
    if (menuRef.current && linkRef.current) {
      if (menuRef.current.classList.contains("open_menu")) {
        menuRef.current.classList.remove("open_menu");
        linkRef.current.classList.remove("animate_links");
      }
    }
  }, [pathname, menuRef, linkRef]);

  const onLogin = () => {
    router.push("/login");
  };

  const onRegister = () => {
    router.push("/signup");
  };

  const onPushToDashboard = (endPoint) => () => {
    window.open(`https://www.mobilezmarket.com/${endPoint}`);
  };

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

  return (
    <nav className="nav_wrapper">
      <div className="nav_content">
        <div className="logo">
          <Image src="/logo.png" alt="logo" fill objectFit="contain" />
        </div>
        <div ref={menuRef} className="links_container">
          <ul ref={linkRef}>
            <li>
              <Link href="/">Home</Link>
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
          <div className="search_container">
            {userData ? (
              <Dropdown
                menu={{
                  items,
                }}
                arrow
              >
                <div className="user_dropdown hide_sm">
                  <Avatar url={getImage(userData?.photo)} className={"sm"} />{" "}
                  <span>{userData?.name}</span> <AiFillCaretDown />
                </div>
              </Dropdown>
            ) : (
              <>
                <StyledButton onClick={onLogin} className="login_btn light">
                  Sign in
                </StyledButton>
                <StyledButton
                  onClick={onRegister}
                  className="register_btn primary"
                >
                  Register
                </StyledButton>
              </>
            )}
          </div>
        </div>
        <div className="mobile_actions">
          {userData && (
            <Dropdown
              menu={{
                items,
              }}
              arrow
            >
              <div className="user_dropdown">
                <Avatar url={getImage(userData?.photo)} className={"sm"} />{" "}
                <span>{userData?.name}</span> <AiFillCaretDown />
              </div>
            </Dropdown>
          )}
          <StyledButton onClick={onOpenMobileMenu} className="nav_open_btn">
            <VscMenu />
          </StyledButton>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
