export interface MetaInfoPaginated {
    totalItems: number,
    itemCount: number,
    itemsPerPage: number,
    totalPages: number,
    currentPage: number
}
export interface LinksInfoPaginated {
    first: string,
    previous: string,
    next: string,
    last: string,
}
export default interface PaginatedResponse<T> {
    items: T[]
    meta: MetaInfoPaginated,
    links?: LinksInfoPaginated
}