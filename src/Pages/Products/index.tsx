import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import PrimaryButton from "../../Components/utils/PrimaryButton";
import ProductCard from "../../Components/products/ProductCard";
import Product from "../../Interfaces/product.interface";
import PaginatedResponse from "../../Interfaces/paginatedResponse.interface";
import PaginationComponent from "../../Components/utils/PaginationComponent";
import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { useDebounce } from "../../Utils/UseDebounce";

function indexProduct() {
    let navigate = useNavigate()
    const [searchparams, setSearchParams] = useSearchParams({name:''})
    const [searchTerm, setSearchTerm] = useState(searchparams.get('name')??'');
    console.log({searchparams});
    
    const { items: products, links, meta } = useLoaderData() as PaginatedResponse<Product>
    const filterProducts = (value: string) => {
        setSearchParams((prev)=> {
            console.log({prev});
            return {name: value}
        })
    }
    const debouncedSearchTerm = useDebounce(searchTerm, 2000, filterProducts);

    return (<>
        <h1 className="text-2xl font-bold m-5">lista de productos</h1>
        <PrimaryButton onClick={() => {
            navigate('create')
        }}>
            agregar producto
        </PrimaryButton>
        <input className="m-5 p-3 text-center" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="text"name="seach" id="search" placeholder="Buscar" />
        {products.map(product => <ProductCard product={product} key={product.id}></ProductCard>)}
        <PaginationComponent links={links!} meta={meta!} />
    </>);
}

export default indexProduct;