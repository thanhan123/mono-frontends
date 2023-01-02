const apiHostname = `https://papaya-biscotti-035fc5.netlify.app`;
const SEND_PUSH_NOTIFICATION_PATH = "/.netlify/functions/sendPushNotification";

export async function sendPushNotification(id: string, title: string | null, body: string | null) {
  const payload = {
    id,
    delay: 0
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
