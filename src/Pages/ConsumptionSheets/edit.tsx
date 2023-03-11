import { useLoaderData, useNavigate } from "react-router-dom";
import ConsumptionSheetForm from "../../Components/consumptionSheet/ConsumptionSheetForm";
import PrimaryButton from "../../Components/utils/PrimaryButton";
import ConsumptionSheet from "../../Interfaces/consumptionSheet.interface";

function EditConsumptionSheet() {
    const navigate = useNavigate()
    const consumptionSheet: ConsumptionSheet = useLoaderData() as ConsumptionSheet
    console.log({ consumptionSheet });

    return (<>

        <PrimaryButton type="reset" onClick={() => { navigate('/consumption-sheets') }}>Back</PrimaryButton>
        <h1 className="font-bold text-3xl m-2">
            {consumptionSheet?.id ? 'Editar' : 'Crear'}
        </h1>
        informacion de la hoja de consumo
        <ConsumptionSheetForm consumptionSheet={consumptionSheet} />
        
    </>);
}

export default EditConsumptionSheet;