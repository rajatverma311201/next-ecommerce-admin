"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Color } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";

import Fetch from "@/utils/Fetch";
import { toast } from "sonner";
import { AlertModal } from "@/components/modals/alert-modal";

import { NameFormField } from "./name-form-field";
import { ColorsPageHeader } from "./colors-page-header";
import {
    ColorFormValues,
    formSchema,
} from "@/app/(dashboard)/[storeId]/colors/utils";
import { ValueFormField } from "./value-form-field";

interface ColorFormProps {
    initialData: Color | null;
}

export const ColorForm: React.FC<ColorFormProps> = ({ initialData }) => {
    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit color" : "Create color";
    const description = initialData ? "Edit a color." : "Add a new color";

    const action = initialData ? "Save changes" : "Create";

    const form = useForm<ColorFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || { name: "", value: "" },
    });

    const colorId = initialData?.id;
    const { storeId } = params;

    const onSubmit = async (data: ColorFormValues) => {
        try {
            setLoading(true);
            const msg = initialData ? "Updat" : "Creat";
            let toastId = toast.loading(`${msg}ing color...`);
            if (initialData) {
                await Fetch.PATCH(`/api/${storeId}/colors/${colorId}`, data);
            } else {
                await Fetch.POST(`/api/${storeId}/colors`, data);
            }
            router.push(`/${storeId}/colors`);
            router.refresh();
            toast.dismiss(toastId);
            toast.success(`Color ${msg}ed successfully.`);
        } catch (error: any) {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const onDelete = async () => {
        try {
            setLoading(true);
            const toastId = toast.loading("Deleting color...");
            await Fetch.DELETE(`/api/${storeId}/colors/${colorId || ""}`);
            toast.dismiss(toastId);
            toast.success("Color deleted.");
            router.push("/");
            router.refresh();
        } catch (error: any) {
            toast.error(
                "Make sure you removed all colors using  this color first.",
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
            <ColorsPageHeader
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
