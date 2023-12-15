importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyDrR3uSN1PUHAcnxPayOf7d67tx3eTAij4",
  authDomain: "mobilez-market-1683900425195.firebaseapp.com",
  projectId: "mobilez-market-1683900425195",
  storageBucket: "mobilez-market-1683900425195.appspot.com",
  messagingSenderId: "687610333798",
  appId: "1:687610333798:web:eabd7f80e073c9e15bfba7",
  measurementId: "G-8PKDYJSZMF",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  // console.log(
  //   "[firebase-messaging-sw.js] Received background message ",
  //   payload
  // );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "./logo.png",
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
