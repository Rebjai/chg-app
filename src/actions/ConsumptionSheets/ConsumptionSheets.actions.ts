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
        const response = await fetch.post('/api/consumption-sheets', sumbitData)
        if (response.status == 422) {
            return response
        }
        toast.success('Consumption sheet created')
        return redirect('/consumption-sheets')

    },
    update: async ({ request, params }: ActionFunctionArgs) => {
        const data = await request.formData()
        const method = data.get('_method')?.toString()
        if (request.method == 'DELETE') {
            if (!confirm('¿Eliminar PERMANENTEMENTE la hoja de consumo?'))
                return null
            const response = await fetch.delete('/api/consumption-sheets/' + params.id)
            toast.success('Consumption sheet deleted')
            return response
        }
        const sumbitData: ConsumptionSheet = {
            diagnosis: data.get('diagnosis')!.toString(),
            doctor: data.get('doctor')!.toString(),
            room_id: parseInt(data.get('room_id')!.toString()),
            patient_id: parseInt(data.get('patient_id')?.toString()!),
            admission_date: data.get('admission_date')!.toString()
        }
        const response = await fetch.put('/api/consumption-sheets/' + params.id, sumbitData)
        if (response.status == 422) {
            return response
        }
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
        const response = await fetch.get('/api/consumption-sheets?closed=true')
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
    },
    close: async ({ params }: ActionFunctionArgs) => {
        if (!confirm('Finalizar hoja de consumo?')) {
            return {}
        }
        const response = await fetch.delete('/api/consumption-sheets/' + params.id + '/close')
        if (response.status !== 200) {
            throw response
        }
        toast.success('Consumption sheet Terminated')
        return redirect('/consumption-sheets')
    },



}
export default ConsumptionSheetsActions