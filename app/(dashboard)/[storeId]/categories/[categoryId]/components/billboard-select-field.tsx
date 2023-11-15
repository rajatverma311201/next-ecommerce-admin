"use client";
import { Input } from "@/components/ui/input";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { FormFieldProps } from "@/app/(dashboard)/[storeId]/categories/utils";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Billboard } from "@prisma/client";

export const BillboardSelectField: React.FC<
    FormFieldProps & { billboards: Billboard[] }
> = ({ form, loading, billboards }) => {
    return (
        <FormField
            control={form.control}
            name="billboardId"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Billboard</FormLabel>
                    <Select
                        disabled={loading}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                    >
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue
                                    defaultValue={field.value}
                                    placeholder="Select a billboard"
                                />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {billboards.map((billboard) => (
                                <SelectItem
                                    key={billboard.id}
                                    value={billboard.id}
                                >
                                    {billboard.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
