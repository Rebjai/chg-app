import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import deleteIcon from "../../assets/delete-icon.svg";
import editIcon from "../../assets/edit-icon.svg";
import ConsumptionSheetDetail from "../../Interfaces/consumptionSheetDetail.interface";
interface ConsumptionSheetDetailCardProps {
    consumptionSheetDetail: ConsumptionSheetDetail
}

function ConsumptionSheetDetailCard({ consumptionSheetDetail }: ConsumptionSheetDetailCardProps) {
    
    return (
                <div className="card rounded-lg min-w-[200px] border-transparent border-2 my-2 p-3 shadow-lg shadow-violet-900/70 w-10/12">
            <h1 className="font-bold text-lg tracking-wider">{`${consumptionSheetDetail.consumption_sheet?.id}`}</h1>
            <p className="text-sm traking-widest font bold">{consumptionSheetDetail.product?.name}</p>
            <p className="italic">{consumptionSheetDetail.total}</p>
            {/* <p className="italic text-sm">{consumptionSheetDetail.created_at.split('T')[0]}</p> */}
            <div className="actions flex justify-end w-full ">
                <Link className="max-w-[100px] w-1/12 mx-3" to={''+consumptionSheetDetail.id} >
                    <img src={editIcon} alt=""  />
                </Link>
                <button className="max-w-[100px] w-1/12 mx-3">
                    <img src={deleteIcon} alt=""  />
                </button>
            </div>

        </div>);
}

export default ConsumptionSheetDetailCard;