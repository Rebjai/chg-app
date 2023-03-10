import { ActionFunctionArgs, LoaderFunctionArgs } from "react-router-dom"
import Staff from "../../Interfaces/staff.interface"
import { useFetch } from "../../Utils/useFecth"

const fetch = useFetch()
const StaffActions = {
    create: async ({ request }: ActionFunctionArgs) => {
        const data = await request.formData()
        const sumbitData: Staff = {
            telephone_number: data.get('telephone_number')!.toString(),
            job_title: data.get('job_title')!.toString(),
            name: data.get('name')!.toString(),
            first_surname: data.get('first_surname')!.toString(),
            second_surname: data.get('second_surname')!.toString(),
            date_of_birth: (new Date(data.get('date_of_birth')!.toString())).toISOString()
        }
        console.log('asdasd');
        const created = await fetch.post('/api/staff', sumbitData)

        return created

    },
    update: async ({ request, params }: ActionFunctionArgs) => {
        const data = await request.formData()
        const sumbitData: Staff = {
            telephone_number: data.get('telephone_number')!.toString(),
            job_title: data.get('job_title')!.toString(),
            name: data.get('name')!.toString(),
            first_surname: data.get('first_surname')!.toString(),
            second_surname: data.get('second_surname')!.toString(),
            date_of_birth: (new Date(data.get('date_of_birth')!.toString())).toISOString()
        }
        console.log({sumbitData});
        const response = await fetch.put('/api/staff/'+params.id, sumbitData)
        if (response.status !== 200) {
            throw response
        }
        console.log({response});
        

        return sumbitData
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