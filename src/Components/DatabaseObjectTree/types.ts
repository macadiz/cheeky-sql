import { SxProps } from "@mui/material";

export type ObjectTreeItemProps = {
    name: string;
    iconName: ObjectTreeIcon;
    isSelected?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClick?: (...args: any[]) => any;
    objects?: DatabaseObject[];
}

export type ObjectTreeIcon = "Table" | "Function" | "Procedure" | "Database";

export type DatabaseObjectTreeProps = {
    objects: DatabaseObject[],
    sx: SxProps;
}

export type DatabaseObject = {
    name: string,
    icon: ObjectTreeIcon,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClick?: (...args: any[]) => any;
    objects?: DatabaseObject[];
    isSelected?: boolean;
}