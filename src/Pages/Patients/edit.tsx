import { useLoaderData, useNavigate } from "react-router-dom";
import PatientForm from "../../Components/patients/PatientForm";
import PrimaryButton from "../../Components/utils/PrimaryButton";
import Patient from "../../Interfaces/patient.interface";

function EditPatient() {
    const navigate = useNavigate()
    const patient :Patient = useLoaderData() as Patient
    // const patient :Patient = {
    //     id: 0,
    //     name: '204',
    //     status: 2,
    //     date_of_birth: new Date(),
    //     first_surname: '',
    //     second_surname: '',
    // }
    console.log({patient});
    
    return ( <>

    <PrimaryButton type="reset" onClick={()=>{navigate('/patients')}}>Back</PrimaryButton>
    <h1 className="font-bold text-3xl m-2">
    {patient?.id?'Editar':'Crear'}
    </h1>
    informacion del paciente
    <PatientForm patient={patient}/>
    </> );
}

export default EditPatient;