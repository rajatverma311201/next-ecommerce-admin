import { useStoreModal } from "@/hooks/use-store-modal";
import React from "react";
import { Modal } from "@/components/ui/modal";

export const StoreModal = () => {
    const { isOpen, onClose } = useStoreModal();

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                title="Create Store"
                description="Add a new store to manage your products and categories"
            >
                STORE MODAL
            </Modal>
        </>
    );
};
