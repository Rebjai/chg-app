import { useLoaderData, useLocation, useNavigate, useParams } from "react-router-dom";
import ProductForm from "../../Components/products/ProductForm";
import PrimaryButton from "../../Components/utils/PrimaryButton";
import Product from "../../Interfaces/product.interface";

function EditProduct() {
    const navigate = useNavigate()
    const {id} = useParams()
    
    const createProduct =  useLocation().pathname.split('/')[2] == 'create'
    
    const product :Product = useLoaderData() as Product
    return ( <>

    <PrimaryButton type="reset" onClick={()=>{navigate('/products')}}>Back</PrimaryButton>
    <h1 className="font-bold text-3xl m-2">
    {createProduct? 'Crear': 'Editar'}
    </h1>
    información del producto
    {createProduct? <ProductForm />: <ProductForm product={product}/>} 
    </> );
}

export default EditProduct;