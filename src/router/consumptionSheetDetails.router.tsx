import { Route, RouteObject, } from "react-router-dom";
import IndexConsumptionSheetDetail from "../Pages/ConsumptionSheetDetails/index";
import EditConsumptionSheetDetail from "../Pages/ConsumptionSheetDetails/edit";
import ConsumptionSheetDetailsActions from "../actions/ConsumptionSheetDetails/ConsumptionSheets.actions";

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
        }
    ]
};

export default ConsumptionSheetDetailRouter;