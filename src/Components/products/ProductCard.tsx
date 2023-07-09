import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useFetcher, useNavigate } from "react-router-dom";
import deleteIcon from "../../assets/delete-icon.svg";
import editIcon from "../../assets/edit-icon.svg";
import Product from "../../Interfaces/product.interface";
interface ProductCardProps {
    product: Product,
    prev?: string
}

function ProductCard({ product, prev = '' }: ProductCardProps) {
    const {t} = useTranslation()
    const fetcher = useFetcher()
    const getStatusText = (status: number): string => {
        if (status == 0) {
            return 'Occupied'
        }
        if (status == 1) {
            return 'Available'
        }
        if (status == 2) {
            return 'Mantainment'
        }
        return 'n/a'
    }

    return (
        <div className="card rounded-lg min-w-[200px] border-transparent border-2 my-4 p-3 shadow-lg shadow-cyan-900/50 w-10/12">
            <h1 className="font-bold text-lg tracking-wider">{`${product.name}`}</h1>
            <h2 className="font-bold text-medium tracking-wider">{`${product.category_id ? `${product.category?.code} -  ${product.category?.name!}` : t('categoryNotAvailable')}`}</h2>
            <p className="italic">${product.price}</p>
            <div className="actions flex justify-end w-full ">
                <Link className="max-w-[100px] w-1/12 mx-3" to={'' + product.id} state={prev} >
                    <img src={editIcon} alt={t('edit')!} /> 
                </Link>
                <fetcher.Form method="delete" action={"/products/" + product.id} className="max-w-[100px] w-1/12 mx-3">
                    <button type="submit" className="inline-block max-w-[100px] w-full mx-3">
                        <img src={deleteIcon} alt={t('delete')!} /> 
                    </button>
                </fetcher.Form>
            </div>
        </div>
    );
};

export default ProductCard;