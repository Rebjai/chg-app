import { Route, RouteObject, } from "react-router-dom";
import IndexConsumptionSheet from "../Pages/ConsumptionSheets/index";
import EditConsumptionSheet from "../Pages/ConsumptionSheets/edit";
import ConsumptionSheetsActions from "../actions/ConsumptionSheets/ConsumptionSheets.actions";

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