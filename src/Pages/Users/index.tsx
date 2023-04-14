import { useTranslation } from "react-i18next";
import { useLoaderData, useNavigate } from "react-router-dom";
import UserCard from "../../Components/users/UserCard";
import PrimaryButton from "../../Components/utils/PrimaryButton";
import User from "../../Interfaces/user.interface";

function IndexUser() {
    const { t } = useTranslation()
    let navigate = useNavigate()
    const users: User[] = useLoaderData() as User[]
    return (<>
        <PrimaryButton onClick={() => {
            navigate('create')
        }}>
            {t('create')} {t('user')}
        </PrimaryButton>
        {t('list_of')} {t('users')}
        {users.map(user => <UserCard user={user} key={user.id}></UserCard>)}
    </>);
}

export default IndexUser;