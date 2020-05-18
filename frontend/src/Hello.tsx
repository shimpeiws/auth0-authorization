import * as React from "react";
import createAuth0Client from "@auth0/auth0-spa-js";

export interface Props {}

export function Hello(_: Props) {
  React.useEffect(() => {
    const initAuth0 = async () => {
      const c = await createAuth0Client({
        domain: "high-pine.auth0.com",
        client_id: "0fV7bAfzDNVspdpcGyCpILsrXTboEa27",
      });

      await c.loginWithPopup();
      const u = await c.getUser();
      console.info(u);
      const t = await c.getTokenSilently();
      console.info(t);
    };
    initAuth0();
    // eslint-disable-next-line
  }, []);
  return <div>Hello</div>;
}
