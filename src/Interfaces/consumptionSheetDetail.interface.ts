import Area from "./area.interface";
import ConsumptionSheet from "./consumptionSheet.interface";
import Patient from "./patient.interface";
import Product from "./product.interface";
import Room from "./room.interface";
import Staff from "./staff.interface";
import User from "./user.interface";

export default interface ConsumptionSheetDetail {
    id?: number,
    product_id: number,
    product?: Product,
    consumption_sheet_id: number,
    consumption_sheet?: ConsumptionSheet,
    area?: Area,
    area_id?: number,
    user_id: number,
    user?: User,
    staff_id: number,
    staff?: Staff,
    quantity:number,
    total?: number,
    created_at?: Date,
}