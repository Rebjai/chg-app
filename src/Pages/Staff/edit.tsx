import { useTranslation } from "react-i18next";
import { useLoaderData, useNavigate } from "react-router-dom";
import StaffForm from "../../Components/staff/StaffForm";
import PrimaryButton from "../../Components/utils/PrimaryButton";
import Staff from "../../Interfaces/staff.interface";

function EditStaff() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const staff: Staff = useLoaderData() as Staff
    console.log({ staff });

    return (<>

        <PrimaryButton type="reset" onClick={() => { navigate('/staff') }}>{t('back')}</PrimaryButton>
        <h1 className="font-bold text-3xl m-2">
            {staff?.id ? t('edit') : t('create')}
        </h1>
        {t('info_for')} {t('staff')}
        <StaffForm staff={staff} />
    </>);
}

export default EditStaff;