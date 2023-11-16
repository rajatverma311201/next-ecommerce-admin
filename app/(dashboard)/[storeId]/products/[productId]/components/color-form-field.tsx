"use client";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { FormFieldProps } from "@/app/(dashboard)/[storeId]/products/utils";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Color } from "@prisma/client";

export const ColorFormField: React.FC<FormFieldProps & { colors: Color[] }> = ({
    form,
    loading,
    colors,
}) => {
    return (
        <FormField
            control={form.control}
            name="colorId"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Color</FormLabel>
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
                                    placeholder="Select a color"
                                />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {colors.map((color) => (
                                <SelectItem key={color.id} value={color.id}>
                                    {color.name}
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
