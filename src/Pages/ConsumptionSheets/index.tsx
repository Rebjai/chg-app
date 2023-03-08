import { useLoaderData, useNavigate } from "react-router-dom";
import ConsumptionSheetCard from "../../Components/consumptionSheet/ConsumptionSheetCard";
import PrimaryButton from "../../Components/utils/PrimaryButton";
import ConsumptionSheet from "../../Interfaces/consumptionSheet.interface";

function IndexConsumptionSheet() {
    let navigate = useNavigate()
    const consumptionSheets: ConsumptionSheet[] = useLoaderData() as ConsumptionSheet[]
    
    return (<>
        <PrimaryButton onClick={() => {
            navigate('create')
        }}>
            agregar hoja de consumo
        </PrimaryButton>
        lista de hojas de consumo
        {consumptionSheets.map(consumptionSheet => <ConsumptionSheetCard consumptionSheet={consumptionSheet} key={consumptionSheet.id}></ConsumptionSheetCard>)}
    </>);
}

export default IndexConsumptionSheet;