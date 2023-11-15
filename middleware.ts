import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    beforeAuth: (req) => {
        const { pathname } = new URL(req.url, req.nextUrl.origin);
        if (pathname.startsWith("/api") && req.method == "GET") {
            return false;
        }
    },
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
