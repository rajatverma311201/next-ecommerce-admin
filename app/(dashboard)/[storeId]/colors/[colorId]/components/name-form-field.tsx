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

export const NameFormField: React.FC<FormFieldProps> = ({ form, loading }) => {
    return (
        <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input
                            disabled={loading}
                            placeholder="Color name"
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
