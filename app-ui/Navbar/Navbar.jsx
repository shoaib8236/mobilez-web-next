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
import api from "@/services/api";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Navbar = ({ userData }) => {
  const menuRef = useRef(null);

  const pathname = usePathname();
  const router = useRouter();

  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState(null);
  const { authCheck } = useAuthCheck();

  useEffect(() => {
    let getUser = JSON.parse(localStorage.getItem("@user"));
    if (getUser) {
      setUser(getUser);
    }
  }, []);

  let getSearchSuggestions = async (search) => {
    try {
      setLoading(true);

      const response = await api.post("/search", { search });

      if (response?.data?.status && search?.length > 0) {
        setSearchData(response?.data?.search_data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading && !search?.length) {
      setSearchData([]);
    }
  }, [search, loading]);

  useEffect(() => {
    let timer = setTimeout(() => {
      if (search?.length > 2) {
        getSearchSuggestions(search);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  const handlePlaceHolder = () => {
    setShowPlaceholder(false);
  };
  const onBlurInput = () => {
    setShowPlaceholder(true);

    let timer = setTimeout(() => {
      setSearchData([]);
    }, 300);

    return clearTimeout(timer);
  };

  const handleSearch = (e) => {
    const { value } = e.target;

    setSearch(value);

  };

  const submitSearch = (e) => {
    if (e.which === 13) {
      let payload = {
        search: e.target.value,
      };
      setSearchData([]);
      setSearch("");
      let url = new URL(window.location.href);
      let params = new URLSearchParams(url.search);
      Object.entries(payload).forEach(([key, value]) => {
        if (value !== undefined) {
          params.set(key, value);
        }
      });
      url.search = params.toString();
      router.push("/devices" + url.search);
    }
  };

  const onSearch = (data) => () => {
    let payload = {
      search: data?.accessories_title
        ? data?.accessories_title
        : `${data?.brand} ${data?.model}`,
    };
    setSearchData([]);
    setSearch("");
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);
    Object.entries(payload).forEach(([key, value]) => {
      if (value !== undefined) {
        params.set(key, value);
      }
    });
    url.search = params.toString();
    router.push("/devices" + url.search);
  };

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
    router.push(`/${endPoint}`);
  };

  const onPost = () => {
    router.push(`/post-ad?type=mobile`);
  };

  const items = [
    {
      key: "1",
      label: (
        <>
          <span onClick={onPushToDashboard("my-devices")}>Dashboard</span>
        </>
      ),
    },
    {
      key: "2",
      label: (
        <>
          <span onClick={onPushToDashboard("profile-setting")}>
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
          <span onClick={onPushToDashboard("post-ad?type=mobile")}>Post Ad</span>
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
    " tablets",
  ];



  return (
    <nav className="nav_wrapper">
      <div className="nav_header">
        <div className="logo">
          <Image src="/logo.png" alt="logo" fill objectFit="contain" />
        </div>
        <div className="header_action_container">
          <div className="search_container">
            <input
              value={search}
              onChange={handleSearch}
              onClick={handlePlaceHolder}
              onKeyDown={submitSearch}
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
            {loading ? (
              <AiOutlineLoading3Quarters className="search_loading" />
            ) : (
              <BiSearch />
            )}

            <div className="search_result_dropdown">
              {searchData?.map((item, i) => (
                <div key={i} className="search_result">
                  <button onClick={onSearch(item)}>
                    {item?.accessories_title ? (
                      <>{item?.accessories_title}</>
                    ) : (
                      <>
                        {item?.brand} {item?.model}
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
          <StyledButton onClick={onOpenMobileMenu} className="menu_btn">
            <FiMenu />
          </StyledButton>
        </div>
      </div>
      <div className="nav_links">
        <ul ref={menuRef}>
          <li>
            <Link className={`${pathname === "/" ? "active" : ""}`} href="/">
              Home
            </Link>
          </li>
          <li>
            <Link
              className={`${pathname.includes("/devices") ? "active" : ""}`}
              href="/devices"
            >
              Find my device
            </Link>
          </li>
          <li>
            <Link
              className={`${pathname === "/about" ? "active" : ""}`}
              href="/about"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              className={`${pathname.includes("/blogs") ? "active" : ""}`}
              href="/blogs"
            >
              Blogs
            </Link>
          </li>
          <li>
            <Link
              className={`${pathname === "/videos" ? "active" : ""}`}
              href="/videos"
            >
              Videos
            </Link>
          </li>
          <li>
            <Link
              className={`${pathname === "/contact" ? "active" : ""}`}
              href="/contact"
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              className={`${pathname === "/careers" ? "active" : ""}`}
              href="/careers"
            >
              Careers
            </Link>
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
                <Image height={50} width={50} src={userData?.photo} alt="user" />
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

          {userData ? (
            <>
              <StyledButton onClick={onPost} className="secondary_light sm">
                Post an Ad
              </StyledButton>
            </>
          ) : (
            <>
              <StyledButton onClick={onRegister} className="secondary_light sm">
                Sign Up
              </StyledButton>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
