import { Route, RouteObject, } from "react-router-dom";
import StaffActions from "../actions/Staff/staff.actions";
import { lazy } from "react";

const IndexStaff = lazy(() => import("../Pages/Staff/index"));
const EditStaff = lazy(() => import("../Pages/Staff/edit"));

const StaffRouter: RouteObject = {
    path: '',
    children: [
        {
            path: '',
            element: <IndexStaff />,
            index: true,
            loader: StaffActions.getAll
            
        },
        {
            path: 'create',
            element: <EditStaff />,
            action: StaffActions.create
            // index: true
            
        },
        {
            path: ':id',
            element: <EditStaff />,
            loader: StaffActions.getById,
            action: StaffActions.update
            // index: true
            
        },
        {
            path: ':id/edit',
            element: <EditStaff />,
            loader: StaffActions.getById,
            action: StaffActions.update

        }
    ]
};

export default StaffRouter;