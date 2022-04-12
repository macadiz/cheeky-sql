import { DataTableKeyValue, DataTableObject, DataTypeColumns } from "./types/dataTypes";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const transformMatrixToDatatable = (resultSet: any[]) => {
    const dataTableData: DataTableObject = {
        columns: [],
        rows: []
    };

    if (resultSet && resultSet.length > 0) {
        const columns: DataTypeColumns[] = resultSet[0].map((header: string) => {
            return {
                name: header,
                title: header
            }
        });

        const dataArray = [...resultSet];
        dataArray.splice(0, 1);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data: DataTableKeyValue[] = dataArray.map((currentData: any[], index) => {
            const newData: DataTableKeyValue = currentData.reduce((previous: DataTableKeyValue, current, index) => {
                const isString = typeof current === 'string' || current instanceof String;
                previous[columns[index].name] = !isString ? current.toString() : current;
                return previous;
            }, {});

            newData.id = index.toString();

            return newData;
        });

        dataTableData.columns = columns;
        dataTableData.rows = data;
    }

    return dataTableData;
};