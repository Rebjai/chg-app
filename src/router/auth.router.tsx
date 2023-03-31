import { RouteObject } from "react-router-dom";
import AuthActions from "../actions/Auth/auth.actions";
import Login from "../Pages/Auth/Login";
import Profile from "../Pages/Auth/Profile";
import ResetPassword from "../Pages/Auth/ResetPassword";
import ErrorPage from "../Pages/error-page";

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