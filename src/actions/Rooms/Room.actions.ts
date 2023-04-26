import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "react-router-dom"
import { toast } from "react-toastify"
import Room from "../../Interfaces/room.interface"
import { useFetch } from "../../Utils/useFecth"

const fetch = useFetch()
const RoomsActions = {
    create: async ({ request }: ActionFunctionArgs) => {
        const data = await request.formData()
        const sumbitData: Room = {
            name: data.get('name')!.toString(),
            status: parseInt(data.get('status')!.toString()),
            type: parseInt(data.get('status')!.toString()),
        }
        const response = await fetch.post('/api/rooms', sumbitData)
        if (response.status == 422) {
            return response
        }
        toast.success('Room created')
        return redirect('/rooms')

    },
    update: async ({ request, params }: ActionFunctionArgs) => {
        const data = await request.formData()
        const sumbitData: Room = {
            name: data.get('name')!.toString(),
            status: parseInt(data.get('status')!.toString()),
            type: parseInt(data.get('type')!.toString()),
        }
        console.log({sumbitData});
        const response = await fetch.put('/api/rooms/'+params.id, sumbitData)
        if (response.status == 422) {
            return response
        }
        if (response.status !== 200) {
            throw response
        }
        toast.success('Room updated!')
        return redirect('/rooms')
    },
    getAll: async () => {
        const response = await fetch.get('/api/rooms')
        if (response.status !== 200) {
            throw response;
        }
        const rooms = response.data
        return rooms
    },
    getById: async ({params}:LoaderFunctionArgs) => {
        const response = await fetch.get('/api/rooms/'+params.id)
        console.log({response});
        
        if (response.status !== 200) {
            throw response;
        }
        const rooms = response.data
        return rooms
    }



}
export default RoomsActions