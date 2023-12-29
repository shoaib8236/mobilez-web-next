"use client";

import { useAuthCheck, useFcmToken } from "@/utils/hooks";
import React, { useEffect, useState } from "react";
import firebaseApp from "@/firebase/firebase";
import { getMessaging, onMessage } from "firebase/messaging";
import Navbar from "../Navbar/Navbar";
import DashboardHeader from "../DashboardHeader/DashboardHeader";
import Footer from "../Footer/Footer";
import { usePathname } from "next/navigation";
import Menu from "../Menu/Menu";
const RootLayer = ({ children }) => {
  const { fcmToken, notificationPermissionStatus } = useFcmToken();
  const { authCheck } = useAuthCheck();
  const [userData, setUserData] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    if (fcmToken) {
      localStorage.setItem("@fcm_token", fcmToken);
    }
  }, [fcmToken]);

  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      const messaging = getMessaging(firebaseApp);
      const unsubscribe = onMessage(messaging, (payload) => {
        // console.log("Foreground push notification received:", payload);
      });
      return () => {
        unsubscribe();
      };
    }
  }, []);

  useEffect(() => {
    let getUserData = JSON.parse(localStorage.getItem("@user"));
    if (getUserData) {
      setUserData(getUserData);
    }
  }, [pathname]);

  let dashboardRoutes = ["/my-devices", "/how-it-works", '/my-progress', '/manage-account', '/wishlist', '/profile-setting', '/winning-participation', '/post-ad']

  return (
    <div className={`${dashboardRoutes.includes(pathname) ? '_dashboard' : '_web'}`}>
      {dashboardRoutes.includes(pathname) ? (
        <Menu />
      ) : (
        <Navbar userData={userData} />
      )}

      {dashboardRoutes.includes(pathname) ? (
       <div>
        <DashboardHeader userData={userData} />
       {children}
       </div>
      ) : (
        children
      )}
      
      

      {dashboardRoutes.includes(pathname) !== true && <Footer />}
    </div>
  );
};

export default RootLayer;
