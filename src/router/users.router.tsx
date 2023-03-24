import { Route, RouteObject, } from "react-router-dom";
import IndexUser from "../Pages/Users/index";
import EditUser from "../Pages/Users/edit";
import UsersActions from "../actions/Users/User.actions";

const UsersRouter: RouteObject = {
    path: '',
    children: [
        {
            path: '',
            element: <IndexUser />,
            index: true,
            loader: UsersActions.getAll
            
        },
        {
            path: 'create',
            element: <EditUser />,
            action: UsersActions.create
            // index: true
            
        },
        {
            path: ':id',
            element: <EditUser />,
            loader: UsersActions.getById,
            action: UsersActions.update
            // index: true
            
        },
        {
            path: ':id/edit',
            element: <EditUser />,
            loader: UsersActions.getById,
            action: UsersActions.update

        }
    ]
};

export default UsersRouter;