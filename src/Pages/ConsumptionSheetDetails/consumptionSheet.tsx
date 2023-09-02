import { useTranslation } from "react-i18next";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import ConsumptionDetailTable from "../../Components/consumptionSheetDetail/ConsumptionDetailTable";
import ConsumptionSheetDetailForm from "../../Components/consumptionSheetDetail/ConsumptionSheetDetailForm";
import PrimaryButton from "../../Components/utils/PrimaryButton";
import ConsumptionSheetDetail from "../../Interfaces/consumptionSheetDetail.interface";
import { useFetch } from "../../Utils/useFecth";
import { useAuth } from "../../Utils/UseAuth";


function ConsumptionSheetDetailsPage() {

    const fetch = useFetch()
    const {auth} = useAuth()
    const { t } = useTranslation()
    const navigate = useNavigate()
    const consumptionSheetDetails: ConsumptionSheetDetail[] = useLoaderData() as ConsumptionSheetDetail[]
    console.log({ consumptionSheetDetails });
    const { consumptionSheetId } = useParams()

    const downloadReport = async () => {
        try {
            const filename = 'reporte.xlsx'; // Set the desired filename

            // Replace 'your_api_endpoint' with the actual endpoint for downloading the report.
            await fetch.download(`/api/consumption-sheets/${consumptionSheetId}/report`, filename);
        } catch (error) {
            console.error('Error downloading the report:', error);
        }
    }



    return (<>
        <div className="flex flex-col space-y-4">
            <PrimaryButton type="reset" onClick={() => { navigate('/consumption-sheets') }}>{t('back')}</PrimaryButton>
            {auth.user.role != '1'? <PrimaryButton type="button" onClick={downloadReport}>{t('download_report')}</PrimaryButton>: null}
        </div>
        <div className="my-5">
            <ConsumptionSheetDetailForm consumptionSheetId={parseInt(consumptionSheetId!)} />
        </div>
        <div className="my-5 max-w-full">

            <h1 className="font-bold text-3xl m-2">
                {t('consumption_details')}
            </h1>
            <ConsumptionDetailTable consumptionDetails={consumptionSheetDetails} />
        </div>
    </>);
}

export default ConsumptionSheetDetailsPage;