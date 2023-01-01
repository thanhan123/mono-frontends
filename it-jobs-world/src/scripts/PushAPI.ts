const apiHostname = `${window.location.protocol}//${window.location.host}`;
const SAVE_PUSH_SUBSCRIPTION_PATH = "/.netlify/functions/savePushSubscription";
const SEND_PUSH_NOTIFICATION_PATH = "/.netlify/functions/sendPushNotification";

export async function savePushSubscription(subscription: any) {
  const url = `${apiHostname}${SAVE_PUSH_SUBSCRIPTION_PATH}`;
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    referrerPolicy: "no-referrer",
    body: JSON.stringify(subscription),
  });
  return response.json();
}

export async function sendPushNotification(id: string, delay: number = 0) {
  const payload = {
    id,
    delay
  }
  const url = `${apiHostname}${SEND_PUSH_NOTIFICATION_PATH}`;
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    referrerPolicy: "no-referrer",
    body: JSON.stringify(payload),
  });
}
