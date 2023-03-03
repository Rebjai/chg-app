import { Route, RouteObject, } from "react-router-dom";
import IndexPatient from "../Pages/Patients/index";
import EditPatient from "../Pages/Patients/edit";
import PatientsActions from "../actions/Patients/Patients.actions";

const PatientRouter: RouteObject = {
    path: '',
    children: [
        {
            path: '',
            element: <IndexPatient />,
            index: true,
            loader: PatientsActions.getAll
            
        },
        {
            path: 'create',
            element: <EditPatient />,
            action: PatientsActions.create
            // index: true
            
        },
        {
            path: ':id',
            element: <EditPatient />,
            loader: PatientsActions.getById,
            action: PatientsActions.update
            // index: true
            
        },
        {
            path: ':id/edit',
            element: <EditPatient />,
            loader: PatientsActions.getById,
            action: PatientsActions.update

        }
    ]
};

export default PatientRouter;