import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { query } from "faunadb"
import * as webpush from "web-push"

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  return {
    statusCode: 200,
    body: "hello 2",
  };
};

export { handler };
