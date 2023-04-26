import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "react-router-dom"
import { toast } from "react-toastify"
import Staff from "../../Interfaces/staff.interface"
import { useFetch } from "../../Utils/useFecth"

const fetch = useFetch()
const StaffActions = {
    create: async ({ request }: ActionFunctionArgs) => {
        const data = await request.formData()
        const sumbitData: Staff = {
            telephone_number: data.get('telephone_number')!.toString(),
            job_title: data.get('job_title')?.toString()!??'',
            name: data.get('name')!.toString(),
            first_surname: data.get('first_surname')!.toString(),
            second_surname: data.get('second_surname')!.toString(),
            date_of_birth: (new Date(data.get('date_of_birth')!.toString())).toISOString()
        }
        const response = await fetch.post('/api/staff', sumbitData)
        if (response.status == 422) {
            return response
        }
        toast.success('Staff member created')
        return redirect('/staff')

    },
    update: async ({ request, params }: ActionFunctionArgs) => {
        const data = await request.formData()
        const sumbitData: Staff = {
            telephone_number: data.get('telephone_number')!.toString(),
            job_title: data.get('job_title')?.toString()!??'',
            name: data.get('name')!.toString(),
            first_surname: data.get('first_surname')!.toString(),
            second_surname: data.get('second_surname')!.toString(),
            date_of_birth: (new Date(data.get('date_of_birth')!.toString())).toISOString()
        }
        console.log({sumbitData});
        const response = await fetch.put('/api/staff/'+params.id, sumbitData)
        if (response.status == 422) {
            return response
        }
        if (response.status !== 200) {
            throw response
        }
        console.log({response});
        

        toast.success('Staff member updated')
        return redirect('/staff')
    },
    getAll: async () => {
        const response = await fetch.get('/api/staff')

        // if (response.status !== 200) {
        //     throw response;
        // }
        console.log({response});
        
        const staff = response.data
        return staff
    },
    getById: async ({params}:LoaderFunctionArgs) => {
        const response = await fetch.get('/api/staff/'+params.id)
        console.log({response});
        
        if (response.status !== 200) {
            throw response;
        }
        const staff = response.data
        staff.date_of_birth = staff.date_of_birth.split('T')[0]
        return staff
    }



}
export default StaffActions