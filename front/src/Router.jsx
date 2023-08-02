import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import NotFound from "./routes/NotFound";
import OnBoarding from "./routes/OnBoarding";
import Login from "./routes/Login";
import SetProfileName from "./routes/SetProfileName";
import SetProfileColor from "./routes/SetProfileColor";
import Withdraw from "./routes/Withdraw";
import WithdrawComplete from "./routes/WithdrawComplete";
import HomeId from "./routes/HomeId";
import HomeIdLetter from "./routes/HomeIdLetter";
import HomeIdWrite from "./routes/HomeIdWrite";
import Last from "./routes/Last";
import LastLetters from "./routes/LastLetters";
import LastLettersList from "./routes/LastLettersList";
import HomeLetters from "./routes/HomeLetters";
import LastLettersListId from "./routes/LastLettersListId";
import SetProfileShape1 from "./routes/SetProfileShape1";
import SetProfileShape2 from "./routes/SetProfileShape2";
import SetProfileShape3 from "./routes/SetProfileShape3";
import SetProfileComplete1 from "./routes/SetProfileComplete1";
import SetProfileComplete2 from "./routes/SetProfileComplete2";
import KakaoAuthHandle from "./routes/OAuth/KakaoAuthHandle";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "auth",
        element: <KakaoAuthHandle />,
        errorElement: <NotFound />,
      },
      {
        path: "onboarding",
        element: <OnBoarding />,
        errorElement: <NotFound />,
      },
      {
        path: "login",
        element: <Login />,
        errorElement: <NotFound />,
      },
      {
        path: "setprofile",
        children: [
          {
            path: "name",
            element: <SetProfileName />,
            errorElement: <NotFound />,
          },
          {
            path: "shape1",
            element: <SetProfileShape1 />,
            errorElement: <NotFound />,
          },
          {
            path: "shape2",
            element: <SetProfileShape2 />,
            errorElement: <NotFound />,
          },
          {
            path: "shape3",
            element: <SetProfileShape3 />,
          },
          {
            path: "color",
            element: <SetProfileColor />,
            errorElement: <NotFound />,
          },
          {
            path: "complete1",
            element: <SetProfileComplete1 />,
            errorElement: <NotFound />,
          },
          {
            path: "complete2",
            element: <SetProfileComplete2 />,
            errorElement: <NotFound />,
          },
        ],
      },
      {
        path: "home/:userPk/letters",
        element: <HomeLetters />,
        errorElement: <NotFound />,
      },
      {
        path: "home/:userPk/last/letters",
        element: <LastLetters />,
        errorElement: <NotFound />,
      },
      {
        path: "home/:userPk/last/letters/list",
        element: <LastLettersList />,
        errorElement: <NotFound />,
      },
      {
        path: "home/:userPk/last/letters/list/:letterPk",
        element: <LastLettersListId />,
        errorElement: <NotFound />,
      },
      {
        path: "withdraw/:userPk",
        element: <Withdraw />,
        errorElement: <NotFound />,
      },
      {
        path: "withdraw/:userPk/complete",
        element: <WithdrawComplete />,
        errorElement: <NotFound />,
      },
      {
        path: "home/:userPk",
        element: <HomeId />,
        errorElement: <NotFound />,
        children: [
          {
            path: "letter",
            element: <HomeIdLetter />,
            errorElement: <NotFound />,
          },
          {
            path: "write",
            element: <HomeIdWrite />,
            errorElement: <NotFound />,
          },
        ],
      },
    ],
  },
]);

export default router;
