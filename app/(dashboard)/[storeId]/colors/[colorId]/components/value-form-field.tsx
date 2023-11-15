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

export const ValueFormField: React.FC<FormFieldProps> = ({ form, loading }) => {
    return (
        <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Value</FormLabel>
                    <FormControl>
                        <div className="flex items-center gap-x-4">
                            <Input
                                disabled={loading}
                                placeholder="Color hex value"
                                {...field}
                            />
                            <Input
                                type="color"
                                disabled={loading}
                                placeholder="Color hex value"
                                {...field}
                            />

                            <div
                                className="rounded-full border p-4"
                                style={{ backgroundColor: field.value }}
                            />
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
