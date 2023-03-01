import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../Layouts/AppLayout";
import Login from "../Pages/Auth/Login";
import ResetPassword from "../Pages/Auth/ResetPassword";
import ErrorPage from "../Pages/error-page";
import IndexPage from "../Pages/index-page";
import AuthRouter from "./auth.router";
import PatientRouter from "./patients.router";
import RoomRouter from "./rooms.router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '', element: <IndexPage />},
      { path: 'rooms', children: [RoomRouter] },
      { path: 'patients', children: [PatientRouter] },
    ]
  },
  {
    path: 'auth',
    children: [AuthRouter]
  },




]);
export default router