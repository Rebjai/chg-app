import { useState } from "react";
import { Form, useParams } from "react-router-dom";
import ConsumptionSheetDetail from "../../Interfaces/consumptionSheetDetail.interface";
import PrimaryButton from "../utils/PrimaryButton";
import SelectInput from "../utils/SelectInput";
interface ConsumptionSheetDetailFormProps {
    consumptionSheetDetail?: ConsumptionSheetDetail
}
function ConsumptionSheetDetailForm(props?: ConsumptionSheetDetailFormProps) {
    const consumptionSheetOptions = [
        { value: '', label: 'Selecciona un elemento de la lista' },
        { value: 1, label: '1' },
        { value: 2, label: '2' },
        { value: 3, label: '3' },
    ]
    const staffOptions = [
        { value: '', label: 'Selecciona un elemento de la lista' },
        { value: 1, label: 'Ocanita lavala Tinaco' },
        { value: 2, label: 'Inactive' },
        { value: 3, label: 'n/a' },
    ]
    const productOptions = [
        { value: '', label: 'Selecciona un elemento de la lista' },
        { value: 1, label: 'CS 500' },
        { value: 2, label: 'Inactive' },
        { value: 3, label: 'n/a' },
    ]
    const createConsumptionSheetDetail = !!!props?.consumptionSheetDetail?.id

    console.log({createConsumptionSheetDetail});
    
    const [newConsumptionSheetDetail, setNewConsumptionSheetDetail] = useState<ConsumptionSheetDetail>(props?.consumptionSheetDetail? props.consumptionSheetDetail:{
        id: 0,
        consumption_sheet_id: 1,
        staff_id: 1,
        product_id: 1,
        quantity: 0,
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        console.log({name, value});
        
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

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">{createConsumptionSheetDetail ? 'Create a new consumptionSheetDetail' : 'Edit consumptionSheetDetail'}</h1>
            <Form onSubmit={handleCreateConsumptionSheetDetail} method={createConsumptionSheetDetail?'post':'put'}>
                
                <div className="flex flex-col mb-4">
                    <label htmlFor="consumption_sheet_id" className="mb-2 font-bold">
                        Consumption Sheet
                    </label>
                    <SelectInput options={consumptionSheetOptions} onChange={handleTypeInputChange} value={newConsumptionSheetDetail.consumption_sheet_id.toString()} name='consumption_sheet_id' />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="staff_id" className="mb-2 font-bold">
                        staff
                    </label>
                    <SelectInput options={staffOptions} onChange={handleTypeInputChange} value={newConsumptionSheetDetail.staff_id.toString()} name='staff_id' />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="product_id" className="mb-2 font-bold">
                        Product
                    </label>
                    <SelectInput options={productOptions} onChange={handleTypeInputChange} value={newConsumptionSheetDetail.product_id.toString()} name='product_id' />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="quantity" className="mb-2 font-bold">
                        Quantity
                    </label>
                    <input
                        type="number"
                        name="quantity"
                        id="quantity"
                        value={newConsumptionSheetDetail.quantity}
                        onChange={handleInputChange}
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
                    {createConsumptionSheetDetail ? 'Create ConsumptionSheetDetail' : 'Edit ConsumptionSheetDetail'}
                </ PrimaryButton>
            </Form>
        </div>
    );
}

export default ConsumptionSheetDetailForm;