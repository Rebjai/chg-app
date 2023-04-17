import { lazy } from "react";
import { Route, RouteObject, } from "react-router-dom";
import ConsumptionSheetsActions from "../actions/ConsumptionSheets/ConsumptionSheets.actions";

const IndexConsumptionSheet = lazy(() => import("../Pages/ConsumptionSheets/index"));
const EditConsumptionSheet = lazy(() => import("../Pages/ConsumptionSheets/edit"));

const ConsumptionSheetRouter: RouteObject = {
    path: '',
    children: [
        {
            path: '',
            element: <IndexConsumptionSheet />,
            index: true,
            loader: ConsumptionSheetsActions.getAll

        },
        {
            path: 'closed',
            element: <IndexConsumptionSheet />,
            index: true,
            loader: ConsumptionSheetsActions.getTerminated,

        },
        {
            path: 'closed/:id',
            element: <EditConsumptionSheet />,
            loader: ConsumptionSheetsActions.getById,
            action: ConsumptionSheetsActions.update
        },
        {
            path: 'create',
            element: <EditConsumptionSheet />,
            action: ConsumptionSheetsActions.create
        },
        {
            path: ':id',
            element: <EditConsumptionSheet />,
            loader: ConsumptionSheetsActions.getById,
            action: ConsumptionSheetsActions.update
        },
        {
            path: ':id/edit',
            element: <EditConsumptionSheet />,
            loader: ConsumptionSheetsActions.getById,
            action: ConsumptionSheetsActions.update
        }
    ]
};

export default ConsumptionSheetRouter;