import { useTranslation } from "react-i18next";
import { useLoaderData, useNavigate } from "react-router-dom";
import UserForm from "../../Components/users/UserForm";
import PrimaryButton from "../../Components/utils/PrimaryButton";
import User from "../../Interfaces/user.interface";

function EditUser() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const user: User = useLoaderData() as User
    console.log({ user });

    return (<>

        <PrimaryButton type="reset" onClick={() => { navigate('/users') }}>{t('back')}</PrimaryButton>
        <h1 className="font-bold text-3xl m-2">
            {user?.id ? t('editar') : t('create')}
        </h1>
        {t('info_for')} {t('user')}
        <UserForm user={user} />
    </>);
}

export default EditUser;