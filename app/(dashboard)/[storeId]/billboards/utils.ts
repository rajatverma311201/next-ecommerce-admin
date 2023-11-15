import { useForm } from "react-hook-form";
import * as z from "zod";

export const formSchema = z.object({
    label: z.string().min(2),
    imageUrl: z.string().min(1),
});

export type BillboardFormValues = z.infer<typeof formSchema>;

export interface FormFieldProps {
    form: ReturnType<typeof useForm<BillboardFormValues>>;
    loading: boolean;
}
