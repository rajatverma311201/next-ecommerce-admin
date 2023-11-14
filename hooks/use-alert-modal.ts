import { create } from "zustand";

interface UseAlertModalProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}
export const useAlertModal = create<UseAlertModalProps>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
