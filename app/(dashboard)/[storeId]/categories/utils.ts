import { useForm } from "react-hook-form";
import * as z from "zod";

export const formSchema = z.object({
    name: z.string().min(2),
    billboardId: z.string().min(1),
});

export type CategoryFormValues = z.infer<typeof formSchema>;

export interface FormFieldProps {
    form: ReturnType<typeof useForm<CategoryFormValues>>;
    loading: boolean;
}
