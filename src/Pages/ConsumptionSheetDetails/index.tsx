import { useLoaderData, useNavigate } from "react-router-dom";
import ConsumptionSheetDetailCard from "../../Components/consumptionSheetDetail/ConsumptionSheetDetailCard";
import PrimaryButton from "../../Components/utils/PrimaryButton";
import ConsumptionSheetDetail from "../../Interfaces/consumptionSheetDetail.interface";

function IndexConsumptionSheetDetail() {
    let navigate = useNavigate()
    const consumptionSheetDetails: ConsumptionSheetDetail[] = useLoaderData() as ConsumptionSheetDetail[]
    
    return (<>
        <PrimaryButton onClick={() => {
            navigate('create')
        }}>
            agregar detalles de hoja de consumo
        </PrimaryButton>
        lista de detalles de hojas de consumo
        {consumptionSheetDetails.map(consumptionSheetDetail => <ConsumptionSheetDetailCard consumptionSheetDetail={consumptionSheetDetail} key={consumptionSheetDetail.id}></ConsumptionSheetDetailCard>)}
    </>);
}

export default IndexConsumptionSheetDetail;