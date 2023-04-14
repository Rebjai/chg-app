import { useTranslation } from "react-i18next";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import ConsumptionDetailTable from "../../Components/consumptionSheetDetail/ConsumptionDetailTable";
import ConsumptionSheetDetailForm from "../../Components/consumptionSheetDetail/ConsumptionSheetDetailForm";
import PrimaryButton from "../../Components/utils/PrimaryButton";
import ConsumptionSheetDetail from "../../Interfaces/consumptionSheetDetail.interface";

function ConsumptionSheetDetailsPage() {
    const {t} = useTranslation()
    const navigate = useNavigate()
    const consumptionSheetDetails: ConsumptionSheetDetail[] = useLoaderData() as ConsumptionSheetDetail[]
    console.log({ consumptionSheetDetails });
    const { consumptionSheetId } = useParams()


    return (<>

        <PrimaryButton type="reset" onClick={() => { navigate('/consumption-sheets') }}>Back</PrimaryButton>
        <div className="my-5">
            <ConsumptionSheetDetailForm consumptionSheetId={parseInt(consumptionSheetId!)} />
        </div>
        <div className="my-5">

            <h1 className="font-bold text-3xl m-2">
                {t('consumption_details')}
            </h1>
            <ConsumptionDetailTable consumptionDetails={consumptionSheetDetails} />
        </div>
    </>);
}

export default ConsumptionSheetDetailsPage;