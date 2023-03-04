import { useLoaderData, useNavigate } from "react-router-dom";
import StaffForm from "../../Components/staff/StaffForm";
import PrimaryButton from "../../Components/utils/PrimaryButton";
import Staff from "../../Interfaces/staff.interface";

function EditStaff() {
    const navigate = useNavigate()
    const staff :Staff = useLoaderData() as Staff
    console.log({staff});
    
    return ( <>

    <PrimaryButton type="reset" onClick={()=>{navigate('/staff')}}>Back</PrimaryButton>
    <h1 className="font-bold text-3xl m-2">
    {staff?.id?'Editar':'Crear'}
    </h1>
    informacion del staff
    <StaffForm staff={staff}/>
    </> );
}

export default EditStaff;