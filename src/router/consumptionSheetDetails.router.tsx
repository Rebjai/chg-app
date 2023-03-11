import { Route, RouteObject, } from "react-router-dom";
import IndexConsumptionSheetDetail from "../Pages/ConsumptionSheetDetails/index";
import EditConsumptionSheetDetail from "../Pages/ConsumptionSheetDetails/edit";
import ConsumptionSheetDetailsActions from "../actions/ConsumptionSheetDetails/ConsumptionSheets.actions";
import ConsumptionSheetDetailsPage from "../Pages/ConsumptionSheetDetails/consumptionSheet";

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
            element: <ConsumptionSheetDetailsPage/>,
            loader: ConsumptionSheetDetailsActions.getByConsumptionSheetId,
            action: ConsumptionSheetDetailsActions.createConsumptionDetail
        }
    ]
};

export default ConsumptionSheetDetailRouter;