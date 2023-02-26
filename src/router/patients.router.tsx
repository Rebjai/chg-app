import { Route, RouteObject, } from "react-router-dom";
import IndexPatient from "../Pages/Patients/index";
import EditPatient from "../Pages/Patients/edit";

const PatientRouter: RouteObject = {
    path: '',
    children: [
        {
            path: '',
            element: <IndexPatient />,
            index: true

        },
        {
            path: ':id',
            element: <EditPatient />,
            // index: true

        },
        {
            path: ':id/edit',
            element: <EditPatient />,

        }
    ]
};

export default PatientRouter;