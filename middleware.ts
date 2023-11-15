import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    beforeAuth: (req) => {
        const { pathname } = new URL(req.url, req.nextUrl.origin);
        if (pathname.startsWith("/api")) {
            return false;
        }
    },
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
