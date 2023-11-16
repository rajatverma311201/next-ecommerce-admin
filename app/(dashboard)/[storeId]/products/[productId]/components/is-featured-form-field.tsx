"use client";
import { Input } from "@/components/ui/input";
import {
    FormControl,
    FormDescription,
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
import { Checkbox } from "@/components/ui/checkbox";

export const IsFeaturedFormField: React.FC<FormFieldProps> = ({ form }) => {
    return (
        <FormField
            control={form.control}
            name="isFeatured"
            render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                        <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                        <FormLabel>Featured</FormLabel>
                        <FormDescription>
                            This product will appear on the home page
                        </FormDescription>
                    </div>
                </FormItem>
            )}
        />
    );
};
