import { useTranslation } from "react-i18next";
import { useFetcher, useParams } from "react-router-dom";
import ConsumptionSheetDetail from "../../Interfaces/consumptionSheetDetail.interface";
import { useAuth } from "../../Utils/UseAuth";
import deleteIcon from "../../assets/delete-icon.svg";
import editIcon from "../../assets/edit-icon.svg";
import cancelIcon from "../../assets/cancel-icon.svg";
import { useState } from "react";

interface ConsumptionDetailTableProps {
    consumptionDetails: ConsumptionSheetDetail[]
}

function ConsumptionDetailTable({ consumptionDetails }: ConsumptionDetailTableProps) {
    const { t } = useTranslation()
    const { auth } = useAuth()
    const fetcher = useFetcher()
    const [enabledInputsIndex, setEnabledInputsIndex] = useState(-1);
    const [updatedQuantity, setUpdatedQuantity] = useState(0);
    const [updatedTotal, setUpdatedTotal] = useState(0);

    const enableInputs = (index: number) => {
        setEnabledInputsIndex(index);
        setUpdatedQuantity(consumptionDetails[index].quantity)
        setUpdatedTotal(consumptionDetails[index].total!)
    };


    return (
        <div className="bg-green-100 rounded p-5 max-w-full overflow-x-auto">
            <table className="min-w-full border-spacing-5">
                <thead>
                    <tr className="">
                        <th className="px-3">{t('date')}</th>
                        <th className="px-3">{t('product')}</th>
                        <th className="px-3">{t('quantity')}</th>
                        {auth.user.role == "1" ? null : <th className="px-3">{t('price')}</th>}
                        <th className="px-3 max-w-min">{t('actions')}</th>
                    </tr>
                </thead>
                <tbody>
                    {consumptionDetails?.length ? consumptionDetails.map((detail, index) => (
                        <tr key={detail.id}>
                            <td className="px-2">{detail.created_at?.toLocaleString()}</td>
                            <td className="px-2">{detail.product?.name}{auth.user.role != '1' ? ' - ' + detail.product?.category?.code : ''}</td>
                            <td className="px-2">
                                <input
                                    name="quantity"
                                    type="number"
                                    defaultValue={detail.quantity}
                                    onChange={(e) => setUpdatedQuantity(parseFloat(e.target.value))}
                                    className="border inline rounded p-1 text-center"
                                    disabled={enabledInputsIndex !== index}
                                />
                            </td>
                            {auth.user.role == '1' ? null : <td className="px-2">{

                                <input
                                    name="total"
                                    type="number"
                                    defaultValue={detail.total}
                                    onChange={(e) => setUpdatedTotal(parseFloat(e.target.value))}
                                    className="border inline rounded p-1 text-center"
                                    disabled={enabledInputsIndex !== index}
                                />
                            }</td>}
                            <td className="">

                                <div className="flex">
                                    {enabledInputsIndex === index ?
                                        <fetcher.Form method="post" action={"/consumption-sheet-details/" + detail.id} className="flex m-auto justify-center" onSubmit={() => setEnabledInputsIndex(-1)}>
                                            <input type="hidden" name="consumption_sheet_id" value={detail.consumption_sheet_id} />
                                            <input type="hidden" name="product_id" value={detail.product_id} />
                                            <input type="hidden" name="staff_id" value={detail.staff_id} />
                                            <input type="hidden" name="user_id" value={detail.user_id} />
                                            <input type="hidden" name="quantity" value={updatedQuantity} />
                                            <input type="hidden" name="total" value={updatedTotal} />
                                            <button type="submit" className="inline-block max-w-[100px] w-6/12">
                                                <img src={editIcon} alt={t('update')!} />
                                            </button>
                                        </fetcher.Form> :
                                        <fetcher.Form method="delete" action={"/consumption-sheet-details/" + detail.id} className="flex m-auto justify-center">
                                            <button type="submit" className="inline-block max-w-[100px] w-6/12">
                                                <img src={deleteIcon} alt={t('delete')!} />
                                            </button>
                                        </fetcher.Form>}

                                    {auth.user.role != '1' &&


                                        <div className="flex m-auto justify-center">
                                            <button type="button" onClick={() => enabledInputsIndex !== index ? enableInputs(index) : setEnabledInputsIndex(-1)} className="inline-block max-w-[100px] w-6/12">
                                                {enabledInputsIndex === index ? (
                                                    <img src={cancelIcon} alt={t('save')!} />
                                                ) : (
                                                    <img src={editIcon} alt={t('update')!} />
                                                )}
                                            </button>
                                        </div>
                                    }
                                </div>

                            </td>
                        </tr>)
                    ) : (<tr>
                        <td colSpan={4} className="text-center">No data found</td>
                    </tr>)}

                </tbody>
            </table>
        </div>
    );

}

export default ConsumptionDetailTable;