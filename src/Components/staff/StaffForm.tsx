import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Form, useParams } from "react-router-dom";
import Staff from "../../Interfaces/staff.interface";
import PrimaryButton from "../utils/PrimaryButton";
import SelectInput from "../utils/SelectInput";
interface StaffFormProps {
    staff?: Staff
}
function StaffForm(props?: StaffFormProps) {
    const {t} = useTranslation()
    const statusOptions = [
        { value: '', label: 'Selecciona un elemento de la lista' },
        { value: 1, label: 'Active' },
        { value: 2, label: 'Inactive' },
        { value: 3, label: 'n/a' },
    ]
    const jobTitleOptions = [
        { value: '', label: 'Selecciona un elemento de la lista' },
        { value: 1, label: 'Staff' },
        { value: 2, label: 'Supervisor' },
        { value: 3, label: 'Admin' },
    ]
    const createStaff = !!!props?.staff?.id

    
    const [newStaff, setNewStaff] = useState<Staff>(props?.staff?.id? props.staff:{
        id: 0,
        name: '',
        telephone_number: '',
        job_title: '1',
        first_surname: '',
        second_surname: '',
        date_of_birth: '',
        status: 1,
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        console.log({name, value});
        
        setNewStaff((prevNewStaff) => ({ ...prevNewStaff, [name]: value }));
    };
    const handleTypeInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        console.log({ event });

        setNewStaff((prevNewStaff) => ({ ...prevNewStaff, [name]: value }));
    };
    const handleJobTitleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        console.log({ event });

        setNewStaff((prevNewStaff) => ({ ...prevNewStaff, [name]: value }));
    };

    const handleCreateStaff = (event: React.FormEvent) => {
        // event.preventDefault();
        console.log('New staff:', newStaff);
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">{createStaff ? 'Create a new staff' : 'Edit staff'}</h1>
            <Form onSubmit={handleCreateStaff} method={createStaff?'post':'put'}>
                <div className="flex flex-col mb-4">
                    <label htmlFor="name" className="mb-2 font-bold">
                        {t('name')}
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={newStaff.name}
                        onChange={handleInputChange}
                        className="border border-gray-400 p-2"
                        required
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="first_surname" className="mb-2 font-bold">
                    {t('first_surname')}
                    </label>
                    <input
                        type="text"
                        name="first_surname"
                        id="first_surname"
                        value={newStaff.first_surname}
                        onChange={handleInputChange}
                        className="border border-gray-400 p-2"
                        required
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="second_surname" className="mb-2 font-bold">
                    {t('second_surname')}
                    </label>
                    <input
                        type="text"
                        name="second_surname"
                        id="second_surname"
                        value={newStaff.second_surname}
                        onChange={handleInputChange}
                        className="border border-gray-400 p-2"
                        required
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="type" className="mb-2 font-bold">
                    {t('date_of_birth')}
                    </label>
                    <input
                        type="date"
                        name="date_of_birth"
                        id="date_of_birth"
                        value={newStaff.date_of_birth?.split('T')[0]}
                        onChange={handleInputChange}
                        className="border border-gray-400 p-2"
                        required
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="telephone_number" className="mb-2 font-bold">
                    {t('telephone')}
                    </label>
                    <input
                        type="text"
                        name="telephone_number"
                        id="telephone_number"
                        placeholder="9511234567"
                        value={newStaff.telephone_number}
                        onChange={handleInputChange}
                        className="border border-gray-400 p-2"
                        required
                    />
                </div>
                {/* <div className="flex flex-col mb-4">
                    <label htmlFor="job_title" className="mb-2 font-bold">
                    {t('job_title')}
                    </label>
                    <SelectInput options={jobTitleOptions} onChange={handleJobTitleInputChange} value={newStaff.job_title} name='job_title' />
                </div> */}
                <PrimaryButton type="submit" onClick={() => console.log('submit')}>
                    {createStaff ? t('create') : t('edit')} {t('staff')}
                </ PrimaryButton>
            </Form>
        </div>
    );
}

export default StaffForm;