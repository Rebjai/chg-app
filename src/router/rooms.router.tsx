import { lazy } from "react";
import { ActionFunction, Route, RouteObject, } from "react-router-dom";
import RoomsActions from "../actions/Rooms/Room.actions";

const IndexRoom = lazy(() => import("../Pages/Rooms"));
const EditRoom = lazy(() => import("../Pages/Rooms/edit"));

const RoomRouter: RouteObject = {
    path: '',
    children: [
        {
            path: '',
            element: <IndexRoom />,
            loader: RoomsActions.getAll,
            index: true

        },
        {
            path: 'create',
            element: <EditRoom />,
            action: RoomsActions.create,
            // index: true
            
        },
        {
            path: ':id',
            element: <EditRoom />,
            action: RoomsActions.update,
            loader: RoomsActions.getById
            // index: true
            
        },
        {
            path: ':id/edit',
            element: <EditRoom />,
            action: RoomsActions.update,
            loader: RoomsActions.getById

        }
    ]
};

export default RoomRouter;