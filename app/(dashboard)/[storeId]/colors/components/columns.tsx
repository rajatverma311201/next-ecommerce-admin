"use client";

export interface ColorColumn {
    id: string;
    name: string;
    value: string;
    createdAt: string;
}

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export const columns: ColumnDef<ColorColumn>[] = [
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
        accessorKey: "color",
        header: "Color",
        cell: ({ row }) => (
            <>
                <div
                    className="h-7 w-7 rounded-full border-2"
                    style={{ backgroundColor: row.original.value }}
                />
            </>
        ),
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
