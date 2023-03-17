import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "react-router-dom"
import { toast } from "react-toastify"
import ConsumptionSheetDetail from "../../Interfaces/consumptionSheetDetail.interface"
import { useFetch } from "../../Utils/useFecth"

const fetch = useFetch()
const ConsumptionSheetDetailsActions = {
    create: async ({ request }: ActionFunctionArgs) => {
        const data = await request.formData()
        const sumbitData: ConsumptionSheetDetail = {
            // total: parseFloat(data.get('total')!.toString()),
            quantity: parseFloat(data.get('quantity')!.toString()),
            product_id: parseInt(data.get('product_id')!.toString()),
            staff_id: parseInt(data.get('staff_id')!.toString()),
            consumption_sheet_id: parseInt(data.get('consumption_sheet_id')!.toString())
        }
        console.log({sumbitData});
        const created = await fetch.post('/api/consumption-details', sumbitData)

        toast.success('Consumption sheet detail created')
        return redirect('/consumption-sheets-detail')

    },
    createConsumptionDetail: async ({ request, params }: ActionFunctionArgs) => {
        const data = await request.formData()
        const {consumptionSheetId}=params
        const sumbitData: ConsumptionSheetDetail = {
            // total: parseFloat(data.get('total')!.toString()),
            quantity: parseFloat(data.get('quantity')!.toString()),
            product_id: parseInt(data.get('product_id')!.toString()),
            staff_id: parseInt(data.get('staff_id')!.toString()),
            consumption_sheet_id: parseInt(data.get('consumption_sheet_id')!.toString())
        }
        console.log({sumbitData});
        const created = await fetch.post('/api/consumption-sheets/'+consumptionSheetId+'/consumption-details', sumbitData)
        toast.success('Consumption sheet detail created')
        return created

    },
    update: async ({ request, params }: ActionFunctionArgs) => {
        const data = await request.formData()

        const sumbitData: ConsumptionSheetDetail = {
            // total: parseFloat(data.get('total')!.toString()),
            quantity: parseFloat(data.get('quantity')!.toString()),
            product_id: parseInt(data.get('product_id')!.toString()),
            staff_id: parseInt(data.get('staff_id')!.toString()),
            consumption_sheet_id: parseInt(data.get('consumption_sheet_id')!.toString())
        }
        console.log({sumbitData});
        const response = await fetch.put('/api/consumption-details/'+params.id, sumbitData)
        if (response.status !== 200) {
            throw response
        }
        console.log({response});
        

        toast.success('Consumption sheet detail updated')
        return redirect('/consumption-sheets-detail')
    },
    getAll: async () => {
        console.log('getall');
        
        const response = await fetch.get('/api/consumption-details')

        console.log({response});
        
        const consumptionSheetDetails = response.data
        return consumptionSheetDetails
    },
    getById: async ({params}:LoaderFunctionArgs) => {
        const response = await fetch.get('/api/consumption-details/'+params.id)
        console.log({response});
        
        if (response.status !== 200) {
            throw response;
        }
        const consumptionSheetDetail:ConsumptionSheetDetail = response.data
        // consumptionSheetDetail.created_at = consumptionSheetDetail.created_at.split('T')[0]
        return consumptionSheetDetail
    },
    getByConsumptionSheetId: async ({params}:LoaderFunctionArgs) => {
        const response = await fetch.get('/api/consumption-sheets/'+params.ConsumptionSheetId+'/consumption-details')
        console.log({response});
        
        if (response.status !== 200) {
            throw response;
        }
        response.data.map( (detail: any) => {
            console.log({created:detail.created_at});
            detail.created_at = new Date(Date.parse(detail.created_at))
            console.log({detail});
            
            return detail
        })
        const consumptionSheetDetail:ConsumptionSheetDetail[] = response.data
        // consumptionSheetDetail.created_at = consumptionSheetDetail.created_at.split('T')[0]
        return consumptionSheetDetail
    }



}
export default ConsumptionSheetDetailsActions