import { APIGatewayProxyHandler } from "aws-lambda";
import axios from "axios";

export const hello: APIGatewayProxyHandler = async (event) => {
  if (!event.headers["Authorization"]) {
    return {
      statusCode: 403,
      body: JSON.stringify({}),
    };
  }
  const authorization = event.headers["Authorization"];
  const bearer = authorization.split(" ");
  if (bearer.length < 1) {
    return {
      statusCode: 403,
      body: JSON.stringify({}),
    };
  }
  console.info("bearer", bearer);
  const token = bearer[1];
  const client = axios.create({
    baseURL: "YOUR_DOMAIN",
    responseType: "json",
  });
  const res = await client.get("/userinfo/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.info("res", res.data);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message:
        "Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!",
      input: event.headers,
      user: res.data,
    }),
  };
};
