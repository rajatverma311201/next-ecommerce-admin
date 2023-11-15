import { ColorForm } from "./components/color-form";
import prismadb from "@/lib/prismadb";

interface ColorIdPageProps {
    params: {
        colorId: string;
        storeId: string;
    };
}

const ColorIdPage: React.FC<ColorIdPageProps> = async ({ params }) => {
    const { colorId, storeId } = params;

    let color = null;

    try {
        color = await prismadb.color.findUnique({
            where: {
                id: colorId,
            },
        });
    } catch (error: any) {
        console.log(error);
    }

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ColorForm initialData={color} />
            </div>
        </div>
    );
};
export default ColorIdPage;
