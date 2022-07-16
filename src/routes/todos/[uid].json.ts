import type { RequestHandler } from "@sveltejs/kit";
import { api } from "./_api"

export const del: RequestHandler = (reqEvent) => {
    return api(reqEvent);
}

export const patch: RequestHandler = async (reqEvent) => {
    const formData = await reqEvent.request.formData();

    return api(reqEvent, {
        text: formData.get("text") as string
    })
}