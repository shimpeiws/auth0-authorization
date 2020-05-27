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
    baseURL: `https://${process.env.AUTH0_DOMAIN}`,
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
      user: res.data,
    }),
  };
};

export const adminUsers: APIGatewayProxyHandler = async () => {
  const resToken = await axios.post(
    `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
    {
      grant_type: "client_credentials",
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
    },
    { headers: { "'content-type'": "application/x-www-form-urlencoded" } }
  );
  const resSearchUsers = await axios.get(
    `https://${process.env.AUTH0_DOMAIN}/api/v2/users`,
    {
      params: {
        q: "app_metadata.roles=admin",
        search_engine: "v3",
      },
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${resToken.data.access_token}`,
      },
    }
  );
  console.info("resSearchUsers.data", resSearchUsers.data);
  return {
    statusCode: 200,
    body: JSON.stringify({
      users: resSearchUsers.data,
    }),
  };
};
