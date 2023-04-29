import { useTranslation } from "react-i18next";
import { useFetcher, useParams } from "react-router-dom";
import ConsumptionSheetDetail from "../../Interfaces/consumptionSheetDetail.interface";
import { useAuth } from "../../Utils/UseAuth";
import deleteIcon from "../../assets/delete-icon.svg";

interface ConsumptionDetailTableProps {
    consumptionDetails: ConsumptionSheetDetail[]
}

function ConsumptionDetailTable({ consumptionDetails }: ConsumptionDetailTableProps) {
    const { t } = useTranslation()
    const { auth } = useAuth()
    const fetcher = useFetcher()
    return (

        <div className="bg-green-100 rounded p-5">
            <table className="min-w-full border-spacing-5">
                <thead>
                    <tr className="">
                        <th className="px-3">Date</th>
                        <th className="px-3">Product</th>
                        <th className="px-3">quantity</th>
                        {auth.user.role == '1' ? null : <th className="px-3">price</th>}
                        {auth.user.role == '1' ? null : <th className="px-3">Actions</th>}
                    </tr>
                </thead>
                <tbody>

                    {consumptionDetails?.length ? consumptionDetails.map(detail => (
                        <tr key={detail.id}>
                            <td className="px-2">{detail.created_at?.toLocaleString()}</td>
                            <td className="px-2">{detail.product?.name}</td>
                            <td className="px-2">{detail.quantity}</td>
                            {auth.user.role == '1' ? null : <td className="px-2">{detail.total}</td>}
                            {auth.user.role == '1' ? null :
                                <td className="px-2">
                                    <fetcher.Form method="delete" action={"/consumption-sheet-details/" + detail.id} className="">
                                        <button type="submit" className="inline-block max-w-[100px] w-6/12">
                                            <img src={deleteIcon} alt={t('delete')!} />
                                        </button>
                                    </fetcher.Form>
                                </td>}
                        </tr>)
                    ) : (<tr>
                        <td colSpan={4} className="text-center">No data found</td>
                    </tr>)}
                </tbody>
            </table>
        </div>);
}

export default ConsumptionDetailTable;