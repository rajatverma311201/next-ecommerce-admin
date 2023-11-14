"use client";

import { Loader2 } from "lucide-react";

export const Loader = () => {
    return (
        <Loader2
            className="aspect-square animate-spin text-primary"
            size={50}
        />
    );
};
