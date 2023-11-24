'use client'

import React, { useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import  StyledButton  from "../StyledButton/StyledButton";
import { AiOutlineMenu } from "react-icons/ai";
import {  usePathname } from "next/navigation";


const Navbar = (props) => {

  const menuRef = useRef(null)
  const linkRef = useRef(null)
  const pathname = usePathname()
  
  const onOpenMobileMenu = useCallback(() => {
    if (menuRef.current && linkRef.current) {
      if (menuRef.current.classList.contains("open_menu")) {
        menuRef.current.classList.remove("open_menu")
        linkRef.current.classList.remove("animate_links")
      } else {
        menuRef.current.classList.add("open_menu")
        linkRef.current.classList.add("animate_links")
      }
    }
  }, [menuRef, linkRef])


  useEffect(()=> {

    if (menuRef.current && linkRef.current) {
      if (menuRef.current.classList.contains("open_menu")) {
        menuRef.current.classList.remove("open_menu")
        linkRef.current.classList.remove("animate_links")
      } 
    }

  }, [pathname, menuRef, linkRef])

  return (
    <nav className="nav_wrapper">
      <div className="nav_content">
        <div className="logo">
        <Image src="/logo.png" alt="logo" width={140} height={62} />
        </div>
        <div ref={menuRef} className="links_container">
          <ul ref={linkRef}>
           
           <li><Link href="/">Home</Link></li>
           <li><Link href="/about">About</Link></li>
           <li><Link href="/blogs">Blogs</Link></li>
           <li><Link href="/careers">Careers</Link></li>
          </ul>
          <div className="search_container">
            {/* <StyledSearch />  */}
            <StyledButton className="login_btn primary">Login</StyledButton>
            <StyledButton className="register_btn secondary">Register</StyledButton>
          </div>
        </div>
        <div className="mobile_actions"> <StyledButton onClick={onOpenMobileMenu} className="nav_open_btn"><AiOutlineMenu /></StyledButton> </div>
      </div>
    </nav>
  );
};

export default Navbar;