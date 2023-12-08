"use client";

import { useAuthCheck, useFcmToken } from "@/utils/hooks";
import React, { useEffect, useState } from "react";
import firebaseApp from "@/firebase/firebase";
import { getMessaging, onMessage } from "firebase/messaging";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { usePathname } from "next/navigation";
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

  return (
    <>
      <Navbar userData={userData} />
      {children}
      <Footer />
    </>
  );
};

export default RootLayer;
