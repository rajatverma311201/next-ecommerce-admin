import { useForm } from "react-hook-form";
import * as z from "zod";

export const formSchema = z.object({
    name: z.string().min(2),
    value: z.string().min(4).max(9).regex(/^#/, {
        message: "String must be a valid hex code",
    }),
});

export type ColorFormValues = z.infer<typeof formSchema>;

export interface FormFieldProps {
    form: ReturnType<typeof useForm<ColorFormValues>>;
    loading: boolean;
}
