import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Form, useLocation, useParams } from "react-router-dom";
import Area from "../../Interfaces/area.interface";
import PrimaryButton from "../utils/PrimaryButton";
import SelectInput from "../utils/SelectInput";
interface AreaFormProps {
    area?: Area
}
function AreaForm(props: AreaFormProps) {
    const {t} = useTranslation()
    const typeOptions = [
        { value: '', label: 'Selecciona un elemento de la lista' },
        { value: 1, label: 'Normal' },
        { value: 2, label: 'ICU' },
        { value: 3, label: 'n/a' },
    ]
    const statusOptions = [
        { value: '', label: 'Selecciona un elemento de la lista' },
        { value: 0, label: 'Occupied' },
        { value: 1, label: 'Available' },
        { value: 2, label: 'Maintenance' },
        { value: 3, label: 'n/a' },
    ]
    const areaOptions = [
        { value: '', label: 'Selecciona un elemento de la lista' },
        { value: 1, label: 'Main Floor'},
        { value: 2, label: 'QX' },
        { value: 3, label: 'Hospitalization'},
        { value: 4, label: 'n/a' },
    ]
    const [areaData, setAreaData] = useState<Area>(props.area? props.area :{
        name: '',
    });
    

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setAreaData((prevNewArea) => ({ ...prevNewArea, [name]: value }));
    };
    const handleTypeInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setAreaData((prevNewArea) => {
            return { ...prevNewArea, [name]: value }
        })
    };
    const handleAreaInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setAreaData((prevNewArea) => {
            return { ...prevNewArea, [name]: value }
        })
    };

    const handleCreateArea = (event: React.FormEvent) => {
        if (areaData.id) {
            return console.log('Edit area:', areaData);
            
        }
        console.log('New area:', areaData);
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">{!props.area ? t('create') : t('edit')} {t('area')}</h1>
            <Form onSubmit={handleCreateArea} method={!props.area ? 'post' : 'put'}>
                <div className="flex flex-col mb-4">
                    <label htmlFor="name" className="mb-2 font-bold">
                        {t('name')}
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={areaData.name}
                        onChange={handleInputChange}
                        className="border border-gray-400 p-2"
                        required
                    />
                </div>
                <PrimaryButton type="submit" onClick={() => console.log('submit')}>
                    {!props.area ? t('create') : t('edit')}
                </ PrimaryButton>
            </Form>
        </div>
    );
}

export default AreaForm;