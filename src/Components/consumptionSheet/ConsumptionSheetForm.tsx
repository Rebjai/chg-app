import { useEffect, useState } from "react";
import { Form, useParams } from "react-router-dom";
import ConsumptionSheet from "../../Interfaces/consumptionSheet.interface";
import Patient from "../../Interfaces/patient.interface";
import Room from "../../Interfaces/room.interface";
import { useFetch } from "../../Utils/useFecth";
import PrimaryButton from "../utils/PrimaryButton";
import SelectInput from "../utils/SelectInput";
interface ConsumptionSheetFormProps {
    consumptionSheet?: ConsumptionSheet,
    roomOptions?: { value: any, label: string }[],
    patientOptions?: { value: any, label: string }[],
}
function ConsumptionSheetForm(props?: ConsumptionSheetFormProps) {
    const fetch = useFetch()
    useEffect(() => {
        fetch.get('/api/patients').then(res => setPatientOptions(res.data.map((el: Patient) => ({ value: el.id, label: `${el.name} ${el.first_surname} ${el.second_surname}` }))))
        fetch.get('/api/rooms').then(res => setRoomOptions(res.data.map((el: Room) => ({ value: el.id, label: el.name }))))
    }, [])
    console.log({ rooms: props?.roomOptions });
    const [patientOptions, setPatientOptions] = useState(props?.roomOptions ?? [
        { value: '', label: 'Selecciona un elemento de la lista' },
        { value: 1, label: 'Jesus Rebollar' },
        { value: 2, label: 'Fulano Detal' },
        { value: 3, label: 'n/a' },
    ])
    const [roomOptions, setRoomOptions] = useState(props?.roomOptions ?? [
        { value: '', label: 'Selecciona un elemento de la lista' },
        { value: 1, label: '201' },
        { value: 2, label: 'ER' },
        { value: 3, label: 'n/a' },
    ])
    const createConsumptionSheet = !!!props?.consumptionSheet?.id

    console.log({ createConsumptionSheet });

    const [newConsumptionSheet, setNewConsumptionSheet] = useState<ConsumptionSheet>(props?.consumptionSheet ? props.consumptionSheet : {
        id: 0,
        patient_id: 1,
        room_id: 0,
        diagnosis: '',
        doctor: '',
        admission_date: new Date().toISOString().split('T')[0],
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        console.log({ name, value });

        setNewConsumptionSheet((prevNewConsumptionSheet) => ({ ...prevNewConsumptionSheet, [name]: value }));
    };
    const handleTypeInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        console.log({ event });

        setNewConsumptionSheet((prevNewConsumptionSheet) => ({ ...prevNewConsumptionSheet, [name]: value }));
    };

    const handleCreateConsumptionSheet = (event: React.FormEvent) => {
        // event.preventDefault();
        console.log('New consumptionSheet:', newConsumptionSheet);
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">{createConsumptionSheet ? 'Create a new consumptionSheet' : 'Edit consumptionSheet'}</h1>
            <Form onSubmit={handleCreateConsumptionSheet} method={createConsumptionSheet ? 'post' : 'put'}>
                <div className="flex flex-col mb-4">
                    <label htmlFor="name" className="mb-2 font-bold">
                        Doctor
                    </label>
                    <input
                        type="text"
                        name="doctor"
                        id="doctor"
                        value={newConsumptionSheet.doctor}
                        onChange={handleInputChange}
                        className="border border-gray-400 p-2"
                        required
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="first_surname" className="mb-2 font-bold">
                        Diagnosis
                    </label>
                    <input
                        type="text"
                        name="diagnosis"
                        id="diagnosis"
                        value={newConsumptionSheet.diagnosis}
                        onChange={handleInputChange}
                        className="border border-gray-400 p-2"
                        required
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="type" className="mb-2 font-bold">
                        Date of admission
                    </label>
                    <input
                        type="date"
                        name="admission_date"
                        id="admission_date"
                        value={newConsumptionSheet.admission_date}
                        onChange={handleInputChange}
                        className="border border-gray-400 p-2"
                        required
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="type" className="mb-2 font-bold">
                        Patient
                    </label>
                    <SelectInput options={patientOptions} onChange={handleTypeInputChange} value={newConsumptionSheet.patient_id.toString()} name='patient_id' />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="type" className="mb-2 font-bold">
                        Room
                    </label>
                    <SelectInput options={roomOptions} onChange={handleTypeInputChange} value={newConsumptionSheet.room_id.toString()} name='room_id' />
                </div>
                <PrimaryButton type="submit" onClick={() => console.log('submit')}>
                    {createConsumptionSheet ? 'Create ConsumptionSheet' : 'Edit ConsumptionSheet'}
                </ PrimaryButton>
            </Form>
        </div>
    );
}

export default ConsumptionSheetForm;