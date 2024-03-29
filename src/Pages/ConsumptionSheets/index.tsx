import { useTranslation } from "react-i18next";
import { NavLink, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import ConsumptionSheetCard from "../../Components/consumptionSheet/ConsumptionSheetCard";
import PrimaryButton from "../../Components/utils/PrimaryButton";
import ConsumptionSheet from "../../Interfaces/consumptionSheet.interface";
import { useAuth } from "../../Utils/UseAuth";

function IndexConsumptionSheet() {
    const { t } = useTranslation()
    const {auth} = useAuth()
    const path = useLocation()
    let navigate = useNavigate()
    const consumptionSheets: ConsumptionSheet[] = useLoaderData() as ConsumptionSheet[]

    return (<>
        {auth.user.role != '1' && 
        <div className="flex text-center item gap-5 my-3">
            <NavLink 
                className={({ isActive, isPending }) =>
                    "rounded capitalize font-bold text-zinc-100 px-4 py-2 " + (isPending ? "bg-orange-500" : isActive ? "bg-green-500" : "bg-blue-500 px-4 py-2")
                }
                to={'/consumption-sheets'} end>
                {t('open')}</NavLink>
            <NavLink
                className={({ isActive, isPending }) =>
                    "rounded capitalize font-bold text-zinc-100 px-4 py-2 " + (isPending ? "bg-orange-500" : isActive ? "bg-green-500" : "bg-blue-500")
                }
                to={'/consumption-sheets/closed'} end>
                {t('closed')}</NavLink>

        </div>
}

        <PrimaryButton onClick={() => {
            navigate('/consumption-sheets/create')
        }}>
            {t('create')} {t('consumption_sheet')}
        </PrimaryButton>
        <h2 className="text-xl font-bold py-3 mt-5">{t('list_of')} {t('consumption_sheets')}</h2>
        {consumptionSheets.map(consumptionSheet => <ConsumptionSheetCard consumptionSheet={consumptionSheet} key={consumptionSheet.id}></ConsumptionSheetCard>)}
    </>);
}

export default IndexConsumptionSheet;