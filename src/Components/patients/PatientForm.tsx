import { useState } from "react";
import { Form, useParams } from "react-router-dom";
import Patient from "../../Interfaces/patient.interface";
import PrimaryButton from "../utils/PrimaryButton";
import SelectInput from "../utils/SelectInput";
interface PatientFormProps {
    patient?: Patient
}
function PatientForm(props?: PatientFormProps) {
    const typeOptions = [
        { value: '', label: 'Selecciona un elemento de la lista' },
        { value: 1, label: 'Normal' },
        { value: 2, label: 'ICU' },
        { value: 3, label: 'n/a' },
    ]
    const statusOptions = [
        { value: '', label: 'Selecciona un elemento de la lista' },
        { value: 1, label: 'Active' },
        { value: 2, label: 'Inactive' },
        { value: 3, label: 'n/a' },
    ]
    const createPatient = !!!props?.patient?.id

    console.log({createPatient});
    
    const [newPatient, setNewPatient] = useState<Patient>(props?.patient? props.patient:{
        id: 0,
        name: '',
        first_surname: '',
        second_surname: '',
        date_of_birth: '',
        status: 1,
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        console.log({name, value});
        
        setNewPatient((prevNewPatient) => ({ ...prevNewPatient, [name]: value }));
    };
    const handleTypeInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        console.log({ event });

        setNewPatient((prevNewPatient) => ({ ...prevNewPatient, [name]: value }));
    };

    const handleCreatePatient = (event: React.FormEvent) => {
        // event.preventDefault();
        console.log('New patient:', newPatient);
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">{createPatient ? 'Create a new patient' : 'Edit patient'}</h1>
            <Form onSubmit={handleCreatePatient} method={createPatient?'post':'put'}>
                <div className="flex flex-col mb-4">
                    <label htmlFor="name" className="mb-2 font-bold">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={newPatient.name}
                        onChange={handleInputChange}
                        className="border border-gray-400 p-2"
                        required
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="first_surname" className="mb-2 font-bold">
                        First surname
                    </label>
                    <input
                        type="text"
                        name="first_surname"
                        id="first_surname"
                        value={newPatient.first_surname}
                        onChange={handleInputChange}
                        className="border border-gray-400 p-2"
                        required
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="second_surname" className="mb-2 font-bold">
                        Second surname
                    </label>
                    <input
                        type="text"
                        name="second_surname"
                        id="second_surname"
                        value={newPatient.second_surname}
                        onChange={handleInputChange}
                        className="border border-gray-400 p-2"
                        required
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="type" className="mb-2 font-bold">
                        Date of birth
                    </label>
                    <input
                        type="date"
                        name="date_of_birth"
                        id="date_of_birth"
                        value={newPatient.date_of_birth}
                        onChange={handleInputChange}
                        className="border border-gray-400 p-2"
                        required
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="type" className="mb-2 font-bold">
                        Status
                    </label>
                    <SelectInput options={statusOptions} onChange={handleTypeInputChange} value='1' name='status' />
                </div>
                <PrimaryButton type="submit" onClick={() => console.log('submit')}>
                    {createPatient ? 'Create Patient' : 'Edit Patient'}
                </ PrimaryButton>
            </Form>
        </div>
    );
}

export default PatientForm;