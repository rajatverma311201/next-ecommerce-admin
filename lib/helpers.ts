import prismadb from "@/lib/prismadb";

interface GraphData {
    name: string;
    total: number;
}

export const getGraphRevenue = async (storeId: string) => {
    const paidOrders = await prismadb.order.findMany({
        where: {
            storeId,
            isPaid: true,
        },
        include: {
            orderItems: {
                include: {
                    product: true,
                },
            },
        },
    });

    const monthlyRevenue: { [key: number]: number } = {};

    for (const order of paidOrders) {
        const month = order.createdAt.getMonth();
        let revenueForOrder = 0;

        for (const item of order.orderItems) {
            revenueForOrder += Number(item.product.price);
        }

        monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
    }

    const graphData: GraphData[] = [
        { name: "Jan", total: 0 },
        { name: "Feb", total: 0 },
        { name: "Mar", total: 0 },
        { name: "Apr", total: 0 },
        { name: "May", total: 0 },
        { name: "Jun", total: 0 },
        { name: "Jul", total: 0 },
        { name: "Aug", total: 0 },
        { name: "Sep", total: 0 },
        { name: "Oct", total: 0 },
        { name: "Nov", total: 0 },
        { name: "Dec", total: 0 },
    ];

    for (const month in monthlyRevenue) {
        graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)];
    }

    return graphData;
};

export const getSalesCount = async (storeId: string) => {
    const salesCount = await prismadb.order.count({
        where: {
            storeId,
            isPaid: true,
        },
    });

    return salesCount;
};

export const getStockCount = async (storeId: string) => {
    const stockCount = await prismadb.product.count({
        where: {
            storeId,
            isArchived: false,
        },
    });

    return stockCount;
};

export const getTotalRevenue = async (storeId: string) => {
    const paidOrders = await prismadb.order.findMany({
        where: {
            storeId,
            isPaid: true,
        },
        include: {
            orderItems: {
                include: {
                    product: true,
                },
            },
        },
    });

    const totalRevenue = paidOrders.reduce((total, order) => {
        const orderTotal = order.orderItems.reduce((orderSum, item) => {
            return orderSum + Number(item.product.price);
        }, 0);

        return total + orderTotal;
    }, 0);

    return totalRevenue;
};

export const getAllProductAndCategoriesCountData = async (storeId: string) => {
    const products = await prismadb.product.findMany({
        where: {
            storeId,
        },
        include: {
            category: true,
        },
    });

    const categories = await prismadb.category.findMany({
        where: {
            storeId,
        },
    });

    return { products, categories };
};

export const getProductsUnderEachCategoryCount = async (storeId: string) => {
    const products = await prismadb.product.findMany({
        where: {
            storeId,
        },
        include: {
            category: true,
        },
    });

    const categories = await prismadb.category.findMany({
        where: {
            storeId,
        },
    });

    const productsUnderEachCategory: { [key: string]: number } = {};

    for (const category of categories) {
        productsUnderEachCategory[category.name] = 0;
    }

    for (const product of products) {
        productsUnderEachCategory[product.category.name] += 1;
    }

    const mappedProductsUnderEachCategory = Object.keys(
        productsUnderEachCategory,
    ).map((key) => ({
        name: key,
        total: productsUnderEachCategory[key],
    }));
    return mappedProductsUnderEachCategory;
};
