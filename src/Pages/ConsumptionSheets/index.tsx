import { useTranslation } from "react-i18next";
import { useLoaderData, useNavigate } from "react-router-dom";
import ConsumptionSheetCard from "../../Components/consumptionSheet/ConsumptionSheetCard";
import PrimaryButton from "../../Components/utils/PrimaryButton";
import ConsumptionSheet from "../../Interfaces/consumptionSheet.interface";

function IndexConsumptionSheet() {
    const {t} = useTranslation()
    let navigate = useNavigate()
    const consumptionSheets: ConsumptionSheet[] = useLoaderData() as ConsumptionSheet[]
    
    return (<>
        <PrimaryButton onClick={() => {
            navigate('create')
        }}>
            {t('create')} {t('consumption_sheet')}
        </PrimaryButton>
        {t('list_of')} {t('consumption_sheets')}
        {consumptionSheets.map(consumptionSheet => <ConsumptionSheetCard consumptionSheet={consumptionSheet} key={consumptionSheet.id}></ConsumptionSheetCard>)}
    </>);
}

export default IndexConsumptionSheet;