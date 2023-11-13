"use client";
import { useStoreModal } from "@/hooks/use-store-modal";
import React, { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Fetch from "@/utils/Fetch";
import { toast } from "sonner";

const formSchema = z.object({
    name: z.string().min(1),
});

type FormValues = z.infer<typeof formSchema>;

export const StoreModal = () => {
    const { isOpen, onClose } = useStoreModal();

    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = async (values: FormValues) => {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);

        try {
            setLoading(true);

            const toastId = toast.loading("Creating store...");

            const response = await Fetch.POST("api/stores", values);

            toast.dismiss(toastId);

            toast.success("Store created!");

            window.location.assign(`/${response.id}`);
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                title="Create Store"
                description="Add a new store to manage your products and categories"
            >
                <div>
                    <div className="space-y-4 py-2 pb-4">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={loading}
                                                    placeholder="E-Commerce"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex w-full items-center justify-end space-x-2 pt-6">
                                    <Button
                                        type="button"
                                        disabled={loading}
                                        variant="outline"
                                        onClick={onClose}
                                    >
                                        Cancel
                                    </Button>
                                    <Button disabled={loading} type="submit">
                                        Continue
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </Modal>
        </>
    );
};
