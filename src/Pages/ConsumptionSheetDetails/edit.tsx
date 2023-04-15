import { useTranslation } from "react-i18next";
import { useLoaderData, useNavigate } from "react-router-dom";
import ConsumptionSheetDetailForm from "../../Components/consumptionSheetDetail/ConsumptionSheetDetailForm";
import PrimaryButton from "../../Components/utils/PrimaryButton";
import ConsumptionSheetDetail from "../../Interfaces/consumptionSheetDetail.interface";

function EditConsumptionSheetDetail() {
    const {t} = useTranslation()
    const navigate = useNavigate()
    const consumptionSheetDetail :ConsumptionSheetDetail = useLoaderData() as ConsumptionSheetDetail
    // console.log({consumptionSheetDetail});
    
    return ( <>

    <PrimaryButton type="reset" onClick={()=>{navigate('/consumption-sheet-details')}}>{t('back')}</PrimaryButton>
    <h1 className="font-bold text-3xl m-2">
    {consumptionSheetDetail?.id?t('edit'):t('create')}
    </h1>
    {t('info_for')} {t('consumption_detail')}informacion de la hoja de consumo
    <ConsumptionSheetDetailForm consumptionSheetDetail={consumptionSheetDetail}/>
    </> );
}

export default EditConsumptionSheetDetail;