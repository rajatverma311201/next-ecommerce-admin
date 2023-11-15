import { CategoryForm } from "./components/category-form";
import prismadb from "@/lib/prismadb";

interface CategoryIdPageProps {
    params: {
        categoryId: string;
        storeId: string;
    };
}

const CategoryIdPage: React.FC<CategoryIdPageProps> = async ({ params }) => {
    const { categoryId, storeId } = params;

    let category = null;

    try {
        category = await prismadb.category.findUnique({
            where: {
                id: categoryId,
            },
        });
    } catch (error: any) {
        console.log(error);
    }

    const billboards = await prismadb.billboard.findMany({
        where: {
            storeId: storeId,
        },
    });
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CategoryForm initialData={category} billboards={billboards} />
            </div>
        </div>
    );
};
export default CategoryIdPage;
