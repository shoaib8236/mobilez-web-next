"use client";

import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import { useGoogleLogin } from "@react-oauth/google";

const LoginWithGoogle = () => {
  const router = useRouter();
  const [socialLoginLoading, setSocialLoginLoading] = useState(false);

  const getUserData = async () => {
    try {
      let res = await api.get("/profile");
      if (res?.data?.status) {
        setSocialLoginLoading(false);
        localStorage.setItem("@user", JSON.stringify(res?.data?.profile));
        router.push("/");
      }
    } catch (error) {
      setSocialLoginLoading(false);
      notification.error({ message: error?.response?.data?.message });
    }
  };

  const onGoogleLogin = async (res) => {
    const resDecode = jwtDecode(res?.credential);
    console.log(resDecode);
    let payload = {
      name: resDecode?.name,
      id: resDecode?.jti,
      email: resDecode?.email,
      avatar: resDecode?.picture,
    };
    try {
      setSocialLoginLoading(true);
      let res = await api.post("/google-login", payload);
      if (res?.data?.status) {
        localStorage.setItem("@token", res?.data?.token);
        getUserData();
        console.log(res?.data);
      } else {
        setSocialLoginLoading(false);
      }
    } catch (error) {
      setSocialLoginLoading(false);
    }
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => onGoogleLogin(tokenResponse),
  });

  return (
    <div
      className={`google_login_wrapper ${socialLoginLoading ? "loading" : ""}`}
    >
      <GoogleLogin
        useOneTap={false}
        theme='outline'
        onSuccess={onGoogleLogin}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
};

export default LoginWithGoogle;
