const faunadb = require("faunadb");
const webpush = require("web-push");

const q = faunadb.query;

export async function handler(event) {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        /* Required for CORS support to work */
        "Access-Control-Allow-Origin": "*",
        /* Required for cookies, authorization headers with HTTPS */
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Headers": "*",
      },
    };
  }
  const refId = JSON.parse(event.body);

  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET,
  });

  try {
    const subscription = await client.query(
      q.Get(q.Ref(q.Collection("PushNotificationSubscription"), refId))
    );

    const pushNotificationPayload = {
      title: "Hello There",
      body: "This is It Jobs world",
    };

    const pushSubscription = {
      endpoint: subscription.data.endpoint,
      keys: {
        p256dh: subscription.data.keys.p256dh,
        auth: subscription.data.keys.auth,
      },
    };

    // Actually send the push
    webpush.setVapidDetails(
      "mailto:thanhan.uit@gmail.com",
      process.env.VAPID_PUBLIC_KEY,
      process.env.VAPID_PRIVATE_KEY
    );

    await webpush.sendNotification(
      pushSubscription,
      JSON.stringify(pushNotificationPayload)
    );

    return {
      statusCode: 200,
      headers: {
        /* Required for CORS support to work */
        "Access-Control-Allow-Origin": "*",
        /* Required for cookies, authorization headers with HTTPS */
        "Access-Control-Allow-Credentials": true,
      },
      body: "ok",
    };
  } catch (error) {
    console.log("***> call here 9", error);
    return {
      statusCode: 500,
      headers: {
        /* Required for CORS support to work */
        "Access-Control-Allow-Origin": "*",
        /* Required for cookies, authorization headers with HTTPS */
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(error),
    };
  }
}
