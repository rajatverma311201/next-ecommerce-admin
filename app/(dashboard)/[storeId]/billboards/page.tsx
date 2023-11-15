import { BillboardClient } from "@/components/dashboard/billboards/billboard-client";
import { BillboardColumn } from "@/components/dashboard/billboards/columns";
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";

interface BillboardsPageProps {
    params: {
        storeId: string;
    };
}

const BillboardsPage: React.FC<BillboardsPageProps> = async ({ params }) => {
    const billboards = await prismadb.billboard.findMany({
        where: {
            storeId: params.storeId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    // const formattedBillboards = billboards.map((item) => ({
    const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
        id: item.id,
        label: item.label,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardClient data={formattedBillboards} />
            </div>
        </div>
    );
};
export default BillboardsPage;
