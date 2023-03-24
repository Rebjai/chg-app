import { useLoaderData, useNavigate } from "react-router-dom";
import UserForm from "../../Components/users/UserForm";
import PrimaryButton from "../../Components/utils/PrimaryButton";
import User from "../../Interfaces/user.interface";

function EditUser() {
    const navigate = useNavigate()
    const user :User = useLoaderData() as User
    console.log({user});
    
    return ( <>

    <PrimaryButton type="reset" onClick={()=>{navigate('/users')}}>Back</PrimaryButton>
    <h1 className="font-bold text-3xl m-2">
    {user?.id?'Editar':'Crear'}
    </h1>
    informacion del user
    <UserForm user={user}/>
    </> );
}

export default EditUser;