import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Form, Link, useFetcher, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ConsumptionSheet from "../../Interfaces/consumptionSheet.interface";
import Patient from "../../Interfaces/patient.interface";
import Room from "../../Interfaces/room.interface";
import { useAuth } from "../../Utils/UseAuth";
import { useFetch } from "../../Utils/useFecth";
import PrimaryButton from "../utils/PrimaryButton";
import SelectInput from "../utils/SelectInput";
interface ConsumptionSheetFormProps {
    consumptionSheet?: ConsumptionSheet,
    roomOptions?: { value: any, label: string }[],
    patientOptions?: { value: any, label: string }[],
}
function ConsumptionSheetForm(props?: ConsumptionSheetFormProps) {
    const { auth } = useAuth()
    const { t } = useTranslation()
    const fetch = useFetch()
    const navigate = useNavigate()
    useEffect(() => {
        fetch.get('/api/rooms?status=1&include='+props?.consumptionSheet?.room_id).then(res => {
            return setRoomOptions(
                res.data.items.map((el: Room) => ({ value: el.id, label: el.name })))
        })
        if (props?.consumptionSheet?.id) {
            return setPatientOptions([{value: props.consumptionSheet.patient_id, label: `${props.consumptionSheet.patient?.name!} ${props.consumptionSheet.patient?.first_surname!} ${props.consumptionSheet.patient?.second_surname!}`}])
        }
        fetch.get('/api/patients?with_consumption=false').then(res => setPatientOptions(!res.data.length? [{value: '', label: 'No se encontraron pacientes sin hoja de consumo'}]:res.data.map((el: Patient) => ({ value: el.id, label: `${el.name} ${el.first_surname} ${el.second_surname}` }))))
        
    }, [])
    console.log({ rooms: props?.roomOptions });
    const [patientOptions, setPatientOptions] = useState(props?.roomOptions ?? [
        { value: '', label: 'Selecciona un elemento de la lista' },
        { value: 0, label: 'Espera mientras se obtienen los resultados' },
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
    const closeConsumptionSheet = async () => {
        const response = await fetch.delete("/api/consumption-sheets/" + newConsumptionSheet.id + '/close')
        if (response.status != 200)
            throw response
        toast.success('Hoja Finalizada Correctamente')
        navigate('/consumption-sheets/closed')

    }

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">{createConsumptionSheet ? t('create') : t('edit')} {t('consumption_sheet')}</h1>
            <Form onSubmit={handleCreateConsumptionSheet} method={createConsumptionSheet ? 'post' : 'put'}>
                <div className="flex flex-col mb-4">
                    <label htmlFor="name" className="mb-2 font-bold">
                        {t('doctor')}
                    </label>
                    <input
                        type="text"
                        name="doctor"
                        id="doctor"
                        value={newConsumptionSheet.doctor}
                        onChange={handleInputChange}
                        className="border border-gray-400 p-2"
                        required
                        disabled={!!newConsumptionSheet.deleted_at}
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="first_surname" className="mb-2 font-bold">
                        {t('diagnosis')}
                    </label>
                    <input
                        type="text"
                        name="diagnosis"
                        id="diagnosis"
                        value={newConsumptionSheet.diagnosis}
                        onChange={handleInputChange}
                        className="border border-gray-400 p-2"
                        required
                        disabled={!!newConsumptionSheet.deleted_at}
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="type" className="mb-2 font-bold">
                        {t('date_of_admission')}
                    </label>
                    <input
                        type="date"
                        name="admission_date"
                        id="admission_date"
                        value={newConsumptionSheet.admission_date}
                        onChange={handleInputChange}
                        className="border border-gray-400 p-2"
                        required
                        disabled={!!newConsumptionSheet.deleted_at}

                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="type" className="mb-2 font-bold">
                        {t('patient')}
                    </label>
                    <SelectInput options={patientOptions}
                        disabled={!!newConsumptionSheet.id}
                        onChange={handleTypeInputChange} value={newConsumptionSheet.patient_id.toString()} name='patient_id' />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="type" className="mb-2 font-bold">
                        {t('room')}
                    </label>
                    <SelectInput options={roomOptions}
                        disabled={!!newConsumptionSheet.deleted_at}
                        onChange={handleTypeInputChange} value={newConsumptionSheet.room_id.toString()} name='room_id' />
                </div>
                {!!newConsumptionSheet.id && !!newConsumptionSheet.consumptions?.length && (<div className="flex flex-col mb-4">
                    <label htmlFor="name" className="mb-2 font-bold capitalize text-gray-500">
                        {t('total')}
                    </label>
                    <input
                        type="text"
                        name="total"
                        id="total"
                        value={newConsumptionSheet.total ?? 0}
                        onChange={handleInputChange}
                        className="border border-gray-400 p-2 text-gray-500 bg-green-100 font-bold"
                        required
                        disabled={true}
                    />
                </div>)}
                <div className="flex flex-col items-center gap-5">
                    {!newConsumptionSheet.deleted_at && <PrimaryButton type="submit" onClick={() => console.log('submit')}>
                        {createConsumptionSheet ? t('create') : t('edit')} {t('consumption_sheet')}
                    </ PrimaryButton>}

                    <button hidden={(auth.user.role != '10' && auth.user.role != '2') || !newConsumptionSheet.id || !!newConsumptionSheet.deleted_at}
                        type="button"
                        onClick={closeConsumptionSheet}
                        className="rounded bg-orange-500 py-2 px-4 font-bold text-zinc-200 hover:cursor-pointer hover:bg-orange-400">
                        <p >
                            {t('finish')!}
                        </p>
                    </button>
                </div>
            </Form>
        </div>
    );
}

export default ConsumptionSheetForm;