declare module "types" {
    export interface RequestBody {
        [key: string]: unknown;
    }

    export interface RequestContent {
        method: RequestMethod;
        headers: { [key: string]: string };
        body?: string;
    }

    export type RequestMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

    export interface ErrorResp {
        status: string;
        message: string;
    }
}
