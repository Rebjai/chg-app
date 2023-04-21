import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Form, useParams } from "react-router-dom";
import Staff from "../../Interfaces/staff.interface";
import User from "../../Interfaces/user.interface";
import { useFetch } from "../../Utils/useFecth";
import PrimaryButton from "../utils/PrimaryButton";
import SelectInput from "../utils/SelectInput";
interface UserFormProps {
    user?: User
}
function UserForm(props?: UserFormProps) {
    const { t } = useTranslation()
    const fetch = useFetch()
    const roleOptions = [
        { value: '', label: 'Selecciona un elemento de la lista' },
        { value: 1, label: 'User' },
        { value: 2, label: 'Supervisor' },
        { value: 10, label: 'Admin' },
    ]
    const [staffOptions, setStaffOptions] = useState(!props?.user?.id ? [
        { value: '', label: 'Espera mientras se obtienen los elementos' },
    ] : [{ value: props?.user?.profile?.id?.toString()!, label: `${props?.user?.profile?.name} ${props?.user?.profile?.first_surname} ${props?.user?.profile?.second_surname}` }])
    const [createAccount, setCreateAccount] = useState(!props?.user?.id ?? true)
    const createUser = !!!props?.user?.id


    const [newUser, setNewUser] = useState<User & { staff_id?: number }>(props?.user ? props.user : {
        id: 0,
        email: '',
        role: '',
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        console.log({ name, value });

        setNewUser((prevNewUser) => ({ ...prevNewUser, [name]: value }));
    };
    const handleTypeInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        console.log({ event });

        setNewUser((prevNewUser) => ({ ...prevNewUser, [name]: value }));
    };
    const handleRoleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setNewUser((prevNewUser) => ({ ...prevNewUser, [name]: value }));
    };

    const handleStaffIdInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        console.log({ event });

        setNewUser((prevNewUser) => ({ ...prevNewUser, [name]: value }));
    };

    const handleCreateUser = (event: React.FormEvent) => {
        // event.preventDefault();
        console.log('New user:', newUser);
    };
    useEffect(() => {
        if (props?.user?.profile?.id) {
            return
        }
        fetch.get('/api/staff?unassigned=true').then(r => {
            console.log({ r });
            return r.data
        }).then(staff => {
            if (!staff.length)
                return setStaffOptions([{ value: '', label: 'No se encontraron elementos.' }])
            const newOptions = staff.map((e: Staff) => ({ value: e.id, label: `${e.name} ${e.first_surname} ${e.second_surname}` }))
            setStaffOptions(newOptions)
        })
    }, [])

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">{createUser ? t('create_new') : t('edit')} {t('user')}</h1>
            <Form onSubmit={handleCreateUser} method={createUser ? 'post' : 'put'}>
                <div className="flex flex-col mb-4">
                    <label htmlFor="email" className="mb-2 font-bold">
                        {t('name')}
                    </label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        value={newUser.email}
                        onChange={handleInputChange}
                        className="border border-gray-400 p-2"
                        required
                    />
                </div>
                {/* <div className="flex flex-col mb-4">
                    <label htmlFor="role" className="mb-2 font-bold">
                        Password
                    </label>
                    <input
                        type="text"
                        name="role"
                        id="role"
                        value={newUser.role}
                        onChange={handleInputChange}
                        className="border border-gray-400 p-2"
                        required
                    />
                </div> */}
                <div className="flex flex-col mb-4">
                    <label htmlFor="role" className="mb-2 font-bold">
                        {t('role')}
                    </label>
                    <SelectInput options={roleOptions} onChange={handleRoleInputChange} value={newUser.role} name='role' />
                </div>

                {newUser.role == '1' && <div className="flex flex-col mb-4">
                    <label htmlFor="new-account" className="mb-2 font-bold">
                        {t('new-profile')}
                    </label>
                    <input type="checkbox" name="new-account" id="new-account" checked={createAccount} onChange={() => setCreateAccount(!createAccount)} />
                </div>}

                {newUser.role == '1' && !createAccount && <div className="flex flex-col mb-4">
                    <label htmlFor="staff_id" className="mb-2 font-bold">
                        {t('staff_id')}
                    </label>
                    <SelectInput options={staffOptions} onChange={handleStaffIdInputChange} value={newUser.staff_id?.toString()!} name='staff_id' />
                </div>
                }

                <PrimaryButton type="submit" onClick={() => console.log('submit')}>
                    {createUser ? t('create') : t('edit')} {t('user')}
                </ PrimaryButton>
            </Form>
        </div>
    );
}

export default UserForm;