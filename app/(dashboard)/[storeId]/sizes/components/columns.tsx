"use client";

export interface SizeColumn {
    id: string;
    name: string;
    value: string;
    createdAt: string;
}

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export const columns: ColumnDef<SizeColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "value",
        header: "Value",
        cell: ({ row }) => <p>{row.original.value.toUpperCase()}</p>,
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />,
    },
];
