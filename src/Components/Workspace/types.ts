import { ResultSet } from "../../Context/WorkspaceContext/types"

export type ResultsDisplayProps = {
    resultsSet: ResultSet[];
}

export type ColumnWidth = {
    columnName: string;
    width: number;
}