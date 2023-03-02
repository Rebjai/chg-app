import { ActionFunctionArgs, LoaderFunctionArgs } from "react-router-dom"
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
        console.log('asdasd');
        const created = await fetch.post('/api/rooms', sumbitData)
        // const created = await fetch('/api/rooms',
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
        const sumbitData: Room = {
            name: data.get('name')!.toString(),
            status: parseInt(data.get('status')!.toString()),
            type: parseInt(data.get('status')!.toString()),
        }
        console.log({sumbitData});
        const response = await fetch.put('/api/rooms/'+params.id, sumbitData)
        if (response.status !== 200) {
            throw response
        }
        console.log({response});
        

        return sumbitData
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