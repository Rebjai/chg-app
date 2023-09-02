import { useTranslation } from "react-i18next";
import { useLoaderData, useNavigate } from "react-router-dom";
import ConsumptionSheetForm from "../../Components/consumptionSheet/ConsumptionSheetForm";
import ConsumptionDetailTable from "../../Components/consumptionSheetDetail/ConsumptionDetailTable";
import PrimaryButton from "../../Components/utils/PrimaryButton";
import ConsumptionSheet from "../../Interfaces/consumptionSheet.interface";
import { useAuth } from "../../Utils/UseAuth";
import { useFetch } from "../../Utils/useFecth";

function EditConsumptionSheet() {
    const { t } = useTranslation()
    const { auth } = useAuth()
    const fetch = useFetch()
    const navigate = useNavigate()
    const consumptionSheet: ConsumptionSheet = useLoaderData() as ConsumptionSheet
    console.log({ consumptionSheet });
    const downloadReport = async () => {
        try {
            const filename = 'reporte.xlsx'; // Set the desired filename

            // Replace 'your_api_endpoint' with the actual endpoint for downloading the report.
            await fetch.download(`/api/consumption-sheets/${consumptionSheet.id}/report`, filename);
        } catch (error) {
            console.error('Error downloading the report:', error);
        }
    }
    return (<>
        <div className="flex flex-col space-y-4">

            {auth.user.role != '1' ? <PrimaryButton type="button" onClick={downloadReport}>{t('download_report')}</PrimaryButton> : null}

            <PrimaryButton type="reset" onClick={() => { navigate('/consumption-sheets') }}>{t('back')}</PrimaryButton>
        </div>
        <h1 className="font-bold text-3xl m-2">
            {consumptionSheet?.id ? t('edit') : t('create')}
        </h1>
        {t('CONSUMPTION_SHEET.info')}
        <ConsumptionSheetForm consumptionSheet={consumptionSheet} />
        {consumptionSheet?.deleted_at && <ConsumptionDetailTable consumptionDetails={consumptionSheet.consumptions!}></ConsumptionDetailTable>}
    </>);
}

export default EditConsumptionSheet;