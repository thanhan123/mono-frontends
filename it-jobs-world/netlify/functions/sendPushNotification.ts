import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { query, Client } from "faunadb"
import * as webpush from "web-push"

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
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
  const payload = JSON.parse(event.body);
  const refId = payload.id

  const client = new Client({
    secret: process.env.FAUNADB_SERVER_SECRET,
  });

  try {
    const subscription: any = await client.query(
      query.Get(query.Ref(query.Collection("PushNotificationSubscription"), refId))
    );

    const pushNotificationPayload = {
      title: payload.title ?? "Hello There",
      body: payload.body ?? "This is Push Notification server",
    };

    const pushSubscription = {
      endpoint: subscription.data.endpoint,
      keys: {
        p256dh: subscription.data.keys.p256dh,
        auth: subscription.data.keys.auth,
      },
    }

    // Actually send the push
    webpush.setVapidDetails(
      "mailto:thanhan.uit@gmail.com",
      process.env.VAPID_PUBLIC_KEY,
      process.env.VAPID_PRIVATE_KEY
    );

    await webpush.sendNotification(
      // @ts-ignore
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
};

export { handler };