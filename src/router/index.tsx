import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../Layouts/AppLayout";
import Login from "../Pages/Auth/Login";
import ResetPassword from "../Pages/Auth/ResetPassword";
import ErrorPage from "../Pages/error-page";
import IndexPage from "../Pages/index-page";
import AuthRouter from "./auth.router";
import ConsumptionSheetRouter from "./consumptionSheets.router";
import PatientRouter from "./patients.router";
import ProductRouter from "./products.router";
import RoomRouter from "./rooms.router";
import StaffRouter from "./staff.router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '', element: <IndexPage />},
      { path: 'rooms', children: [RoomRouter] },
      { path: 'patients', children: [PatientRouter] },
      { path: 'products', children: [ProductRouter] },
      { path: 'staff', children: [StaffRouter] },
      { path: 'consumption-sheets', children: [ConsumptionSheetRouter] },
    ]
  },
  {
    path: 'auth',
    children: [AuthRouter]
  },




]);
export default router