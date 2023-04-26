import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "react-router-dom"
import { toast } from "react-toastify"
import User from "../../Interfaces/user.interface"
import { useFetch } from "../../Utils/useFecth"

const fetch = useFetch()
const UsersActions = {
    create: async ({ request }: ActionFunctionArgs) => {
        const data = await request.formData()

        const sumbitData: User & { staff_id?: number } = {
            email: data.get('email')!.toString(),
            role: data.get('role')!.toString(),
            staff_id: parseInt(data.get('staff_id')?.toString()!)
        }
        const response = await fetch.post('/api/auth/register-by-admin', sumbitData)
        if (response.status == 422) {
            return response
        }
        toast.success('User created')
        return redirect('/users')

    },
    update: async ({ request, params }: ActionFunctionArgs) => {
        if (request.method == 'DELETE') {
            if (!confirm('Eliminar Usuario?')) {
                return {}
            }
            const response = await fetch.delete('/api/users/' + params.id)
            if (response.status !== 200) {
                throw response
            }
            toast.success('User deleted!')
            return response
        }
        const data = await request.formData()
        const sumbitData: User & { staff_id?: string } = {
            email: data.get('email')!.toString(),
            role: data.get('role')!.toString(),
            staff_id: data.get('staff_id')?.toString()
        }
        const response = await fetch.put('/api/users/' + params.id, sumbitData)
        if (response.status == 422) {
            return response
        }
        if (response.status !== 200) {
            throw response
        }
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
    getById: async ({ params }: LoaderFunctionArgs) => {
        const response = await fetch.get('/api/users/' + params.id)
        if (response.status !== 200) {
            throw response;
        }
        const users = response.data
        return users
    }



}
export default UsersActions