import { useLoaderData, useNavigate } from "react-router-dom";
import PrimaryButton from "../../Components/utils/PrimaryButton";
import ProductCard from "../../Components/products/ProductCard";
import Product from "../../Interfaces/product.interface";

function indexProduct() {
    let navigate= useNavigate()
    const products = useLoaderData() as Product[]
    return (<>
        <PrimaryButton onClick={() => {
            navigate('create')
        }}>
            agregar producto
        </PrimaryButton>
        lista de productos
        {products.map(product => <ProductCard product={product} key={product.id}></ProductCard>)}
    </>);
}

export default indexProduct;