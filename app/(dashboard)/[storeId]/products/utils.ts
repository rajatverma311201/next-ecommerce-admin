import { useForm } from "react-hook-form";
import * as z from "zod";

export const formSchema = z.object({
    name: z.string().min(1),
    images: z.object({ url: z.string() }).array(),
    price: z.coerce.number().min(1),
    categoryId: z.string().min(1),
    colorId: z.string().min(1),
    sizeId: z.string().min(1),
    isFeatured: z.boolean().default(false).optional(),
    isArchived: z.boolean().default(false).optional(),
});

export type ProductFormValues = z.infer<typeof formSchema>;

export interface FormFieldProps {
    form: ReturnType<typeof useForm<ProductFormValues>>;
    loading: boolean;
}
