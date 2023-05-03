export default interface Patient {
    id?: number,
    name: string,
    first_surname: string,
    second_surname: string,
    date_of_birth?: string,
    active?: number,
    created_at?: Date,
}