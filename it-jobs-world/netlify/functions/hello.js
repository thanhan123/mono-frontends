const webpush = require("web-push");
const faunadb = require("faunadb");

export async function handler(event) {
  return {
    statusCode: 200,
    body: "hello",
  };
}
