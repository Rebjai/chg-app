import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Form, useParams } from "react-router-dom";
import Staff from "../../Interfaces/staff.interface";
import User from "../../Interfaces/user.interface";
import { useAuth } from "../../Utils/UseAuth";
import { useFetch } from "../../Utils/useFecth";
import PrimaryButton from "../utils/PrimaryButton";
import SelectInput from "../utils/SelectInput";
interface UserFormProps {
    user?: User
}
function UserForm(props?: UserFormProps) {
    const { t } = useTranslation()
    const { auth } = useAuth()
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
    const [password, setPassword] = useState<string | null>(null)
    const [passwordConfirmation, setPasswordConfirmation] = useState<string | null>(null)
    const [currentPassword, setCurrentPassword] = useState<string | null>(null)

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
        console.log('New user:', newUser);
    };
    useEffect(() => {
        fetch.get('/api/staff?unassigned=true').then(r => {
            console.log({ r });
            return r.data
        }).then(staff => {
            let newOptions = []
            if (!staff.length && !props?.user?.profile?.id)
                return setStaffOptions([{ value: '', label: 'No se encontraron elementos.' }])
            newOptions = staff.map((e: Staff) => ({ value: e.id, label: `${e.name} ${e.first_surname} ${e.second_surname}` }))
            if (props?.user?.profile?.id) {
                newOptions.push({ value: props?.user?.profile?.id?.toString()!, label: `${props?.user?.profile?.name} ${props?.user?.profile?.first_surname} ${props?.user?.profile?.second_surname}` })
                // newOptions{ value: props?.user?.profile?.id?.toString()!, label: `${props?.user?.profile?.name} ${props?.user?.profile?.first_surname} ${props?.user?.profile?.second_surname}` }
            }
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

                {newUser.id == auth.user.id ?
                    <div className="flex flex-col mb-4">
                        <label htmlFor="current_password" className="mb-2 font-bold">
                            Password
                        </label>
                        <input
                            type="password"
                            name="current_password"
                            id="current_password"
                            value={currentPassword!}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="border border-gray-400 p-2"
                        />
                    </div>
                    : null
                }
                {newUser.id == auth.user.id ?
                    <div className="flex flex-col mb-4">
                        <label htmlFor="password" className="mb-2 font-bold">
                            New Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={password!}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border border-gray-400 p-2"
                        />
                    </div>
                    : null
                }
                {newUser.id == auth.user.id ?
                    <div className="flex flex-col mb-4">
                        <label htmlFor="password_confirmation" className="mb-2 font-bold">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="password_confirmation"
                            id="password_confirmation"
                            value={passwordConfirmation!}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            className="border border-gray-400 p-2"
                        />
                    </div>
                    : null
                }
                {auth.user.id == newUser.id ? <input type="hidden" name="role" value={newUser.role} /> :
                    <div className="flex flex-col mb-4">
                        <label htmlFor="role" className="mb-2 font-bold">
                            {t('role')}
                        </label>
                        <SelectInput options={roleOptions} onChange={handleRoleInputChange} value={newUser.role} name='role' />
                    </div>
                }


                {(newUser.role == '1' || newUser.role == '2') && newUser.id != auth.user.id && <div className="flex flex-col mb-4">
                    <label htmlFor="new-account" className="mb-2 font-bold">
                        {t('new-profile')}
                    </label>
                    <input type="checkbox" name="new-account" id="new-account" checked={createAccount} onChange={() => setCreateAccount(!createAccount)} />
                </div>}

                {(newUser.role == '1' || newUser.role == '2') && !createAccount && newUser.id != auth.user.id ? <div className="flex flex-col mb-4">
                    <label htmlFor="staff_id" className="mb-2 font-bold">
                        {t('staff_id')}
                    </label>
                    <SelectInput options={staffOptions} onChange={handleStaffIdInputChange} value={newUser.staff_id?.toString()!} name='staff_id' />
                </div> :
                    <input type="hidden" name="staff_id" value={newUser.staff_id} />
                }

                <PrimaryButton type="submit" onClick={() => console.log('submit')}>
                    {createUser ? t('create') : t('edit')} {t('user')}
                </ PrimaryButton>
            </Form>
        </div>
    );
}

export default UserForm;