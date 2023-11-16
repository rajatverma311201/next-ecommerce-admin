"use client";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { FormFieldProps } from "@/app/(dashboard)/[storeId]/products/utils";
import ImageUpload from "@/components/image-upload";

export const ImageFormField: React.FC<FormFieldProps> = ({ form, loading }) => {
    return (
        <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Images</FormLabel>
                    <FormControl>
                        <ImageUpload
                            value={field.value.map((image) => image.url)}
                            disabled={loading}
                            onChange={(url) =>
                                field.onChange([...field.value, { url }])
                            }
                            onRemove={(url) =>
                                field.onChange([
                                    ...field.value.filter(
                                        (current) => current.url !== url,
                                    ),
                                ])
                            }
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
