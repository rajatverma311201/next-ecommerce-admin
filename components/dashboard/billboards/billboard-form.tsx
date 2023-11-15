"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Billboard } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";

import Fetch from "@/utils/Fetch";
import { toast } from "sonner";
import { AlertModal } from "@/components/modals/alert-modal";
import { BillboardFormValues, formSchema } from "./utils";
import { ImageUploadFormField } from "./image-upload-form-field";
import { LabelFormField } from "./label-form-field";
import { BillboardsPageHeader } from "./billboards-page-header";

interface BillboardFormProps {
    initialData: Billboard | null;
}

export const BillboardForm: React.FC<BillboardFormProps> = ({
    initialData,
}) => {
    const params = useParams();
    const router = useRouter();

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
            router.push(`/${storeId}/billboards`);
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
            toast.dismiss(toastId);
            toast.success("Billboard deleted.");
            router.push("/");
        } catch (error: any) {
            toast.error(
                "Make sure you removed all categories using  this billboard first.",
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
            <BillboardsPageHeader
                initialData={initialData}
                loading={loading}
                title={title}
                description={description}
                setOpen={setOpen}
            />
            <Separator />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full space-y-8"
                >
                    <ImageUploadFormField form={form} loading={loading} />
                    <div className="grid grid-cols-3 gap-8">
                        <LabelFormField form={form} loading={loading} />
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
