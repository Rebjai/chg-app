import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Form, useLocation, useParams } from "react-router-dom";
import Room from "../../Interfaces/room.interface";
import SelectOption from "../../Interfaces/select-option.interface";
import { useFetch } from "../../Utils/useFecth";
import PrimaryButton from "../utils/PrimaryButton";
import SelectInput from "../utils/SelectInput";
interface RoomFormProps {
    room?: Room
}
function RoomForm(props: RoomFormProps) {
    const fetch = useFetch()
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
    const [areaOptions, setAreaOptions] = useState<SelectOption[]>([
        { value: '', label: 'Obteniendo elementos' },
    ])
    const [roomData, setRoomData] = useState<Room>(props.room? props.room :{
        name: '',
        type: 0,
        status: 1,
        area_id: 1,
    });
    

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setRoomData((prevNewRoom) => ({ ...prevNewRoom, [name]: value }));
    };
    const handleTypeInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setRoomData((prevNewRoom) => {
            return { ...prevNewRoom, [name]: value }
        })
    };
    const handleAreaInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setRoomData((prevNewRoom) => {
            return { ...prevNewRoom, [name]: value }
        })
    };

    const handleCreateRoom = (event: React.FormEvent) => {
        if (roomData.id) {
            return console.log('Edit room:', roomData);
            
        }
        console.log('New room:', roomData);
    };
    useEffect(() => {
        fetch.get('/api/areas').then(v => {
            if (v.data.items.length) {
                setAreaOptions([{value: '', label: 'Seleccione una opción...'}].concat(v.data.items.map((el: any) => ({ value: el.id, label: `${el.name}` }))))
            }
            else{
                setAreaOptions([{value: '', label: 'No se encontraron áreas...'}])
            }
        })
    }, [null])

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">{!props.room ? t('create_new') : t('edit')} {t('room')}</h1>
            <Form onSubmit={handleCreateRoom} method={!props.room ? 'post' : 'put'}>
                <div className="flex flex-col mb-4">
                    <label htmlFor="name" className="mb-2 font-bold">
                        {t('name')}
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={roomData.name}
                        onChange={handleInputChange}
                        className="border border-gray-400 p-2"
                        required
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="area_id" className="mb-2 font-bold">
                    {t('area')}
                    </label>
                    <SelectInput options={areaOptions} onChange={handleAreaInputChange} value={roomData.area_id as unknown as string} name='area_id' />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="type" className="mb-2 font-bold">
                    {t('type')}
                    </label>
                    <SelectInput options={typeOptions} onChange={handleTypeInputChange} value={roomData.type as unknown as string} name='type' />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="status" className="mb-2 font-bold">
                    {t('status')}
                    </label>
                    <SelectInput options={statusOptions} onChange={handleTypeInputChange} value={roomData.status as unknown as string} name='status' />
                </div>
                <PrimaryButton type="submit" onClick={() => console.log('submit')}>
                    {!props.room ? t('create') : t('edit')}
                </ PrimaryButton>
            </Form>
        </div>
    );
}

export default RoomForm;