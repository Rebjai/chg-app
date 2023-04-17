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
            patient_id: parseInt(data.get('patient_id')?.toString() ?? ''),
            room_id: parseInt(data.get('room_id')!.toString()),
            admission_date: data.get('admission_date')!.toString()
        }
        const created = await fetch.post('/api/consumption-sheets', sumbitData)

        toast.success('Consumption sheet created')
        return redirect('/consumption-sheets')

    },
    update: async ({ request, params }: ActionFunctionArgs) => {
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaadsdfsfd');
        
        const data = await request.formData()
        const method = data.get('_method')?.toString()
        if (!!method && method == 'Finalizar' || method == 'Terminate') {
            if (!confirm('Cerrar hoja de consumo?')) {
                return {}
            }
            const response = await fetch.delete('/api/consumption-sheets/' + params.id)
            if (response.status !== 200) {
                throw response
            }
            toast.success('Consumption sheet Terminated')
            return redirect('/consumption-sheets')
        }
        
        const sumbitData: ConsumptionSheet = {
            diagnosis: data.get('diagnosis')!.toString(),
            doctor: data.get('doctor')!.toString(),
            room_id: parseInt(data.get('room_id')!.toString()),
            patient_id: parseInt(data.get('patient_id')!.toString()),
            admission_date: data.get('admission_date')!.toString()
        }
        const response = await fetch.put('/api/consumption-sheets/' + params.id, sumbitData)
        if (response.status !== 200) {
            throw response
        }


        toast.success('Consumption sheet updated')
        return redirect('/consumption-sheets')
    },
    getAll: async () => {

        const response = await fetch.get('/api/consumption-sheets')


        const consumptionSheets = response.data
        return consumptionSheets
    },
    getTerminated: async () => {
        console.log('getTerminated');

        const response = await fetch.get('/api/consumption-sheets?closed=true')

        console.log({ response });

        const consumptionSheetDetails = response.data
        return consumptionSheetDetails
    },
    getById: async ({ params }: LoaderFunctionArgs) => {
        const response = await fetch.get('/api/consumption-sheets/' + params.id)
        if (response.status !== 200) {
            throw response;
        }
        const consumptionSheet: ConsumptionSheet = response.data
        consumptionSheet.admission_date = consumptionSheet.admission_date.split('T')[0]
        // Convert created_at string to Date object for each ConsumptionSheetDetail object
        if (consumptionSheet.total && consumptionSheet.deleted_at) {
            consumptionSheet.consumptions = consumptionSheet.consumptions!.map((detail) => {
                detail.created_at = new Date(detail.created_at!);
                return detail;
            });
        }
        return consumptionSheet
    }



}
export default ConsumptionSheetsActions