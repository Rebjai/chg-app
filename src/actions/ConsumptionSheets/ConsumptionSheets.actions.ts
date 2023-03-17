import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "react-router-dom"
import { toast } from "react-toastify"
import ConsumptionSheet from "../../Interfaces/consumptionSheet.interface"
import { useFetch } from "../../Utils/useFecth"

const fetch = useFetch()
const ConsumptionSheetsActions = {
    create: async ({ request }: ActionFunctionArgs) => {
        const data = await request.formData()
        const sumbitData: ConsumptionSheet = {
            diagnosis: data.get('diagnosis')!.toString(),
            doctor: data.get('doctor')!.toString(),
            patient_id: parseInt(data.get('patient_id')!.toString()),
            room_id: parseInt(data.get('room_id')!.toString()),
            admission_date: data.get('admission_date')!.toString()
        }
        console.log({sumbitData});
        const created = await fetch.post('/api/consumption-sheets', sumbitData)

        toast.success('Consumption sheet created')
        return redirect('/consumption-sheets')

    },
    update: async ({ request, params }: ActionFunctionArgs) => {
        const data = await request.formData()

        const sumbitData: ConsumptionSheet = {
            diagnosis: data.get('diagnosis')!.toString(),
            doctor: data.get('doctor')!.toString(),
            room_id: parseInt(data.get('room_id')!.toString()),
            patient_id: parseInt(data.get('patient_id')!.toString()),
            admission_date: data.get('admission_date')!.toString()
        }
        console.log({sumbitData});
        const response = await fetch.put('/api/consumption-sheets/'+params.id, sumbitData)
        if (response.status !== 200) {
            throw response
        }
        console.log({response});
        

        toast.success('Consumption sheet updated')
        return redirect('/consumption-sheets')
    },
    getAll: async () => {
        console.log('getall');
        
        const response = await fetch.get('/api/consumption-sheets')

        console.log({response});
        
        const consumptionSheets = response.data
        return consumptionSheets
    },
    getById: async ({params}:LoaderFunctionArgs) => {
        const response = await fetch.get('/api/consumption-sheets/'+params.id)
        console.log({response});
        
        if (response.status !== 200) {
            throw response;
        }
        const consumptionSheet:ConsumptionSheet = response.data
        consumptionSheet.admission_date = consumptionSheet.admission_date.split('T')[0]
        return consumptionSheet
    }



}
export default ConsumptionSheetsActions