export type DataTableKeyValue = {
    [key: string]: string
}

export type DataTypeColumns = {
    name: string;
}

export type DataTableObject = {
    columns: DataTypeColumns[],
    data: DataTableKeyValue[]
}