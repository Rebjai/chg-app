import { useTranslation } from "react-i18next";
import { useLoaderData, useNavigate } from "react-router-dom";
import ConsumptionSheetForm from "../../Components/consumptionSheet/ConsumptionSheetForm";
import ConsumptionDetailTable from "../../Components/consumptionSheetDetail/ConsumptionDetailTable";
import PrimaryButton from "../../Components/utils/PrimaryButton";
import ConsumptionSheet from "../../Interfaces/consumptionSheet.interface";

function EditConsumptionSheet() {
    const {t} = useTranslation()
    const navigate = useNavigate()
    const consumptionSheet: ConsumptionSheet = useLoaderData() as ConsumptionSheet
    console.log({ consumptionSheet });

    return (<>

        <PrimaryButton type="reset" onClick={() => { navigate('/consumption-sheets') }}>{t('back')}</PrimaryButton>
        <h1 className="font-bold text-3xl m-2">
            {consumptionSheet?.id ? t('edit') : t('create')}
        </h1>
        {t('CONSUMPTION_SHEET.info')}
        <ConsumptionSheetForm consumptionSheet={consumptionSheet} />
        {consumptionSheet?.deleted_at && <ConsumptionDetailTable consumptionDetails={consumptionSheet.consumptions!}></ConsumptionDetailTable>}
    </>);
}

export default EditConsumptionSheet;