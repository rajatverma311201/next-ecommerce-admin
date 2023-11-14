"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {}

export const MainNav: React.FC<MainNavProps> = ({ className, ...props }) => {
    const pathname = usePathname();
    const params = useParams();

    const storeId = params.storeId as string;

    const routes = getRoutes(storeId, pathname);

    return (
        <nav
            className={cn(
                "flex items-center space-x-4 lg:space-x-6",
                className,
            )}
            {...props}
        >
            {routes.map((route) => (
                <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        route.active
                            ? "font-semibold text-black dark:text-white"
                            : "text-muted-foreground",
                    )}
                >
                    {route.label}
                </Link>
            ))}
        </nav>
    );
};

const getRoutes = (storeId: string, pathname: string) => {
    return [
        {
            href: `/${storeId}`,
            label: "Overview",
            active: pathname === `/${storeId}`,
        },
        {
            href: `/${storeId}/billboards`,
            label: "Billboards",
            active: pathname === `/${storeId}/billboards`,
        },
        {
            href: `/${storeId}/categories`,
            label: "Categories",
            active: pathname === `/${storeId}/categories`,
        },
        {
            href: `/${storeId}/sizes`,
            label: "Sizes",
            active: pathname === `/${storeId}/sizes`,
        },
        {
            href: `/${storeId}/colors`,
            label: "Colors",
            active: pathname === `/${storeId}/colors`,
        },
        {
            href: `/${storeId}/products`,
            label: "Products",
            active: pathname === `/${storeId}/products`,
        },
        {
            href: `/${storeId}/orders`,
            label: "Orders",
            active: pathname === `/${storeId}/orders`,
        },
        {
            href: `/${storeId}/settings`,
            label: "Settings",
            active: pathname === `/${storeId}/settings`,
        },
    ];
};
