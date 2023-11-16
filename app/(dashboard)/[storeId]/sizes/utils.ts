import { useForm } from "react-hook-form";
import * as z from "zod";

export const formSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(1),
});

export type SizeFormValues = z.infer<typeof formSchema>;

export interface FormFieldProps {
    form: ReturnType<typeof useForm<SizeFormValues>>;
    loading: boolean;
}
