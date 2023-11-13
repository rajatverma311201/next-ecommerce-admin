"use client";
import { StoreModal } from "@/components/modals/store-modal";
import { Button } from "@/components/ui/button";
import { useStoreModal } from "@/hooks/use-store-modal";
import { UserButton } from "@clerk/nextjs";

const SetupPage = () => {
    const store = useStoreModal();

    return (
        <div>
            <UserButton afterSignOutUrl="/sign-in" />

            <StoreModal />
            <Button onClick={store.onOpen}>Create Store</Button>
        </div>
    );
};

export default SetupPage;
