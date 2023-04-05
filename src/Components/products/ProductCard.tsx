import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import deleteIcon from "../../assets/delete-icon.svg";
import editIcon from "../../assets/edit-icon.svg";
import Product from "../../Interfaces/product.interface";
interface ProductCardProps {
    product: Product,
    prev?: string
}

function ProductCard({ product, prev = '' }: ProductCardProps) {
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
        <div className="card rounded min-w-[200px] bg-cyan-200 my-2 p-3 drop-shadow-lg w-10/12">
            <h1 className="font-bold text-lg tracking-wider">{`${product.name}`}</h1>
            <h2 className="font-bold text-medium tracking-wider">{`${product.category_id ? `${product.category?.code} -  ${product.category?.name!}` : 'n/a'}`}</h2>
            <p className="italic">${product.price}</p>
            <div className="actions flex justify-end w-full ">
                <Link className="max-w-[100px] w-1/12 mx-3" to={'' + product.id} state={prev} >
                    <img src={editIcon} alt="" />
                </Link>
                <button className="max-w-[100px] w-1/12 mx-3">
                    <img src={deleteIcon} alt="" />
                </button>
            </div>

        </div>);
}

export default ProductCard;