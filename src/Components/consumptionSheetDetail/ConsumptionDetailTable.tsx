import ConsumptionSheetDetail from "../../Interfaces/consumptionSheetDetail.interface";
import { useAuth } from "../../Utils/UseAuth";

interface ConsumptionDetailTableProps {
    consumptionDetails: ConsumptionSheetDetail[]
}

function ConsumptionDetailTable({ consumptionDetails }: ConsumptionDetailTableProps) {
    const { auth } = useAuth()
    return (

        <div className="bg-green-100 rounded p-5">
            <table className="min-w-full">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Product</th>
                        <th>quantity</th>
                        {auth.user.role == '1' ? null : <th>price</th>}
                    </tr>
                </thead>
                <tbody>

                    {consumptionDetails?.length ? consumptionDetails.map(detail => (
                        <tr key={detail.id}>
                            <td>{detail.created_at?.toLocaleDateString()}</td>
                            <td>{detail.product?.name}</td>
                            <td>{detail.quantity}</td>
                            {auth.user.role == '1' ? null : <td>{detail.total}</td>}
                        </tr>)
                    ) : (<tr>
                        <td colSpan={4} className="text-center">No data found</td>
                    </tr>)}
                </tbody>
            </table>
        </div>);
}

export default ConsumptionDetailTable;