import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import AuthActions from "../actions/Auth/auth.actions";
import ErrorPage from "../Pages/error-page"

const Login = lazy(() => import("../Pages/Auth/Login"));
const Profile = lazy(() => import("../Pages/Auth/Profile"));
const ResetPassword = lazy(() => import("../Pages/Auth/ResetPassword"));
const AuthRouter: RouteObject = {
    path: '',
    errorElement: <ErrorPage />,
    children: [
        {
            path: '',
            element: <Login />,
            action: AuthActions.login,
        },
        {
            path: 'login',
            element: <Login />,
            errorElement: <ErrorPage />,
            action: AuthActions.login
        },
        {
            path: 'reset-password',
            element: <ResetPassword />
        },
        {
            path: 'profile',
            element: <Profile />,
            action: AuthActions.updateProfile,
            loader: AuthActions.getProfile
        },
    ]
};

export default AuthRouter;