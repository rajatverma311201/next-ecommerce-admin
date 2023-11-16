"use client";
import { Input } from "@/components/ui/input";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { FormFieldProps } from "@/app/(dashboard)/[storeId]/colors/utils";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Size } from "@prisma/client";

export const SizeFormField: React.FC<FormFieldProps & { sizes: Size[] }> = ({
    form,
    loading,
    sizes,
}) => {
    return (
        <FormField
            control={form.control}
            name="sizeId"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Size</FormLabel>
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
                                    placeholder="Select a size"
                                />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {sizes.map((size) => (
                                <SelectItem key={size.id} value={size.id}>
                                    {size.name}
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
