import { useNavigate } from "react-router-dom";
import RoomForm from "../../Components/rooms/RoomForm";
import PrimaryButton from "../../Components/utils/PrimaryButton";
import Room from "../../Interfaces/room.interface";

function EditRoom() {
    const navigate = useNavigate()
    const room :Room = {
        id: 1,
        name: '204',
        status: 2,
        type: 1,
    }
    return ( <>

    <PrimaryButton type="reset" onClick={()=>{navigate('/rooms')}}>Back</PrimaryButton>
    <h1 className="font-bold text-3xl m-2">
    Editar
    </h1>
    informacion cuartos
    <RoomForm/>
    </> );
}

export default EditRoom;