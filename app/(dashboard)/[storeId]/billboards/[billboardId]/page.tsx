import { BillboardForm } from "@/components/dashboard/billboards/billboard-form";
import prismadb from "@/lib/prismadb";

interface BillboardIdPageProps {
    params: {
        billboardId: string;
    };
}

const BillboardIdPage: React.FC<BillboardIdPageProps> = async ({ params }) => {
    const { billboardId } = params;

    let billboard = null;

    try {
        billboard = await prismadb.billboard.findUnique({
            where: {
                id: billboardId,
            },
        });
    } catch (error: any) {}

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardForm initialData={billboard} />
            </div>
        </div>
    );
};
export default BillboardIdPage;
