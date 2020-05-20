import createAuth0Client from "@auth0/auth0-spa-js";

export const client = () => {
  return createAuth0Client({
    domain: "your-domain",
    client_id: "your-client-id",
  });
};
