export type ObjectTreeItemProps = {
    name: string;
    iconName: ObjectTreeIcon;
    isSelected?: boolean;
    onClick?: () => void;
}

export type ObjectTreeIcon = "Table" | "Function" | "Procedure" | "Database";

export type DatabaseObjectTreeProps = {
    objects: DatabaseObject[]
}

export type DatabaseObject = {
    name: string,
    icon: ObjectTreeIcon,
    onClick?: () => void;
    objects: DatabaseObject[];
    isSelected?: boolean;
}