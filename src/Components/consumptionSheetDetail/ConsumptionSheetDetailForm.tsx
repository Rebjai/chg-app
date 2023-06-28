import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Form, useParams } from "react-router-dom";
import ConsumptionSheet from "../../Interfaces/consumptionSheet.interface";
import ConsumptionSheetDetail from "../../Interfaces/consumptionSheetDetail.interface";
import SelectOption from "../../Interfaces/select-option.interface";
import { useAuth } from "../../Utils/UseAuth";
import { useDebounce } from "../../Utils/UseDebounce";
import { useFetch } from "../../Utils/useFecth";
import PrimaryButton from "../utils/PrimaryButton";
import SelectInput from "../utils/SelectInput";
interface ConsumptionSheetDetailFormProps {
    consumptionSheetDetail?: ConsumptionSheetDetail,
    consumptionSheetId?: number
}

function ConsumptionSheetDetailForm(props?: ConsumptionSheetDetailFormProps) {
    const { t } = useTranslation()
    const [searchTerm, setSearchTerm] = useState('')


    const { auth } = useAuth()
    const [consumptionSheetOptions, setConsumptionSheetOptions] = useState<SelectOption[]>(auth?.user?.profile ? [{ value: auth.user.profile.id!, label: `${auth.user.profile.name} ${auth.user.profile.first_surname} ${auth.user.profile.second_surname}` }] : [
        { value: '', label: 'Obteniendo elementos' },
    ])
    const [staffOptions, setStaffOptions] = useState<SelectOption[]>(auth?.user?.profile ? [{ value: auth.user.profile.id!, label: `${auth.user.profile.name} ${auth.user.profile.first_surname} ${auth.user.profile.second_surname}` }] : [
        { value: '', label: 'Selecciona un elemento de la lista' },
        { value: 1, label: 'Ocanita lavala Tinaco' },
        { value: 2, label: 'Inactive' },
        { value: 3, label: 'n/a' },
    ])
    const [productOptions, setProductOptions] = useState<SelectOption[]>([
        { value: '', label: 'Selecciona un elemento de la lista' },
        { value: 1, label: 'CS 500' },
        { value: 2, label: 'Inactive' },
        { value: 3, label: 'n/a' },
    ])
    const createConsumptionSheetDetail = !!!props?.consumptionSheetDetail?.id
    const fetch = useFetch()
    console.log({ createConsumptionSheetDetail });
    console.log({ val: !!props?.consumptionSheetId });

    const [newConsumptionSheetDetail, setNewConsumptionSheetDetail] = useState<ConsumptionSheetDetail>(props?.consumptionSheetDetail ? props.consumptionSheetDetail : {
        id: 0,
        consumption_sheet_id: props?.consumptionSheetId ?? 0,
        staff_id: auth.user.profile?.id ?? 0,
        product_id: 1,
        user_id: auth.user.id ?? 0,
        quantity: 0,
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        console.log({ name, value });

        setNewConsumptionSheetDetail((prevNewConsumptionSheetDetail) => ({ ...prevNewConsumptionSheetDetail, [name]: value }));
    };
    const handleTypeInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        console.log({ event });

        setNewConsumptionSheetDetail((prevNewConsumptionSheetDetail) => ({ ...prevNewConsumptionSheetDetail, [name]: value }));
    };

    const handleCreateConsumptionSheetDetail = (event: React.FormEvent) => {
        // event.preventDefault();
        console.log('New consumptionSheetDetail:', newConsumptionSheetDetail);
    };
    const filterProducts = (value: string) => {
        fetch.get('/api/products' + '?name=' + searchTerm).then(v => {
            setProductOptions(v.data.items.map((el: any) => ({ value: el.id, label: `${el.name}` })))
        })
    }
    const debouncedSearchTerm = useDebounce(searchTerm, 700, filterProducts);

    useEffect(() => {
        fetch.get('/api/staff').then(v => {
            setStaffOptions(v.data.map((el: any) => ({ value: el.id, label: `${el.name} ${el.first_surname} ${el.second_surname}` })))
        })
        if (!props?.consumptionSheetId)
            fetch.get('/api/consumption-sheets').then(v => {
                setConsumptionSheetOptions(v.data.map((el: ConsumptionSheet) => ({ value: el.id, label: `${el.admission_date} - ${el.id}` })))
            })
            setConsumptionSheetOptions([{value: props?.consumptionSheetId!, label: ''}])
    }, [null])
    useEffect(() => {
        fetch.get('/api/products').then(v => {
            setProductOptions(v.data.items.map((el: any) => ({ value: el.id, label: `${el.name}` })))
        })
    }, [null])

    return (
        <div className="container mx-auto">
            {!props?.consumptionSheetId}
            <h1 className="text-2xl font-bold mb-4">{createConsumptionSheetDetail ? t('create_new') : t('edit')} {t('consumption_detail')}</h1>
            <Form onSubmit={handleCreateConsumptionSheetDetail} method={createConsumptionSheetDetail ? 'post' : 'put'}>
                <input type="hidden" name="user_id" value={newConsumptionSheetDetail.user_id} />
                <div className={"flex flex-col mb-4" + (props?.consumptionSheetId ? " hidden" : '')}>

                    <label htmlFor="consumption_sheet_id" className="mb-2 font-bold">
                        {t('Consumption Sheet')}
                    </label>
                    <SelectInput options={consumptionSheetOptions} hidden={!props?.consumptionSheetId} onChange={handleTypeInputChange} value={props?.consumptionSheetId?.toString()!} name='consumption_sheet_id' />
                </div>
                <div className={(auth.user.role == '1' ? 'hidden ' : '') + "flex flex-col mb-4"}>
                    <label htmlFor="staff_id" className="mb-2 font-bold" hidden={auth.user.role == '1'}>
                        {t('staff')}
                    </label>
                    <SelectInput options={staffOptions} hidden={auth.user.role == '1'} onChange={handleTypeInputChange} value={newConsumptionSheetDetail.staff_id?.toString()} name='staff_id' />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="product_id" className="mb-2 font-bold">
                        {t('product')}
                    </label>
                    <input className="m-5 p-3 text-center" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={(e)=> e.key == 'Enter'? e.preventDefault(): e} type="text" name="seach" id="search" placeholder={t('search') ?? 'search'} />
                    <SelectInput options={productOptions} onChange={handleTypeInputChange} value={newConsumptionSheetDetail.product_id.toString()} name='product_id' />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="quantity" className="mb-2 font-bold">
                        {t('quantity')}
                    </label>
                    <input
                        type="number"
                        name="quantity"
                        id="quantity"
                        value={newConsumptionSheetDetail.quantity}
                        onChange={handleInputChange}
                        min='0'
                        className="border border-gray-400 p-2"
                        required
                    />
                </div>
                {/* <div className="flex flex-col mb-4">
                    <label htmlFor="total" className="mb-2 font-bold">
                        total
                    </label>
                    <input
                        type="text"
                        name="total"
                        id="total"
                        value={newConsumptionSheetDetail.total}
                        onChange={handleInputChange}
                        className="border border-gray-400 p-2"
                        required
                    />
                </div> */}
                <PrimaryButton type="submit" onClick={() => console.log('submit')}>
                    {createConsumptionSheetDetail ? t('create') : t('edit')} {t('consumption_detail')}
                </ PrimaryButton>
            </Form>
        </div>
    );
}

export default ConsumptionSheetDetailForm;