import { Route, RouteObject, } from "react-router-dom";
import IndexRoom from "../Pages/Rooms";
import EditRoom from "../Pages/Rooms/edit";

const RoomRouter: RouteObject = {
    path: '',
    children: [
        {
            path: '',
            element: <IndexRoom />,
            index: true

        },
        {
            path: ':id',
            element: <EditRoom />,
            // index: true

        },
        {
            path: ':id/edit',
            element: <EditRoom />,

        }
    ]
};

export default RoomRouter;