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
            price: parseFloat(data.get('price')!.toString()),
            category_id: parseInt(data.get('category_id')!.toString())
        }
        console.log('asdasd');
        const created = await fetch.post('/api/products', sumbitData)
        toast.success('Product created!')
        const prevRoute = data.get('prev-route')?.toString()
        console.log({ prevRoute });

        return prevRoute ? redirect(prevRoute) : redirect('/products')

    },
    update: async ({ request, params }: ActionFunctionArgs) => {
        const data = await request.formData()
        console.log({ request });
        if (request.method == 'DELETE') {
            if (!confirm('¿Eliminar Producto?'))
                return null
            const response = await fetch.delete('/api/products/' + params.id)
            return response
        }

        const sumbitData: Product = {
            name: data.get('name')!.toString(),
            price: parseFloat(data.get('price')!.toString()),
            category_id: parseInt(data.get('category_id')!.toString())
        }
        console.log({ sumbitData });
        const response = await fetch.put('/api/products/' + params.id, sumbitData)
        if (response.status !== 200) {
            throw response
        }
        toast.success('Product updated!')
        const prevRoute = data.get('prev-route')?.toString()
        console.log({ prevRoute });

        return prevRoute ? redirect(prevRoute) : redirect('/products')
    },
    getAll: async ({ params, request }: ActionFunctionArgs) => {
        console.log({ params });
        const url = new URL(request.url);
        const search = url.search;
        console.log({ url });

        const response = await fetch.get('/api/products' + search)
        if (response.status !== 200) {
            throw response;
        }
        const product = response.data
        return product
    },
    getById: async ({ params }: LoaderFunctionArgs) => {

        const response = await fetch.get('/api/products/' + params.id)
        console.log({ response });

        if (response.status !== 200) {
            throw response;
        }
        const product = response.data
        return product
    }



}
export default ProductsActions