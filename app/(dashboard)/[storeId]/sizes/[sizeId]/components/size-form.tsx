"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Size } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";

import Fetch from "@/utils/Fetch";
import { toast } from "sonner";
import { AlertModal } from "@/components/modals/alert-modal";

import { NameFormField } from "./name-form-field";
import { SizesPageHeader } from "./sizes-page-header";
import {
    SizeFormValues,
    formSchema,
} from "@/app/(dashboard)/[storeId]/sizes/utils";
import { ValueFormField } from "./value-form-field";

interface SizeFormProps {
    initialData: Size | null;
}

export const SizeForm: React.FC<SizeFormProps> = ({ initialData }) => {
    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit size" : "Create size";
    const description = initialData ? "Edit a size." : "Add a new size";

    const action = initialData ? "Save changes" : "Create";

    console.log("initialData", initialData);

    const form = useForm<SizeFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || { name: "", value: "" },
    });

    const sizeId = initialData?.id;
    const { storeId } = params;

    const onSubmit = async (data: SizeFormValues) => {
        try {
            setLoading(true);
            const msg = initialData ? "Updat" : "Creat";
            let toastId = toast.loading(`${msg}ing size...`);
            if (initialData) {
                await Fetch.PATCH(`/api/${storeId}/sizes/${sizeId}`, data);
            } else {
                await Fetch.POST(`/api/${storeId}/sizes`, data);
            }
            router.push(`/${storeId}/sizes`);
            router.refresh();
            toast.dismiss(toastId);
            toast.success(`Size ${msg}ed successfully.`);
        } catch (error: any) {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const onDelete = async () => {
        try {
            setLoading(true);
            const toastId = toast.loading("Deleting size...");
            await Fetch.DELETE(`/api/${storeId}/sizes/${sizeId || ""}`);
            toast.dismiss(toastId);
            toast.success("Size deleted.");
            router.push("/");
            router.refresh();
        } catch (error: any) {
            toast.error(
                "Make sure you removed all sizes using  this size first.",
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
            <SizesPageHeader
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
                    <div className="grid grid-cols-3 gap-8">
                        <NameFormField form={form} loading={loading} />
                        <ValueFormField form={form} loading={loading} />
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
