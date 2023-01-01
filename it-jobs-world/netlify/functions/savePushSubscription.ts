import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { query, Client } from "faunadb"

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
  const client = new Client({
    secret: process.env.FAUNADB_SERVER_SECRET,
  });
  const pushSubscription = JSON.parse(event.body);
  try {
    const response = await client.query(
      query.Create(query.Collection("PushNotificationSubscription"), {
        data: pushSubscription,
      })
    );
    return {
      statusCode: 200,
      headers: {
        /* Required for CORS support to work */
        "Access-Control-Allow-Origin": "*",
        /* Required for cookies, authorization headers with HTTPS */
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(response),
    };
  } catch (error) {
    console.error(error);
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