import { lazy } from "react";
import { ActionFunction, Route, RouteObject, } from "react-router-dom";
import AreasActions from "../actions/Areas/Areas.actions";

const IndexArea = lazy(() => import("../Pages/Areas"));
const EditArea = lazy(() => import("../Pages/Areas/edit"));

const AreaRouter: RouteObject = {
    path: '',
    children: [
        {
            path: '',
            element: <IndexArea />,
            loader: AreasActions.getAll,
            index: true

        },
        {
            path: 'create',
            element: <EditArea />,
            action: AreasActions.create,
            // index: true
            
        },
        {
            path: ':id',
            element: <EditArea />,
            action: AreasActions.update,
            loader: AreasActions.getById
            // index: true
            
        },
        {
            path: ':id/edit',
            element: <EditArea />,
            action: AreasActions.update,
            loader: AreasActions.getById

        }
    ]
};

export default AreaRouter;