import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "react-router-dom"
import { toast } from "react-toastify"
import Area from "../../Interfaces/area.interface"
import { useFetch } from "../../Utils/useFecth"

const fetch = useFetch()
const AreasActions = {
    create: async ({ request }: ActionFunctionArgs) => {
        const data = await request.formData()
        const sumbitData: Area = {
            name: data.get('name')!.toString(),
        }
        const response = await fetch.post('/api/areas', sumbitData)
        if (response.status == 422) {
            return response
        }
        toast.success('Area created')
        return redirect('/areas')

    },
    update: async ({ request, params }: ActionFunctionArgs) => {
        if (request.method == 'DELETE') {
            if (!confirm('Eliminar Área?')) {
                return {}
            }
            const response = await fetch.delete('/api/areas/' + params.id)
            if (response.status !== 200) {
                throw response
            }
            toast.success('Area deleted!')
            return response
        }
        const data = await request.formData()
        const sumbitData: Area = {
            name: data.get('name')!.toString(),
        }
        console.log({sumbitData});
        const response = await fetch.put('/api/areas/'+params.id, sumbitData)
        if (response.status == 422) {
            return response
        }
        if (response.status !== 200) {
            throw response
        }
        toast.success('Area updated!')
        return redirect('/areas')
    },
    getAll: async () => {
        const response = await fetch.get('/api/areas')
        if (response.status !== 200) {
            throw response;
        }
        const areas = response.data
        return areas
    },
    getById: async ({params}:LoaderFunctionArgs) => {
        const response = await fetch.get('/api/areas/'+params.id)
        console.log({response});
        
        if (response.status !== 200) {
            throw response;
        }
        const areas = response.data
        return areas
    }



}
export default AreasActions