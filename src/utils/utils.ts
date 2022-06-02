export interface ITodoItem {
    name: string
    isCompleted: boolean
}

export interface IEditItem {
    id: number
    name: string
}

export enum RouterStatus {
    DEFAULT = '/',
    ALL = '/all',
    ACTIVE = '/active',
    COMPLETED = '/completed'
}