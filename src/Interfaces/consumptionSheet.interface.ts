import ConsumptionSheetDetail from "./consumptionSheetDetail.interface";
import Patient from "./patient.interface";
import Room from "./room.interface";
import Staff from "./staff.interface";

export default interface ConsumptionSheet {
    id?: number,
    total?: number,
    doctor: string,
    diagnosis: string,
    patient_id: number,
    patient?: Patient,
    room_id: number,
    room?: Room,
    // created_by_id: number,
    // created_by?: Staff,
    discharge_date?: Date,
    admission_date: string,
    created_at?: Date,
    deleted_at?: Date,
    consumptions?:ConsumptionSheetDetail[]
}