import { savePushSubscription } from "./PushAPI";
import { usePushNotificationSubscriptionStore } from "./store/PushNotificationSubscriptionStore";

export const askPermission = () => {
  if (Notification.permission === "granted") {
    getPushNotificationSubscriptionAndUpload();
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        getPushNotificationSubscriptionAndUpload();
      }
    });
  }
};

function urlBase64ToUint8Array(base64String: string) {
  var padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  var base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function subscribeUserToPush() {
  return navigator.serviceWorker
    .getRegistration()
    .then((registration) => {
      const subscribeOptions = {
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          "BCWfTioaO09pmWjTEWOBauEzC-V2v5UDzoC1wKsxxel3dpCj9NaWHQcj4tbm3jc-F0_ekA7mHJSiw7KLc9qFV-A"
        ),
      };
      if (registration) {
        return registration.pushManager.subscribe(subscribeOptions);
      }
      throw new Error("No registration");
    })
    .then((pushSubscription) => {
      console.log(
        "Received PushSubscription: ",
        JSON.stringify(pushSubscription)
      );
      return pushSubscription;
    });
}

const getPushNotificationSubscriptionAndUpload = async () => {
  subscribeUserToPush()
    .then(savePushSubscription)
    .then((response) => {
      const store = usePushNotificationSubscriptionStore();
      store.subscription = response.ref["@ref"].id;
    })
    .catch((error) => {
      console.log("***> sending failed", error);
    });
};
