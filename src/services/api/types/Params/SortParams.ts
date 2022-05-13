export type SortParams<T> = {
    [P in keyof T]?: 'asc' | 'desc'
}