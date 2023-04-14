import { useLoaderData, useNavigate } from "react-router-dom";
import PrimaryButton from "../../Components/utils/PrimaryButton";
import RoomCard from "../../Components/rooms/RoomCard";
import PaginatedResponse from "../../Interfaces/paginatedResponse.interface";
import Room from "../../Interfaces/room.interface";
import PaginationComponent from "../../Components/utils/PaginationComponent";
import { useTranslation } from "react-i18next";

function indexRoom() {

    const {t} = useTranslation()
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
    const {items:rooms, meta, links} = useLoaderData() as PaginatedResponse<Room>
    return (<>
        <PrimaryButton onClick={() => {
            navigate('create')
        }}>
            {t('create')} {t('room')}
        </PrimaryButton>
        {t('list_of')} {t('rooms')}
        {rooms.map(room => <RoomCard room={room} key={room.id}></RoomCard>)}
        <PaginationComponent links={links} meta={meta!} />
    </>);
}

export default indexRoom;