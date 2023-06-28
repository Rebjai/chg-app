import { createBrowserRouter } from "react-router-dom";
import AuthGuard from "../Guards/AuthGuard";
import PublicGuard from "../Guards/PublicGuard";
import AppLayout from "../Layouts/AppLayout";
import AuthProvider from "../Pages/Auth/AuthProvider";
import ErrorPage from "../Pages/error-page";
import IndexPage from "../Pages/index-page";
import AuthRouter from "./auth.router";
import AreasRouter from "./areas.router";
import ConsumptionSheetDetailRouter from "./consumptionSheetDetails.router";
import ConsumptionSheetRouter from "./consumptionSheets.router";
import PatientRouter from "./patients.router";
import ProductRouter from "./products.router";
import RoomRouter from "./rooms.router";
import StaffRouter from "./staff.router";
import UsersRouter from "./users.router";

const router = createBrowserRouter(
  [{
    element: <AuthProvider />,
    children: [
      {
        element: <AuthGuard />, children: [
          {
            path: "/",
            element: <AppLayout />,
            errorElement: <ErrorPage />,
            children: [
              { path: '', element: <IndexPage /> },
              { path: 'areas', children: [AreasRouter] },
              { path: 'rooms', children: [RoomRouter] },
              { path: 'patients', children: [PatientRouter] },
              { path: 'products', children: [ProductRouter] },
              { path: 'staff', children: [StaffRouter] },
              { path: 'consumption-sheets', children: [ConsumptionSheetRouter] },
              { path: 'consumption-sheet-details', children: [ConsumptionSheetDetailRouter] },
              { path: 'users', children: [UsersRouter] },
            ]
          }
        ]
      }
      ,
      {
        element: <PublicGuard />, children: [{
          path: 'auth',
          children: [AuthRouter]
        },]
      }
    ]
  }

  ]
);
export default router