import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import deleteIcon from "../../assets/delete-icon.svg";
import editIcon from "../../assets/edit-icon.svg";
import Staff from "../../Interfaces/staff.interface";
interface StaffCardProps {
    staff: Staff
}

function StaffCard({ staff }: StaffCardProps) {
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
    
    return (
        <div className="card rounded-lg min-w-[200px] border-transparent border-2 my-4 p-3 shadow-lg shadow-cyan-900/50 w-10/12">
            <h1 className="font-bold text-lg tracking-wider">{`${staff.name} ${staff.first_surname} ${staff.second_surname}`}</h1>
            <div>
                <span className="inline-block rounded-full w-[20px] h-[20px] bg-green-400 max-w-[100px] mt-2 mx-2 mb-0">
                </span>
                <p className="italic font-light">
                    {getStatusText(staff.status! )}
                </p>
            </div>
            <div className="actions flex justify-end w-full ">
                <Link className="max-w-[100px] w-1/12 mx-3" to={''+staff.id} >
                    <img src={editIcon} alt=""  />
                </Link>
                <button className="max-w-[100px] w-1/12 mx-3">
                    <img src={deleteIcon} alt=""  />
                </button>
            </div>

        </div>);
}

export default StaffCard;