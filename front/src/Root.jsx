import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Background from "./icon/Background";

export default function Root() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/onBoarding");
    }
  }, [location, navigate]);

  return (
    <>
      <Outlet />
      <Background />
    </>
  );
}
