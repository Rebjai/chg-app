import ConsumptionSheet from "./consumptionSheet.interface";
import Patient from "./patient.interface";
import Product from "./product.interface";
import Room from "./room.interface";
import Staff from "./staff.interface";

export default interface ConsumptionSheetDetail {
    id?: number,
    product_id: number,
    product?: Product,
    consumption_sheet_id: number,
    consumption_sheet?: ConsumptionSheet,
    // created_by_id: number,
    // created_by?: Staff,
    staff_id: number,
    staff?: Staff,
    quantity:number,
    total?: number,
    created_at?: Date,
}