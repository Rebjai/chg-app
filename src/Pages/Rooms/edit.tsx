import { useLoaderData, useLocation, useNavigate, useParams } from "react-router-dom";
import RoomForm from "../../Components/rooms/RoomForm";
import PrimaryButton from "../../Components/utils/PrimaryButton";
import Room from "../../Interfaces/room.interface";

function EditRoom() {
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

    <PrimaryButton type="reset" onClick={()=>{navigate('/rooms')}}>Back</PrimaryButton>
    <h1 className="font-bold text-3xl m-2">
    {createRoom? 'Crear': 'Editar'}
    </h1>
    información del cuarto
    {createRoom? <RoomForm />: <RoomForm room={room}/>} 
    </> );
}

export default EditRoom;