import { useLoaderData, useNavigate } from "react-router-dom";
import PrimaryButton from "../../Components/utils/PrimaryButton";
import ProductCard from "../../Components/products/ProductCard";
import Product from "../../Interfaces/product.interface";
import PaginatedResponse from "../../Interfaces/paginatedResponse.interface";
import PaginationComponent from "../../Components/utils/PaginationComponent";

function indexProduct() {
    let navigate= useNavigate()
    const {items:products, links, meta} = useLoaderData() as PaginatedResponse<Product>
    return (<>
        <PrimaryButton onClick={() => {
            navigate('create')
        }}>
            agregar producto
        </PrimaryButton>
        lista de productos
        {products.map(product => <ProductCard product={product} key={product.id}></ProductCard>)}
        <PaginationComponent links={links!} meta={meta!} />
    </>);
}

export default indexProduct;