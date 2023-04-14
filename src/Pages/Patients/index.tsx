import { useLoaderData, useNavigate } from "react-router-dom";
import PrimaryButton from "../../Components/utils/PrimaryButton";
import PatientCard from "../../Components/patients/PatientCard";
import Patient from "../../Interfaces/patient.interface";
import { useTranslation } from "react-i18next";

function IndexPatient() {
    let navigate = useNavigate()
    const patients: Patient[] = useLoaderData() as Patient[]
    const {t} = useTranslation()
    return (<>
        <PrimaryButton onClick={() => {
            navigate('create')
        }}>
            {t("create_new")} {t('patient')}
        </PrimaryButton>
        {t('list_of')} {t('patients')}
        {patients.map(patient => <PatientCard patient={patient} key={patient.id}></PatientCard>)}
    </>);
}

export default IndexPatient;