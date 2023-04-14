import { useTranslation } from "react-i18next";
import { useLoaderData, useLocation, useNavigate, useParams } from "react-router-dom";
import RoomForm from "../../Components/rooms/RoomForm";
import PrimaryButton from "../../Components/utils/PrimaryButton";
import Room from "../../Interfaces/room.interface";

function EditRoom() {
    const {t} = useTranslation()
    const navigate = useNavigate()
    const {id} = useParams()
    
    const createRoom =  useLocation().pathname.split('/')[2] == 'create'
    
    const room :Room = useLoaderData() as Room
    // const room :Room = {
    //     id: 1,
    //     name: '204',
    //     status: 2,
    //     type: 1,
    // }
    return ( <>

    <PrimaryButton type="reset" onClick={()=>{navigate('/rooms')}}>{t('back')}</PrimaryButton>
    <h1 className="font-bold text-3xl m-2">
    {createRoom? t('create'): t('edit')}
    </h1>
    {t('info_for')} {t('room')}
    {createRoom? <RoomForm />: <RoomForm room={room}/>} 
    </> );
}

export default EditRoom;