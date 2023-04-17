import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import deleteIcon from "../../assets/delete-icon.svg";
import editIcon from "../../assets/edit-icon.svg";
import medicinesIcon from "../../assets/medicines-icon.svg";
import ConsumptionSheet from "../../Interfaces/consumptionSheet.interface";
interface ConsumptionSheetCardProps {
    consumptionSheet: ConsumptionSheet
}

function ConsumptionSheetCard({ consumptionSheet }: ConsumptionSheetCardProps) {

    return (
        <div className="card rounded min-w-[200px] bg-cyan-200 my-2 p-3 drop-shadow-lg w-10/12">
            <h1 className="font-bold text-xl tracking-wider">{`${consumptionSheet.room?.name}`}</h1>
            <p className="italic text-lg">{consumptionSheet.doctor}</p>
            <p className="italic text-sm traking-widest">{consumptionSheet.patient?.name} {consumptionSheet.patient?.first_surname[0]}. {consumptionSheet.patient?.second_surname[0]}.</p>
            <p className="italic text-xs">{consumptionSheet.admission_date.split('T')[0]}</p>
            <div className="actions flex justify-end w-full ">
                {!consumptionSheet.total && <Link className="max-w-[100px] w-1/12 mx-3" to={'/consumption-sheet-details/' + consumptionSheet.id+'/consumption-details'} >
                    <img src={medicinesIcon} alt="" />
                </Link>}
                <Link className="max-w-[100px] w-1/12 mx-3" to={'' + consumptionSheet.id} >
                    <img src={editIcon} alt="" />
                </Link>
                <button className="max-w-[100px] w-1/12 mx-3">
                    <img src={deleteIcon} alt="" />
                </button>
            </div>

        </div>);
}

export default ConsumptionSheetCard;