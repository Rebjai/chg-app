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
            user_id: parseInt(data.get('user_id')?.toString()??'0'),
            consumption_sheet_id: parseInt(data.get('consumption_sheet_id')!.toString())
        }
        console.log({ sumbitData });
        const response = await fetch.post('/api/consumption-details', sumbitData)
        if (response.status == 422) {
            return response
        }
        toast.success('Consumption sheet detail created')
        return redirect('/consumption-sheets-detail')

    },
    createConsumptionDetail: async ({ request, params }: ActionFunctionArgs) => {
        const data = await request.formData()
        const entries = data.entries();

        for (const [name, value] of entries) {
            console.log(`${name}: ${value}`);
        }
        const { consumptionSheetId } = params
        console.log({params});
        

        const sumbitData: ConsumptionSheetDetail = {
            // total: parseFloat(data.get('total')!.toString()),
            quantity: parseFloat(data.get('quantity')!.toString()),
            product_id: parseInt(data.get('product_id')!.toString()),
            staff_id: parseInt(data.get('staff_id')?.toString()??'0'),
            user_id: parseInt(data.get('user_id')?.toString()??'0'),
            consumption_sheet_id: parseInt(data.get('consumption_sheet_id')!.toString())
        }
        console.log({ sumbitData });
        const response = await fetch.post('/api/consumption-sheets/' + consumptionSheetId + '/consumption-details', sumbitData)
        if (response.status == 422) {
            return response
        }
        toast.success('Consumption sheet detail created')
        return response

    },
    update: async ({ request, params }: ActionFunctionArgs) => {
        const data = await request.formData()
        if (request.method == "DELETE") {
            if (!confirm('Desea Borrar el detalle de consumo?')) {
                return {}
            }
            const response = await fetch.delete('/api/consumption-details/' + params.id)
            return response
        }

        const sumbitData: ConsumptionSheetDetail = {
            // total: parseFloat(data.get('total')!.toString()),
            quantity: parseFloat(data.get('quantity')!.toString()),
            product_id: parseInt(data.get('product_id')!.toString()),
            staff_id: parseInt(data.get('staff_id')!.toString()),
            user_id: parseInt(data.get('user_id')?.toString()??'0'),
            consumption_sheet_id: parseInt(data.get('consumption_sheet_id')!.toString())
        }
        console.log({ sumbitData });
        const response = await fetch.put('/api/consumption-details/' + params.id, sumbitData)
        if (response.status == 422) {
            return response
        }
        if (response.status !== 200) {
            throw response
        }
        toast.success('Consumption sheet detail updated')
        return redirect('/consumption-sheets-detail')
    },
    getAll: async () => {
        console.log('getall');

        const response = await fetch.get('/api/consumption-details')

        console.log({ response });

        const consumptionSheetDetails = response.data
        return consumptionSheetDetails
    },
    getById: async ({ params }: LoaderFunctionArgs) => {
        const response = await fetch.get('/api/consumption-details/' + params.id)
        console.log({ response });

        if (response.status !== 200) {
            throw response;
        }
        const consumptionSheetDetail: ConsumptionSheetDetail = response.data
        // consumptionSheetDetail.created_at = consumptionSheetDetail.created_at.split('T')[0]
        return consumptionSheetDetail
    },
    getByConsumptionSheetId: async ({ params }: LoaderFunctionArgs) => {
        console.log({params});
        const {consumptionSheetId} = params
        const response = await fetch.get('/api/consumption-sheets/' + consumptionSheetId + '/consumption-details')
        console.log({ response });

        if (response.status !== 200) {
            throw response;
        }
        response.data.map((detail: any) => {
            console.log({ created: detail.created_at });
            detail.created_at = new Date(Date.parse(detail.created_at))
            console.log({ detail });

            return detail
        })
        const consumptionSheetDetail: ConsumptionSheetDetail[] = response.data
        // consumptionSheetDetail.created_at = consumptionSheetDetail.created_at.split('T')[0]
        return consumptionSheetDetail
    }



}
export default ConsumptionSheetDetailsActions