import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "react-router-dom"
import { toast } from "react-toastify"
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

        const response = await fetch.post('/api/patients', sumbitData)
        if (response.status == 422) {
            return response
        }

        toast.success('Patient created')
        return redirect('/patients')

    },
    update: async ({ request, params }: ActionFunctionArgs) => {
        const data = await request.formData()
        if (request.method == 'DELETE') {
            if (!confirm('¿Eliminar Paciente?'))
                return null
            const response = await fetch.delete('/api/patients/' + params.id)
            return response
        }
        const sumbitData: Patient = {
            name: data.get('name')!.toString(),
            status: parseInt(data.get('status')!.toString()),
            first_surname: data.get('first_surname')!.toString(),
            second_surname: data.get('second_surname')!.toString(),
            date_of_birth: data.get('date_of_birth')!.toString()
        }
        console.log({ sumbitData });
        const response = await fetch.put('/api/patients/' + params.id, sumbitData)
        if (response.status == 422) {
            return response
        }
        if (response.status !== 200) {
            throw response
        }
        console.log({ response });


        toast.success('Patient updated')
        return redirect('/patients')
    },
    getAll: async () => {
        const response = await fetch.get('/api/patients')

        // if (response.status !== 200) {
        //     throw response;
        // }
        console.log({ response });

        const patients = response.data
        return patients
    },
    getById: async ({ params }: LoaderFunctionArgs) => {
        const response = await fetch.get('/api/patients/' + params.id)
        console.log({ response });

        if (response.status !== 200) {
            throw response;
        }
        const patient = response.data
        patient.date_of_birth = patient.date_of_birth.split('T')[0]
        return patient
    }



}
export default PatientsActions