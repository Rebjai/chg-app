import { useLoaderData, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import PrimaryButton from "../../Components/utils/PrimaryButton";
import ProductCard from "../../Components/products/ProductCard";
import Product from "../../Interfaces/product.interface";
import PaginatedResponse from "../../Interfaces/paginatedResponse.interface";
import PaginationComponent from "../../Components/utils/PaginationComponent";
import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { useDebounce } from "../../Utils/UseDebounce";
import { useFetch } from "../../Utils/useFecth";
import { useTranslation } from "react-i18next";

function indexProduct() {
    const {t} = useTranslation()
    const fetch = useFetch()
    let navigate = useNavigate()
    const location = useLocation()
    const [searchparams, setSearchParams] = useSearchParams({ name: '' })
    const [searchTerm, setSearchTerm] = useState(searchparams.get('name') ?? '');
    console.log({ searchparams, location });

    const { items: products, links, meta } = useLoaderData() as PaginatedResponse<Product>
    const filterProducts = (value: string) => {
        setSearchParams((prev) => {
            return { name: value }
        })
    }
    const debouncedSearchTerm = useDebounce(searchTerm, 2000, filterProducts);
    const handleDownload = () => {
        fetch.get('/api/products/download')
            .then((response )=> {
                const csvBlob = new Blob([response], { type: 'text/csv' });
                // Create a download link for the CSV file
                const downloadLink = document.createElement('a');
                downloadLink.href = URL.createObjectURL(csvBlob);
                downloadLink.download = 'data.csv';
                downloadLink.click();
            })
            .catch(error => {
                console.error('Error downloading file:', error);
            });
    }

    return (<>
        <h1 className="text-2xl font-bold m-5">{t('list_of')} {t('products')}</h1>
        <PrimaryButton onClick={() => {
            navigate('create')
        }}>
            {t('create')} {t('product')}
        </PrimaryButton>
        <button className="my-3 bg-blue-600 px-4 py-2 rounded text-white font-bold hover:bg-blue-500" onClick={handleDownload}>{t('export_list')}</button>

        <input className="m-5 p-3 text-center" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="text" name="seach" id="search" placeholder={t('search')??'search'} />
        {products.map(product => <ProductCard product={product} prev={location.pathname + location.search} key={product.id}></ProductCard>)}
        <PaginationComponent links={links!} meta={meta!} />
    </>);
}

export default indexProduct;