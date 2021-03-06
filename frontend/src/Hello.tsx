import * as React from "react";
import { useHistory } from "react-router-dom";
import { client } from "./Lib/Auth0";

export interface Props {}

export function Hello(_: Props) {
  const myHistory = useHistory();
  React.useEffect(() => {
    const initAuth0 = async () => {
      const c = await client();

      await c.loginWithPopup();
      const u = await c.getUser();
      console.info(u);
      const t = await c.getTokenSilently();
      console.info(t);

      if (u["https://high-pine.com/roles"]) {
        const roles: string[] = u["https://high-pine.com/roles"];
        if (roles.includes("admin")) {
          console.info("admin!");
          myHistory.push("/admin-only");
        } else {
          console.info("NOT admin!");
          myHistory.push("/all");
        }
      } else {
        console.info("NOT admin!");
        myHistory.push("/all");
      }
    };
    initAuth0();
  }, []);
  return <div>Hello</div>;
}
