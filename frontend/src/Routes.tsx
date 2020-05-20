import * as React from "react";
import { Switch } from "react-router";
import { Route } from "react-router-dom";
import { Hello } from "./Hello";
import { All } from "./All";
import { AdminOnly } from "./AdminOnly";

export interface Props {}

export function Routes(_: Props) {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Hello} />
        <Route exact path="/admin-only" component={AdminOnly} />
        <Route exact path="/all" component={All} />
      </Switch>
    </>
  );
}
