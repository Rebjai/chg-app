import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import deleteIcon from "../../assets/delete-icon.svg";
import editIcon from "../../assets/edit-icon.svg";
import Area from "../../Interfaces/area.interface";
interface AreaCardProps {
    area: Area
}

function AreaCard({ area }: AreaCardProps) {
    // useEffect(() => {
        
    // })
    const navigate = useNavigate()
    const editArea = (id: number)=>{
        console.log('edit');
        
        return undefined
    }
    
    return (
        <div className="card rounded min-w-[200px] bg-yellow-200 my-2 p-3 drop-shadow-lg w-10/12">
            <h1 className="font-bold text-lg tracking-wider">{area.name}</h1>
            <div className="actions flex justify-end w-full">
                <Link className="max-w-[100px] w-1/12 mx-3" to={''+area.id} >
                    <img src={editIcon} alt=""  />
                </Link>
                <button className="max-w-[100px] w-1/12 mx-3">
                    <img src={deleteIcon} alt=""  />
                </button>
            </div>

        </div>);
}

export default AreaCard;