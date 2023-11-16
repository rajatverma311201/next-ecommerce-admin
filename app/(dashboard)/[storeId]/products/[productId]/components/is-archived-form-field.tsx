"use client";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { FormFieldProps } from "@/app/(dashboard)/[storeId]/products/utils";

import { Checkbox } from "@/components/ui/checkbox";

export const IsArchivedFormField: React.FC<FormFieldProps> = ({ form }) => {
    return (
        <FormField
            control={form.control}
            name="isArchived"
            render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                        <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                        <FormLabel>Archived</FormLabel>
                        <FormDescription>
                            This product will not appear anywhere in the store.
                        </FormDescription>
                    </div>
                </FormItem>
            )}
        />
    );
};
