import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useFetcher, useNavigate } from "react-router-dom";
import deleteIcon from "../../assets/delete-icon.svg";
import editIcon from "../../assets/edit-icon.svg";
import Area from "../../Interfaces/area.interface";
interface AreaCardProps {
    area: Area
}

function AreaCard({ area }: AreaCardProps) {
    // useEffect(() => {
        
    // })
    const {t} = useTranslation()
    const fetcher = useFetcher()
    const navigate = useNavigate()
    const editArea = (id: number)=>{
        console.log('edit');
        
        return undefined
    }
    
    return (
        <div className="card rounded-lg min-w-[200px] border-transparent border-2 my-4 p-3 shadow-lg shadow-cyan-900/50 w-10/12">
            <h1 className="font-bold text-lg tracking-wider">{area.name}</h1>
            <div className="actions flex justify-end w-full">
                <Link className="max-w-[100px] w-1/12 mx-3" to={''+area.id} >
                    <img src={editIcon} alt=""  />
                </Link>
                <fetcher.Form method="delete" action={"/areas/" + area.id} className="max-w-[100px] w-1/12 mx-3">
                    <button type="submit" className="inline-block max-w-[100px] w-full">
                        <img src={deleteIcon} alt={t('delete')!} /> 
                    </button>
                </fetcher.Form>
            </div>

        </div>);
}

export default AreaCard;