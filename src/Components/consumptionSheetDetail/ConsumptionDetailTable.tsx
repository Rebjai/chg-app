import ConsumptionSheetDetail from "../../Interfaces/consumptionSheetDetail.interface";

interface ConsumptionDetailTableProps {
    consumptionDetails: ConsumptionSheetDetail[]
}

function ConsumptionDetailTable({ consumptionDetails }: ConsumptionDetailTableProps) {
    return (

        <div className="bg-green-100 rounded">
            <table className="min-w-full">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Product</th>
                        <th>quantity</th>
                        <th>price</th>
                    </tr>
                </thead>
                <tbody>

                    {consumptionDetails?.length ? consumptionDetails.map(detail => (
                        <tr key={detail.id}>
                            <td>{detail.created_at?.toLocaleDateString()}</td>
                            <td>{detail.product?.name}</td>
                            <td>{detail.quantity}</td>
                            <td>{detail.total}</td>
                        </tr>)
                    ) : (<tr>
                        <td>date</td>
                        <td>prod1</td>
                        <td>qt1</td>
                        <td>price</td>
                    </tr>)}
                </tbody>
            </table>
        </div>);
}

export default ConsumptionDetailTable;