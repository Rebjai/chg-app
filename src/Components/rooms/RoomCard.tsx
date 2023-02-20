import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import deleteIcon from "../../assets/delete-icon.svg";
import editIcon from "../../assets/edit-icon.svg";
interface RoomCardProps {
    room: {
        id: number,
        name: string,
        type: number,
        status: number,
    }
}

function RoomCard({ room }: RoomCardProps) {
    // useEffect(() => {
        
    // })
    const navigate = useNavigate()
    const getStatusText = (status: number): string => {
        if (status == 0) {
            return 'Occupied'
        }
        if (status == 1) {
            return 'Available'
        }
        if (status == 2) {
            return 'Mantainment'
        }
        return 'n/a'
    }
    const editRoom = (id: number)=>{
        console.log('edit');
        
        return undefined
    }
    
    return (
        <div className="card rounded min-w-[200px] bg-yellow-200 my-2 p-3 drop-shadow-lg w-10/12">
            <h1 className="font-bold text-lg tracking-wider">{room.name}</h1>
            <div>
                <span className="inline-block rounded-full w-[20px] h-[20px] bg-green-400 max-w-[100px] mt-2 mx-2 mb-0">
                </span>
                <p className="italic font-light">
                    {getStatusText(room.status)}
                </p>
            </div>
            <div className="actions flex justify-end w-full ">
                <Link className="max-w-[100px] w-1/12 mx-3" to={''+room.id} >
                    <img src={editIcon} alt=""  />
                </Link>
                <button className="max-w-[100px] w-1/12 mx-3">
                    <img src={deleteIcon} alt=""  />
                </button>
            </div>

        </div>);
}

export default RoomCard;