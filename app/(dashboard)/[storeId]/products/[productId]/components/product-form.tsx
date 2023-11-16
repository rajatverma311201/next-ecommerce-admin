"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Category, Color, Image, Product, Size } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";

import Fetch from "@/utils/Fetch";
import { toast } from "sonner";
import { AlertModal } from "@/components/modals/alert-modal";

import { ProductsPageHeader } from "./products-page-header";
import {
    ProductFormValues,
    formSchema,
} from "@/app/(dashboard)/[storeId]/products/utils";
import { ImageFormField } from "./image-form-field";
import { NameFormField } from "./name-form-field";
import { PriceFormField } from "./price-form-field";
import { CategoryFormField } from "./category-form-field";
import { SizeFormField } from "./size-form-field";
import { ColorFormField } from "./color-form-field";
import { IsFeaturedFormField } from "./is-featured-form-field";
import { IsArchivedFormField } from "./is-archived-form-field";

interface ProductFormProps {
    initialData:
        | (Product & {
              images: Image[];
          })
        | null;
    categories: Category[];
    colors: Color[];
    sizes: Size[];
}

export const ProductForm: React.FC<ProductFormProps> = ({
    initialData,
    categories,
    colors,
    sizes,
}) => {
    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit product" : "Create product";
    const description = initialData ? "Edit a product." : "Add a new product";

    const action = initialData ? "Save changes" : "Create";

    const defaultValues = initialData
        ? {
              ...initialData,
              price: parseFloat(String(initialData?.price)),
          }
        : {
              name: "",
              images: [],
              price: 0,
              categoryId: "",
              colorId: "",
              sizeId: "",
              isFeatured: false,
              isArchived: false,
          };
    const form = useForm<ProductFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    const productId = initialData?.id;
    const { storeId } = params;

    const onSubmit = async (data: ProductFormValues) => {
        try {
            setLoading(true);
            const msg = initialData ? "Updat" : "Creat";
            let toastId = toast.loading(`${msg}ing product...`);
            if (initialData) {
                await Fetch.PATCH(
                    `/api/${storeId}/products/${productId}`,
                    data,
                );
            } else {
                await Fetch.POST(`/api/${storeId}/products`, data);
            }
            router.push(`/${storeId}/products`);
            router.refresh();
            toast.dismiss(toastId);
            toast.success(`Product ${msg}ed successfully.`);
        } catch (error: any) {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const onDelete = async () => {
        try {
            setLoading(true);
            const toastId = toast.loading("Deleting product...");
            await Fetch.DELETE(`/api/${storeId}/products/${productId || ""}`);
            toast.dismiss(toastId);
            toast.success("Product deleted.");
            router.push("/");
            router.refresh();
        } catch (error: any) {
            toast.error(
                "Make sure you removed all products using  this product first.",
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
            <ProductsPageHeader
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
                    <ImageFormField form={form} loading={loading} />
                    <div className="grid grid-cols-3 gap-8">
                        <NameFormField form={form} loading={loading} />
                        <PriceFormField form={form} loading={loading} />
                        <CategoryFormField
                            form={form}
                            loading={loading}
                            categories={categories}
                        />
                        <SizeFormField
                            form={form}
                            loading={loading}
                            sizes={sizes}
                        />
                        <ColorFormField
                            form={form}
                            loading={loading}
                            colors={colors}
                        />
                        <IsFeaturedFormField form={form} loading={loading} />
                        <IsArchivedFormField form={form} loading={loading} />
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
