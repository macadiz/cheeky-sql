export type DataTableKeyValue = {
    [key: string]: string
}

export type DataTypeColumns = {
    name: string;
    title?: string;
}

export type DataTableObject = {
    columns: DataTypeColumns[],
    rows: DataTableKeyValue[]
}