"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Trash } from "lucide-react";
import { Billboard } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { ApiAlert } from "@/components/api-alert";
import { useOrigin } from "@/hooks/use-origin";
import Fetch from "@/utils/Fetch";
import { toast } from "sonner";
import { AlertModal } from "@/components/modals/alert-modal";
import ImageUpload from "@/components/image-upload";

const formSchema = z.object({
    label: z.string().min(2),
    imageUrl: z.string().min(1),
});

type BillboardFormValues = z.infer<typeof formSchema>;

interface BillboardFormProps {
    initialData: Billboard | null;
}

export const BillboardForm: React.FC<BillboardFormProps> = ({
    initialData,
}) => {
    const params = useParams();
    const router = useRouter();
    const origin = useOrigin();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit billboard" : "Create billboard";
    const description = initialData
        ? "Edit a billboard."
        : "Add a new billboard";

    const action = initialData ? "Save changes" : "Create";

    const form = useForm<BillboardFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || { label: "", imageUrl: "" },
    });

    const billboardId = initialData?.id;
    const { storeId } = params;

    const onSubmit = async (data: BillboardFormValues) => {
        try {
            setLoading(true);
            const toastId = toast.loading("Updating billboard...");
            if (initialData) {
                await Fetch.PATCH(
                    `/api/${storeId}/billboards/${billboardId}`,
                    data,
                );
            } else {
                await Fetch.POST(`/api/${storeId}/billboards`, data);
            }
            router.refresh();
            toast.dismiss(toastId);
            toast.success("Billboard updated.");
        } catch (error: any) {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const onDelete = async () => {
        try {
            setLoading(true);
            const toastId = toast.loading("Deleting billboard...");
            await Fetch.DELETE(
                `/api/${storeId}/billboards/${billboardId || ""}`,
            );
            router.refresh();
            router.push("/");
            toast.dismiss(toastId);
            toast.success("Billboard deleted.");
        } catch (error: any) {
            toast.error(
                "Make sure you removed all products and categories first.",
            );
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <div className="flex items-center justify-between">
                <Heading title={title} description={description} />
                {initialData && (
                    <Button
                        disabled={loading}
                        variant="destructive"
                        size="sm"
                        onClick={() => setOpen(true)}
                    >
                        <Trash className="h-4 w-4" />
                    </Button>
                )}
            </div>
            <Separator />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Label</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value ? [field.value] : []}
                                        disabled={loading}
                                        onChange={(url) => field.onChange(url)}
                                        onRemove={() => field.onChange("")}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="label"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Label</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Billboard label"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        disabled={loading}
                        className="ml-auto"
                        type="submit"
                    >
                        {action}
                    </Button>
                </form>
            </Form>
            <Separator />
        </>
    );
};
