import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Auth/Login";
import ResetPassword from "../Pages/Auth/ResetPassword";
import ErrorPage from "../Pages/error-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
    // children: [{
    //   path: 'reset-password',
    //   element: <ResetPassword/>
    // }]
  },
  {
      path: '/reset-password',
      element: <ResetPassword />
    }
]);
export default router