import { useLoaderData, useNavigate } from "react-router-dom";
import ConsumptionSheetDetailForm from "../../Components/consumptionSheetDetail/ConsumptionSheetDetailForm";
import PrimaryButton from "../../Components/utils/PrimaryButton";
import ConsumptionSheetDetail from "../../Interfaces/consumptionSheetDetail.interface";

function EditConsumptionSheetDetail() {
    const navigate = useNavigate()
    const consumptionSheetDetail :ConsumptionSheetDetail = useLoaderData() as ConsumptionSheetDetail
    console.log({consumptionSheetDetail});
    
    return ( <>

    <PrimaryButton type="reset" onClick={()=>{navigate('/consumption-sheet-details')}}>Back</PrimaryButton>
    <h1 className="font-bold text-3xl m-2">
    {consumptionSheetDetail?.id?'Editar':'Crear'}
    </h1>
    informacion de la hoja de consumo
    <ConsumptionSheetDetailForm consumptionSheetDetail={consumptionSheetDetail}/>
    </> );
}

export default EditConsumptionSheetDetail;