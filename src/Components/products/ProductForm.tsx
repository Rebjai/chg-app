import { useEffect, useState } from "react";
import { Form, useFetcher, useParams } from "react-router-dom";
import Product from "../../Interfaces/product.interface";
import PrimaryButton from "../utils/PrimaryButton";
import AsyncSelect from 'react-select/async';
import SelectInput from "../utils/SelectInput";
import { useFetch } from "../../Utils/useFecth";
import ProductSatCategory from "../../Interfaces/product-sat-category.interface";
interface ProductFormProps {
    product?: Product
    prevRoute: string
}
function ProductForm(props?: ProductFormProps) {
    const fetch = useFetch()
    const fetcher = useFetcher()
    const typeOptions = [
        { value: '', label: 'Selecciona un elemento de la lista' },
        { value: 1, label: 'Normal' },
        { value: 2, label: 'ICU' },
        { value: 3, label: 'n/a' },
    ]
    const statusOptions = [
        { value: '', label: 'Selecciona un elemento de la lista' },
        { value: 1, label: 'Active' },
        { value: 2, label: 'Inactive' },
        { value: 3, label: 'n/a' },
    ]
    const [productSatCategoryOptions, setProductSatCategoryOptions] = useState([]);

    const loadOptions = async (inputValue: string = '') => {
        const response = await fetch.get(`/api/product-sat-category?q=${inputValue}`);
        const options = response.data.items.map((result: ProductSatCategory) => {
            return ({

                value: result.id,
                label: result.code + ' - ' + result.name
            })
        });
        setProductSatCategoryOptions(options);
        return options
    };
    const createProduct = !!!props?.product?.id
    const [newProduct, setNewProduct] = useState<Product>(props?.product ? props.product : {
        id: 0,
        name: '',
        price: 1,
    });
    const [prevRoute, setPrevRoute] = useState(props?.prevRoute??'')

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        console.log({ name, value });

        setNewProduct((prevNewProduct) => ({ ...prevNewProduct, [name]: value }));
    };
    const handleTypeInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        console.log({ event });

        setNewProduct((prevNewProduct) => ({ ...prevNewProduct, [name]: value }));
    };

    const handleCreateProduct = (event: React.FormEvent) => {
        // event.preventDefault();
        console.log('New product:', newProduct);
        fetcher.submit(fetcher.formData!)
    };

    console.log({prevRoute});
    
    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">{createProduct ? 'Create a new product' : 'Edit product'}</h1>
            <fetcher.Form onSubmit={handleCreateProduct} method={createProduct ? 'post' : 'put'}>
                <div className="flex flex-col mb-4">
                    <label htmlFor="name" className="mb-2 font-bold">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={newProduct.name}
                        onChange={handleInputChange}
                        className="border border-gray-400 p-2"
                        required
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="price" className="mb-2 font-bold">
                        Price
                    </label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        value={newProduct.price}
                        onChange={handleInputChange}
                        className="border border-gray-400 p-2"
                        required
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="Category_id" className="mb-2 font-bold">
                        Category
                    </label>
                    <AsyncSelect
                        id="category_id"
                        name="category_id"
                        cacheOptions defaultOptions
                        loadOptions={loadOptions}
                        placeholder="Search..."
                    />
                </div>
                <input type="hidden" name="prev-route" value={prevRoute}/>
                {/* <div className="flex flex-col mb-4">
                    <label htmlFor="type" className="mb-2 font-bold">
                        Status
                    </label>
                    <SelectInput options={statusOptions} onChange={handleTypeInputChange} value='1' name='status' />
                </div> */}
                <PrimaryButton type="submit" onClick={() => console.log('submit')}>
                    {createProduct ? 'Create Product' : 'Edit Product'}
                </ PrimaryButton>
            </fetcher.Form>
        </div>
    );
}

export default ProductForm;