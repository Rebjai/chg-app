import { useLoaderData, useNavigate } from "react-router-dom";
import PrimaryButton from "../../Components/utils/PrimaryButton";
import RoomCard from "../../Components/rooms/RoomCard";

function indexRoom() {
    let navigate= useNavigate()
    // const rooms = [
    //     {
    //         id: 1,
    //         name: '204',
    //         type: 1,
    //         status: 1
    //     },
    //     {
    //         id: 2,
    //         name: '205',
    //         type: 1,
    //         status: 1
    //     },
    //     {
    //         id: 3,
    //         name: '102',
    //         type: 2,
    //         status: 1
    //     },
    // ]
    const rooms = useLoaderData()
    return (<>
        <PrimaryButton onClick={() => {
            navigate('create')
        }}>
            agregar cuarto
        </PrimaryButton>
        lista de cuartos
        {rooms.map(room => <RoomCard room={room} key={room.id}></RoomCard>)}
    </>);
}

export default indexRoom;