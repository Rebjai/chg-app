import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useFetcher, useNavigate } from "react-router-dom";
import deleteIcon from "../../assets/delete-icon.svg";
import editIcon from "../../assets/edit-icon.svg";
import Patient from "../../Interfaces/patient.interface";
import { useAuth } from "../../Utils/UseAuth";
interface PatientCardProps {
    patient: Patient
}

function PatientCard({ patient }: PatientCardProps) {
    const { t } = useTranslation()
    const { auth } = useAuth()
    const fetcher = useFetcher()
    const getStatusText = (status: number): string => {
        if (status == 0) {
            return 'Occupied'
        }
        if (status == 1) {
            return 'Available'
        }
        if (status == 2) {
            return 'Mantainment'
        }
        return 'n/a'
    }

    return (
                <div className="card rounded-lg min-w-[200px] border-transparent border-2 my-2 p-3 shadow-lg shadow-violet-900/70 w-10/12">
            <h1 className="font-bold text-lg tracking-wider">{`${patient.name} ${patient.first_surname} ${patient.second_surname}`}</h1>
            <div>
                <span className="inline-block rounded-full w-[20px] h-[20px] bg-green-400 max-w-[100px] mt-2 mx-2 mb-0">
                </span>
                <p className="italic font-light">
                    {getStatusText(patient.active!)}
                </p>
            </div>
            <div className="actions flex justify-end w-full ">
                <Link className="max-w-[100px] w-1/12 mx-3" to={'' + patient.id} >
                    <img src={editIcon} alt="" />
                </Link>
                {
                    auth.user.role != '1' &&
                    <fetcher.Form method="delete" action={"/patients/" + patient.id} className="max-w-[100px] w-1/12 mx-3">
                        <button type="submit" className="max-w-[100px] w-full mx-3">
                            <img src={deleteIcon} alt={t('delete')!} />
                        </button>
                    </fetcher.Form>
                }
            </div>

        </div>);
}

export default PatientCard;