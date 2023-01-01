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
  const delay = payload.delay

  const client = new Client({
    secret: process.env.FAUNADB_SERVER_SECRET,
  });

  try {
    const subscription: any = await client.query(
      query.Get(query.Ref(query.Collection("PushNotificationSubscription"), refId))
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
    }

    // Actually send the push
    webpush.setVapidDetails(
      "mailto:thanhan.uit@gmail.com",
      process.env.VAPID_PUBLIC_KEY,
      process.env.VAPID_PRIVATE_KEY
    );

    setTimeout(() => {
      webpush.sendNotification(
        // @ts-ignore
        pushSubscription,
        JSON.stringify(pushNotificationPayload)
      );
    }, Math.max(0, delay) * 1000);

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