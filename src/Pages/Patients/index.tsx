import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../Components/utils/PrimaryButton";
import PatientCard from "../../Components/patients/PatientCard";
import Patient from "../../Interfaces/patient.interface";

function IndexPatient() {
    let navigate = useNavigate()
    const patients: Patient[] = [
        {
            id: 1,
            name: 'fulano',
            first_surname: 'lopez',
            second_surname: 'pérez',
            date_of_birth: new Date(),
            status: 1
        },
        {
            id: 2,
            name: 'sutano',
            first_surname: 'perez',
            second_surname: 'perez',
            date_of_birth: new Date(),
            status: 1
        },
        {
            id: 3,
            name: 'perengano',
            first_surname: 'mart',
            second_surname: 'inez',
            date_of_birth: new Date(),
            status: 1
        },
    ]
    return (<>
        <PrimaryButton onClick={() => {
            navigate('create')
        }}>
            agregar paciente
        </PrimaryButton>
        lista de pacientes
        {patients.map(patient => <PatientCard patient={patient} key={patient.id}></PatientCard>)}
    </>);
}

export default IndexPatient;