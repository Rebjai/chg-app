import ProductSatCategory from "./product-sat-category.interface";

export default interface Product {
    id?: number,
    name: string,
    price: number,
    category_id?: number
    category?: ProductSatCategory
}