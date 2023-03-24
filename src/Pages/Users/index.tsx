import { useLoaderData, useNavigate } from "react-router-dom";
import UserCard from "../../Components/users/UserCard";
import PrimaryButton from "../../Components/utils/PrimaryButton";
import User from "../../Interfaces/user.interface";

function IndexUser() {
    let navigate = useNavigate()
    const users: User[] = useLoaderData() as User[]
    return (<>
        <PrimaryButton onClick={() => {
            navigate('create')
        }}>
            agregar user
        </PrimaryButton>
        lista de user
        {users.map(user => <UserCard user={user} key={user.id}></UserCard>)}
    </>);
}

export default IndexUser;