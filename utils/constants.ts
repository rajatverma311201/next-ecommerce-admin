import { RequestMethod } from "types";

export const REQUEST: { [key: string]: RequestMethod } = {
    POST: "POST",
    GET: "GET",
    DELETE: "DELETE",
    PUT: "PUT",
    PATCH: "PATCH",
};
