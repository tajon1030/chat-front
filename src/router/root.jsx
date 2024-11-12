import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import ChatRoom from "../pages/ChatRoom";

const Loading = <div className={"bg-red-500"}>Loading....</div>;
const Main = lazy(() => import("../pages/MainPage"));
const Login = lazy(() => import("../pages/LoginPage"));

const root = createBrowserRouter([
  {
    path: "/login",
    element: (
      <Suspense fallback={Loading}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/room",
    element: (
      <Suspense fallback={Loading}>
        <Main />
      </Suspense>
    ),
  },
  {
    path: "/room/enter/:roomId",
    element: (
      <Suspense fallback={Loading}>
        <ChatRoom />
      </Suspense>
    ),
  },
]);

export default root;
