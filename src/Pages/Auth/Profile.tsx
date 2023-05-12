import { useEffect } from "react";
import { useActionData, useNavigate } from "react-router-dom";
import StaffForm from "../../Components/staff/StaffForm";
import PrimaryButton from "../../Components/utils/PrimaryButton";
import { useAuth } from "../../Utils/UseAuth";

const Profile = () => {
    const { auth, login, refresh} = useAuth()
    const navigate = useNavigate()
    const data = useActionData()
    console.log({data});
    useEffect(() => {
        refresh!()
    }, [null])
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user')!)
        if (!auth.user.profile && user.profile) {
            console.log({profile: user.profile});
            // TODO bugfix on update
            refresh!()
            // login!(user)
        }
    }, [data])
    return (<section>
        <div className="text-center">

            <PrimaryButton type="reset" onClick={() => { navigate('/') }}>Back</PrimaryButton>

            <h1 className="text-4xl ">
                Profile
            </h1>
            <p>change your personal info</p>
        </div>
        {auth?.user?.role != '10' ? <StaffForm staff={auth.user.profile} ></StaffForm> : null}
    </section>);
}

export default Profile;