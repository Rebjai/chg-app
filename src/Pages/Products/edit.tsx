import { useTranslation } from "react-i18next";
import { useFetchers, useLoaderData, useLocation, useNavigate, useNavigation, useParams } from "react-router-dom";
import ProductForm from "../../Components/products/ProductForm";
import PrimaryButton from "../../Components/utils/PrimaryButton";
import Product from "../../Interfaces/product.interface";

function EditProduct() {
    const {t} = useTranslation()
    const navigate = useNavigate()
    const {id} = useParams()
    const {state} = useLocation()
    const createProduct =  useLocation().pathname.split('/')[2] == 'create'
    console.log({state});
    
    const product :Product = useLoaderData() as Product
    const fetchers = useFetchers()
    console.log({fetchers});
    
    return ( <>

    <PrimaryButton type="reset" onClick={()=>{navigate('/products')}}>{t('back')}</PrimaryButton>
    <h1 className="font-bold text-3xl m-2">
    {createProduct? t('create'): t('edit')}
    </h1>
    {t('info_for')} {t('product')}
    {createProduct? <ProductForm  prevRoute={state}/>: <ProductForm product={product} prevRoute={state}/>} 
    </> );
}

export default EditProduct;