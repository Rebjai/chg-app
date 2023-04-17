import { lazy } from "react";
import { Route, RouteObject, } from "react-router-dom";
import ConsumptionSheetDetailsActions from "../actions/ConsumptionSheetDetails/ConsumptionDetails.actions";
import ConsumptionSheetDetailsPage from "../Pages/ConsumptionSheetDetails/consumptionSheet";

const IndexConsumptionSheetDetail = lazy(() => import("../Pages/ConsumptionSheetDetails/index"));
const EditConsumptionSheetDetail = lazy(() => import("../Pages/ConsumptionSheetDetails/edit"));

const ConsumptionSheetDetailRouter: RouteObject = {
    path: '',
    children: [
        {
            path: '',
            element: <IndexConsumptionSheetDetail />,
            index: true,
            loader: ConsumptionSheetDetailsActions.getAll

        },
        {
            path: 'create',
            element: <EditConsumptionSheetDetail />,
            action: ConsumptionSheetDetailsActions.create
        },
        {
            path: ':id',
            element: <EditConsumptionSheetDetail />,
            loader: ConsumptionSheetDetailsActions.getById,
            action: ConsumptionSheetDetailsActions.update
        },
        {
            path: ':id/edit',
            element: <EditConsumptionSheetDetail />,
            loader: ConsumptionSheetDetailsActions.getById,
            action: ConsumptionSheetDetailsActions.update
        },
        {
            path: ':consumptionSheetId/consumption-details',
            element: <ConsumptionSheetDetailsPage />,
            loader: ConsumptionSheetDetailsActions.getByConsumptionSheetId,
            action: ConsumptionSheetDetailsActions.createConsumptionDetail
        },
    ]
};

export default ConsumptionSheetDetailRouter;