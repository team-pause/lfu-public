import React from "react";
import ReactDOM from "react-dom/client";
import ResetStyle from "./styles/reset";
import GlobalVariableStyle from "./styles/global";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import router from "./Router";
import { RecoilRoot } from "recoil";
import "./fonts/font.css";
import ReactGA from "react-ga4";

ReactGA.initialize("G-D0TEG2NZD2");

const client = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <RecoilRoot>
    <QueryClientProvider client={client}>
      <ResetStyle />
      <GlobalVariableStyle />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </RecoilRoot>
);
