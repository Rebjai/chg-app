import { ActionFunction, Route, RouteObject, } from "react-router-dom";
import RoomsActions from "../actions/Rooms/Room.actions";
import IndexRoom from "../Pages/Rooms";
import EditRoom from "../Pages/Rooms/edit";

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