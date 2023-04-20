import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "react-router-dom"
import { toast } from "react-toastify"
import User from "../../Interfaces/user.interface"
import { useFetch } from "../../Utils/useFecth"

const fetch = useFetch()
const UsersActions = {
    create: async ({ request }: ActionFunctionArgs) => {
        const data = await request.formData()

        const sumbitData: User& {user_id? : string} = {
            email: data.get('email')!.toString(),
            role: data.get('role')!.toString(),
            user_id: data.get('staff_id')?.toString()
        }
        console.log('asdasd');
        const created = await fetch.post('/api/auth/register-by-admin', sumbitData)
        toast.success('User created')

        created
        return redirect('/users')

    },
    update: async ({ request, params }: ActionFunctionArgs) => {
        const data = await request.formData()
        const sumbitData: User = {
            email: data.get('email')!.toString(),
            role: data.get('role')!.toString(),
        }
        console.log({sumbitData});
        const response = await fetch.put('/api/users/'+params.id, sumbitData)
        if (response.status !== 200) {
            throw response
        }
        console.log({response});
        
        toast.success('User updated!')
        sumbitData
        return redirect('/users')
    },
    getAll: async () => {
        const response = await fetch.get('/api/users')
        if (response.status !== 200) {
            throw response;
        }
        const users = response.data
        return users
    },
    getById: async ({params}:LoaderFunctionArgs) => {
        const response = await fetch.get('/api/users/'+params.id)
        console.log({response});
        
        if (response.status !== 200) {
            throw response;
        }
        const users = response.data
        return users
    }



}
export default UsersActions