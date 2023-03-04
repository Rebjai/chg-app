import { Route, RouteObject, } from "react-router-dom";
import IndexStaff from "../Pages/Staff/index";
import EditStaff from "../Pages/Staff/edit";
import StaffActions from "../actions/Staff/staff.actions";

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