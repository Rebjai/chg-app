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
            <table className="min-w-full">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Product</th>
                        <th>quantity</th>
                        {auth.user.role == '1' ? null : <th>price</th>}
                        {auth.user.role == '1' ? null : <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>

                    {consumptionDetails?.length ? consumptionDetails.map(detail => (
                        <tr key={detail.id}>
                            <td>{detail.created_at?.toLocaleDateString()}</td>
                            <td>{detail.product?.name}</td>
                            <td>{detail.quantity}</td>
                            {auth.user.role == '1' ? null : <td>{detail.total}</td>}
                            {auth.user.role == '1' ? null :
                                <td>
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