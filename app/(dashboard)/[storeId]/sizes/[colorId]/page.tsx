import { SizeForm } from "./components/size-form";
import prismadb from "@/lib/prismadb";

interface SizeIdPageProps {
    params: {
        sizeId: string;
        storeId: string;
    };
}

const SizeIdPage: React.FC<SizeIdPageProps> = async ({ params }) => {
    const { sizeId, storeId } = params;

    let size = null;

    try {
        size = await prismadb.size.findUnique({
            where: {
                id: sizeId,
            },
        });
    } catch (error: any) {
        console.log(error);
    }

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SizeForm initialData={size} />
            </div>
        </div>
    );
};
export default SizeIdPage;
