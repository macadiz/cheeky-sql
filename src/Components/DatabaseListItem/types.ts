import { Connection } from "../../Context/ConnectionsContext/types"

export type DatabaseListItemProps = {
    connection: Connection;
    onItemClick: (connection: Connection) => void;
    showDeleteIcon?: boolean;
    onDeleteClick?: (connection: Connection) => void;
    isSelected?: boolean;
}