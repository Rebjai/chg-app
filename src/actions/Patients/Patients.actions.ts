import { ActionFunctionArgs, LoaderFunctionArgs } from "react-router-dom"
import Patient from "../../Interfaces/patient.interface"
import { useFetch } from "../../Utils/useFecth"

const fetch = useFetch()
const PatientsActions = {
    create: async ({ request }: ActionFunctionArgs) => {
        const data = await request.formData()
        const sumbitData: Patient = {
            name: data.get('name')!.toString(),
            status: parseInt(data.get('status')!.toString()),
            first_surname: data.get('first_surname')!.toString(),
            second_surname: data.get('second_surname')!.toString(),
            date_of_birth: (new Date(data.get('date_of_birth')!.toString())).toISOString()
        }
        console.log('asdasd');
        const created = await fetch.post('/api/patients', sumbitData)
        // const created = await fetch('/api/patients',
        //     {
        //         method: 'POST', body: JSON.stringify(sumbitData), headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': 'Bearer ' + localStorage.getItem('token')!
        //         }
        //     })
        // if (created.status !== 200) {
        //     throw created
        // }

        return created

    },
    update: async ({ request, params }: ActionFunctionArgs) => {
        const data = await request.formData()
        const sumbitData: Patient = {
            name: data.get('name')!.toString(),
            status: parseInt(data.get('status')!.toString()),
            first_surname: data.get('first_surname')!.toString(),
            second_surname: data.get('second_surname')!.toString(),
            date_of_birth: data.get('date_of_birth')!.toString()
        }
        console.log({sumbitData});
        const response = await fetch.put('/api/patients/'+params.id, sumbitData)
        if (response.status !== 200) {
            throw response
        }
        console.log({response});
        

        return sumbitData
    },
    getAll: async () => {
        const response = await fetch.get('/api/patients')

        // if (response.status !== 200) {
        //     throw response;
        // }
        console.log({response});
        
        const patients = response.data
        return patients
    },
    getById: async ({params}:LoaderFunctionArgs) => {
        const response = await fetch.get('/api/patients/'+params.id)
        console.log({response});
        
        if (response.status !== 200) {
            throw response;
        }
        const patient = response.data
        patient.date_of_birth = patient.date_of_birth.split('T')[0]
        return patient
    }



}
export default PatientsActions