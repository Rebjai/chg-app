import { useLoaderData, useNavigate } from "react-router-dom";
import StaffCard from "../../Components/staff/StaffCard";
import PrimaryButton from "../../Components/utils/PrimaryButton";
import Staff from "../../Interfaces/staff.interface";

function IndexStaff() {
    let navigate = useNavigate()
    const staffs: Staff[] = useLoaderData() as Staff[]
    return (<>
        <PrimaryButton onClick={() => {
            navigate('create')
        }}>
            agregar staff
        </PrimaryButton>
        lista de staff
        {staffs.map(staff => <StaffCard staff={staff} key={staff.id}></StaffCard>)}
    </>);
}

export default IndexStaff;