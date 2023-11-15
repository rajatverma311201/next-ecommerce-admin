"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Billboard, Category } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";

import Fetch from "@/utils/Fetch";
import { toast } from "sonner";
import { AlertModal } from "@/components/modals/alert-modal";

import { NameFormField } from "./name-form-field";
import { CategoriesPageHeader } from "./categories-page-header";
import {
    CategoryFormValues,
    formSchema,
} from "@/app/(dashboard)/[storeId]/categories/utils";

import { BillboardSelectField } from "./billboard-select-field";

interface CategoryFormProps {
    initialData: Category | null;
    billboards: Billboard[];
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
    initialData,
    billboards,
}) => {
    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit category" : "Create category";
    const description = initialData ? "Edit a category." : "Add a new category";

    const action = initialData ? "Save changes" : "Create";

    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(formSchema),
        // defaultValues: initialData || { label: "", imageUrl: "" },
    });

    const categoryId = initialData?.id;
    const { storeId } = params;

    const onSubmit = async (data: CategoryFormValues) => {
        try {
            setLoading(true);
            const msg = initialData ? "Updat" : "Creat";
            let toastId = toast.loading(`${msg}ing category...`);
            if (initialData) {
                await Fetch.PATCH(
                    `/api/${storeId}/categories/${categoryId}`,
                    data,
                );
            } else {
                await Fetch.POST(`/api/${storeId}/categories`, data);
            }
            router.push(`/${storeId}/categories`);
            router.refresh();
            toast.dismiss(toastId);
            toast.success(`Category ${msg}ed successfully.`);
        } catch (error: any) {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const onDelete = async () => {
        try {
            setLoading(true);
            const toastId = toast.loading("Deleting category...");
            await Fetch.DELETE(
                `/api/${storeId}/categories/${categoryId || ""}`,
            );
            toast.dismiss(toastId);
            toast.success("Category deleted.");
            router.push("/");
            router.refresh();
        } catch (error: any) {
            toast.error(
                "Make sure you removed all categories using  this category first.",
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
            <CategoriesPageHeader
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
                        <BillboardSelectField
                            form={form}
                            loading={loading}
                            billboards={billboards}
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
