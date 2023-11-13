import { REQUEST } from "@/utils/constants";
import { RequestBody, RequestContent, RequestMethod } from "types";

const API_URL = process.env.VITE_API_URL;

export default class Fetch {
    static async GET(url: string) {
        return this.requestFn(url, REQUEST.GET);
    }

    static async POST(url: string, reqBody: RequestBody) {
        return this.requestFn(url, REQUEST.POST, reqBody);
    }

    static async PATCH(url: string, reqBody: RequestBody) {
        return this.requestFn(url, REQUEST.PATCH, reqBody);
    }

    static async PUT(url: string, reqBody: RequestBody) {
        return this.requestFn(url, REQUEST.PUT, reqBody);
    }

    static async DELETE(url: string) {
        return this.requestFn(url, REQUEST.DELETE);
    }

    private static async requestFn(
        url: string,
        method: RequestMethod,
        reqBody?: RequestBody,
    ) {
        const reqContent: RequestContent = {
            method,
            headers: {
                "Content-Type": "application/json",
            },
        };
        console.log(reqContent);
        if (reqBody) {
            reqContent.body = JSON.stringify(reqBody);
        }

        const resp = await fetch(`${API_URL}/${url}`, reqContent);

        const data = await resp.json();

        if (!resp.ok || resp.status >= 400) {
            throw new Error(data.message || "Something went wrong");
        }

        return data;
    }
}
