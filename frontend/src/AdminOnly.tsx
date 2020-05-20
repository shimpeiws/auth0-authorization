import * as React from "react";
import { useHistory } from "react-router-dom";
import { client } from "./Lib/Auth0";

export interface Props {}

export function AdminOnly(_: Props) {
  const myHistory = useHistory();
  React.useLayoutEffect(() => {
    const initAuth0 = async () => {
      const c = await client();

      const u = await c.getUser();
      console.info(u);

      if (u["https://high-pine.com/roles"]) {
        const roles: string[] = u["https://high-pine.com/roles"];
        if (roles.includes("admin")) {
          console.info("admin!");
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
  });
  return <h2>Only Admin can watch this Page</h2>;
}
