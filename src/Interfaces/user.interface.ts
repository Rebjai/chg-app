import Staff from "./staff.interface";

export default interface User {
    id?: number,
    email: string,
    role: string,
    profile?: Staff,
    rt?: string,
    created_at?: Date,
}