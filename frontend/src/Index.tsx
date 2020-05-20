import * as React from "react";
import * as ReactDOM from "react-dom";
import { Routes } from "./Routes";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Routes />
  </BrowserRouter>,
  document.getElementById("app")
);
