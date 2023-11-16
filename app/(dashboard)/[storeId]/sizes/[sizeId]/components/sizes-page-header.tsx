"use client";
import { Trash } from "lucide-react";
import { Size } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";

interface SizesPageHeaderProps {
    initialData: Size | null;
    loading: boolean;
    title: string;
    description: string;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SizesPageHeader: React.FC<SizesPageHeaderProps> = ({
    initialData,
    loading,
    title,
    description,
    setOpen,
}) => {
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={title} description={description} />
                {initialData && (
                    <Button
                        disabled={loading}
                        variant="destructive"
                        size="sm"
                        onClick={() => setOpen(true)}
                    >
                        <Trash className="h-4 w-4" />
                    </Button>
                )}
            </div>
        </>
    );
};
