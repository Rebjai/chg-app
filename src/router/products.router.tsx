import { RouteObject } from "react-router-dom";
import ProductsActions from "../actions/Products/Product.actions";
import IndexProduct from "../Pages/Products";
import EditProduct from "../Pages/Products/edit";
const ProductRouter: RouteObject = {
    path: '',
    children: [
        {
            path: '',
            element: <IndexProduct />,
            loader: ProductsActions.getAll,
            index: true

        },
        {
            path: 'create',
            element: <EditProduct />,
            action: ProductsActions.create,
            // index: true
            
        },
        {
            path: ':id',
            element: <EditProduct />,
            action: ProductsActions.update,
            loader: ProductsActions.getById
            // index: true
            
        },
        {
            path: ':id/edit',
            element: <EditProduct />,
            action: ProductsActions.update,
            loader: ProductsActions.getById

        }
    ]
};

export default ProductRouter;