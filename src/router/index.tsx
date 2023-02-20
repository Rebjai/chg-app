import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../Layouts/AppLayout";
import Login from "../Pages/Auth/Login";
import ResetPassword from "../Pages/Auth/ResetPassword";
import ErrorPage from "../Pages/error-page";
import IndexPage from "../Pages/index-page";
import RoomRouter from "./rooms.router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '', element: <IndexPage />},
      { path: 'rooms', children: [RoomRouter] }
    ]
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        element: <Login />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'reset-password',
        element: <ResetPassword />
      },
    ]
  },




]);
export default router