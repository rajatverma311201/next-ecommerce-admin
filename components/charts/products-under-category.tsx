"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Cell, Label, Pie, PieChart, Tooltip } from "recharts";

interface ProductsUnderCategoryProps {
    data: { name: string; total: number }[];
}

export const ProductsUnderCategory: React.FC<ProductsUnderCategoryProps> = ({
    data,
}) => {
    const [mounted, setMounted] = useState(false);

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <>
            <PieChart width={800} height={400} defaultShowTooltip>
                <Pie
                    data={data}
                    cx={120}
                    cy={200}
                    innerRadius={60}
                    outerRadius={100}
                    // fill="#8884d8"
                    // paddingAngle={5}
                    dataKey="total"
                    strokeWidth={0}
                    label={true}
                    // labelLine={true}
                >
                    {data.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                            onMouseEnter={() => {
                                console.log(entry.name);
                                setHoveredIndex(index);
                            }}
                            onMouseLeave={() => {
                                console.log(entry.name);
                                setHoveredIndex(null);
                            }}
                        ></Cell>
                    ))}
                    <Label
                        content={() => {
                            return hoveredIndex
                                ? data[hoveredIndex]?.name
                                : null;
                        }}
                    ></Label>
                </Pie>
                <Tooltip
                    contentStyle={{
                        borderRadius: "10px",
                        paddingBlock: 0,
                        paddingInline: "10px",
                    }}
                    content={(obj) => {
                        console.log(obj);

                        const payload = obj?.payload?.[0]?.payload;
                        const fillColor = payload?.fill;

                        const label = payload?.name;

                        if (!label) return null;

                        const value = payload?.total;
                        return (
                            <div className="flex items-center gap-2 rounded border bg-accent px-2 py-1">
                                <div
                                    className={cn(
                                        "h-3 w-3 rounded border border-white",
                                    )}
                                    style={{ backgroundColor: fillColor }}
                                />
                                <span className="text-sm">{label}</span>
                                <div className="">{value}</div>
                            </div>
                        );
                    }}
                />
            </PieChart>
        </>
    );
};
