import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "react-router-dom"
import { toast } from "react-toastify"
import Product from "../../Interfaces/product.interface"
import { useFetch } from "../../Utils/useFecth"

const fetch = useFetch()
const ProductsActions = {
    create: async ({ request }: ActionFunctionArgs) => {
        const data = await request.formData()
        const sumbitData: Product = {
            name: data.get('name')!.toString(),
            price:  parseFloat(data.get('price')!.toString())
        }
        console.log('asdasd');
        const created = await fetch.post('/api/products', sumbitData)
        // const created = await fetch('/api/product',
        //     {
        //         method: 'POST', body: JSON.stringify(sumbitData), headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': 'Bearer ' + localStorage.getItem('token')!
        //         }
        //     })
        // if (created.status !== 200) {
        //     throw created
        // }

        toast.success('Product created!')
        return redirect('/products')

    },
    update: async ({ request, params }: ActionFunctionArgs) => {
        const data = await request.formData()
        const sumbitData: Product = {
            name: data.get('name')!.toString(),
            price:  parseFloat(data.get('price')!.toString())
        }
        console.log({sumbitData});
        const response = await fetch.put('/api/products/'+params.id, sumbitData)
        if (response.status !== 200) {
            throw response
        }
        toast.success('Product updated!')
        return redirect('/products')
    },
    getAll: async () => {
        const response = await fetch.get('/api/products')
        if (response.status !== 200) {
            throw response;
        }
        const product = response.data
        return product
    },
    getById: async ({params}:LoaderFunctionArgs) => {
        const response = await fetch.get('/api/products/'+params.id)
        console.log({response});
        
        if (response.status !== 200) {
            throw response;
        }
        const product = response.data
        return product
    }



}
export default ProductsActions