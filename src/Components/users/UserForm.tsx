import { useState } from "react";
import { Form, useParams } from "react-router-dom";
import User from "../../Interfaces/user.interface";
import PrimaryButton from "../utils/PrimaryButton";
import SelectInput from "../utils/SelectInput";
interface UserFormProps {
    user?: User
}
function UserForm(props?: UserFormProps) {
    const roleOptions = [
        { value: '', label: 'Selecciona un elemento de la lista' },
        { value: 1, label: 'User' },
        { value: 2, label: 'Supervisor' },
        { value: 10, label: 'Admin' },
    ]
    const createUser = !!!props?.user?.id

    
    const [newUser, setNewUser] = useState<User>(props?.user? props.user:{
        id: 0,
        email: '',
        role: '',
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        console.log({name, value});
        
        setNewUser((prevNewUser) => ({ ...prevNewUser, [name]: value }));
    };
    const handleTypeInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        console.log({ event });

        setNewUser((prevNewUser) => ({ ...prevNewUser, [name]: value }));
    };
    const handleRoleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        console.log({ event });

        setNewUser((prevNewUser) => ({ ...prevNewUser, [name]: value }));
    };

    const handleCreateUser = (event: React.FormEvent) => {
        // event.preventDefault();
        console.log('New user:', newUser);
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">{createUser ? 'Create a new user' : 'Edit user'}</h1>
            <Form onSubmit={handleCreateUser} method={createUser?'post':'put'}>
                <div className="flex flex-col mb-4">
                    <label htmlFor="email" className="mb-2 font-bold">
                        Name
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
                        Role
                    </label>
                    <SelectInput options={roleOptions} onChange={handleRoleInputChange} value={newUser.role} name='role' />
                </div>
                <PrimaryButton type="submit" onClick={() => console.log('submit')}>
                    {createUser ? 'Create User' : 'Edit User'}
                </ PrimaryButton>
            </Form>
        </div>
    );
}

export default UserForm;