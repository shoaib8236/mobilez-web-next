import { useEffect, useState } from "react";
import { getMessaging, getToken } from "firebase/messaging";
import firebaseApp from "../firebase/firebase";

const useFcmToken = () => {
  const [token, setToken] = useState("");
  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState("");

  useEffect(() => {
    const retrieveToken = async () => {
      try {
        if (typeof window !== "undefined" && "serviceWorker" in navigator) {
          const messaging = getMessaging(firebaseApp);

          // Retrieve the notification permission status
          const permission = await Notification.requestPermission();
          setNotificationPermissionStatus(permission);

          // Check if permission is granted before retrieving the token
          if (permission === "granted") {
            const currentToken = await getToken(messaging, {
              vapidKey:
                "BK5FBlQMu1v8VOmhxuZ-xQ8qZ5nd3kZlGLfYWvsFOQazsMAAyWGsZHdC3lUpF8q8og_gSPXS9zFzTPYp-iLOaig",
            });
            if (currentToken) {
              setToken(currentToken);
            } else {
              console.log(
                "No registration token available. Request permission to generate one."
              );
            }
          }
        }
      } catch (error) {
        console.log("An error occurred while retrieving token:", error);
      }
    };
    retrieveToken();
  }, []);

  return { fcmToken: token, notificationPermissionStatus };
};

const useAuthCheck = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("@token")) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
      localStorage.clear();
    }
  }, []);

  // Return the authentication status
  return { authCheck: isAuth };
};

export { useFcmToken, useAuthCheck };